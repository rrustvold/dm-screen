import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function parseDamage(damage_str) {
    damage_str = damage_str.trim().toLowerCase();
    let diceBonus = damage_str.split("+");
    let dice = diceBonus[0];
    let bonus = "0";
    if (diceBonus.length === 2) {
        bonus = diceBonus[1];
    }
    dice = dice.trim();
    bonus = Number(bonus.trim());
    let numDice;
    let sides;
    [numDice, sides] = dice.split("d");
    numDice = Number(numDice);
    sides = Number(sides);

    let mean = numDice * (sides + 1) / 2 + bonus;
    let std = (numDice * (sides**2 - 1) / 12) ** .5;

    return {
        numDice: numDice,
        sides: sides,
        bonus: bonus,
        mean: mean,
        std: std,
    }
}

function calculateLanchesterSimulation(party, monsters, maxTurns = 20, confidenceLevel = 1) {
    // Calculate initial player HP (sum of all party members)
    let initialPlayerHP = 0;
    for (let i = 0; i < party.length; i++) {
        let pc = party[i];
        initialPlayerHP += parseInt(pc.hp) || 0;
    }

    // Calculate initial monster HP (sum of current HP from all monsters)
    let initialMonsterHP = 0;
    for (let i = 0; i < monsters.length; i++) {
        let monster = monsters[i];
        let numAttackers = parseInt(monster.numAttackers) || 1;
        let currentHP = parseInt(monster.hitPoints) || 0;
        initialMonsterHP += numAttackers * currentHP;
    }

    // Calculate average HP per player and per monster
    let avgPlayerHP = initialPlayerHP / Math.max(party.length, 1);
    let totalMonsterCount = 0;
    for (let i = 0; i < monsters.length; i++) {
        totalMonsterCount += parseInt(monsters[i].numAttackers) || 1;
    }
    let avgMonsterHP = initialMonsterHP / Math.max(totalMonsterCount, 1);

    // Calculate base damage per individual player and monster
    let basePlayerDamagePerTurn = 0;
    let basePlayerDamageStd = 0;
    for (let playerIndex = 0; playerIndex < party.length; playerIndex++) {
        let player = party[playerIndex];
        let avgDamage = parseInt(player.avgDamage) || 10;
        let attackBonus = parseInt(player.attackBonus) || 0;
        
        // Calculate average damage per player to all monsters
        let playerDamagePerPlayer = 0;
        let playerDamageStdPerPlayer = 0;
        for (let i = 0; i < monsters.length; i++) {
            let monster = monsters[i];
            let ac = parseInt(monster.armorClass) || 10;
            let numAttackers = parseInt(monster.numAttackers) || 1;
            let oddsToHit = Math.max(
                Math.min(
                    (attackBonus + 21 - ac) * 0.05,
                    1
                ),
                0
            );
            playerDamagePerPlayer += avgDamage * oddsToHit * numAttackers;
            // Assume damage has 20% coefficient of variation (std = 0.2 * mean)
            playerDamageStdPerPlayer += (avgDamage * 0.2 * oddsToHit * numAttackers) ** 2;
        }
        basePlayerDamagePerTurn += playerDamagePerPlayer / Math.max(totalMonsterCount, 1);
        basePlayerDamageStd += (Math.sqrt(playerDamageStdPerPlayer) / Math.max(totalMonsterCount, 1)) ** 2;
    }
    basePlayerDamagePerTurn = basePlayerDamagePerTurn / Math.max(party.length, 1); // Average per player
    basePlayerDamageStd = Math.sqrt(basePlayerDamageStd) / Math.max(party.length, 1); // Average std per player

    // Calculate base monster damage per individual monster
    let baseMonsterDamagePerTurn = 0;
    let baseMonsterDamageStd = 0;
    for (let monsterIndex = 0; monsterIndex < monsters.length; monsterIndex++) {
        let monster = monsters[monsterIndex];
        if (!monster.damage) continue;

        let _damage = parseDamage(monster.damage);
        let attacksPerMonster = parseInt(monster.attacksPerMonster) || 1;
        let attackBonus = parseInt(monster.attackBonus) || 0;

        // Calculate average damage per monster to all players
        let monsterDamagePerMonster = 0;
        let monsterDamageStdPerMonster = 0;
        for (let i = 0; i < party.length; i++) {
            let pc = party[i];
            let ac = parseInt(pc.ac) || 10;
            let oddsToHit = Math.max(
                Math.min(
                    (attackBonus + 21 - ac) * 0.05,
                    1
                ),
                0
            );
            monsterDamagePerMonster += _damage.mean * oddsToHit * attacksPerMonster;
            monsterDamageStdPerMonster += (_damage.std * oddsToHit * attacksPerMonster) ** 2;
        }
        baseMonsterDamagePerTurn += monster.numAttackers * monsterDamagePerMonster / Math.max(party.length);
        baseMonsterDamageStd += (monster.numAttackers * Math.sqrt(monsterDamageStdPerMonster) / Math.max(party.length)) ** 2;
    }
    baseMonsterDamagePerTurn = baseMonsterDamagePerTurn / Math.max(totalMonsterCount, 1); // Average per monster
    baseMonsterDamageStd = Math.sqrt(baseMonsterDamageStd) / Math.max(totalMonsterCount, 1); // Average std per monster

    // Simulate turns with attrition
    let turns = [0]; // Start with turn 0
    let playerHP = [initialPlayerHP];
    let monsterHP = [initialMonsterHP];
    let playerHPUpper = [initialPlayerHP];
    let playerHPLower = [initialPlayerHP];
    let monsterHPUpper = [initialMonsterHP];
    let monsterHPLower = [initialMonsterHP];
    
    // Track cumulative uncertainty
    let cumulativePlayerDamageVariance = 0;
    let cumulativeMonsterDamageVariance = 0;

    for (let turn = 1; turn <= maxTurns; turn++) {
        // Calculate effective number of combatants remaining
        let effectivePlayers = Math.ceil(playerHP[turn - 1] / avgPlayerHP);
        let effectiveMonsters = Math.ceil(monsterHP[turn - 1] / avgMonsterHP);

        // Calculate damage based on effective combatants
        let monsterDamageThisTurn = baseMonsterDamagePerTurn * effectiveMonsters;
        let playerDamageThisTurn = basePlayerDamagePerTurn * effectivePlayers;
        
        // Calculate variance for this turn and add to cumulative variance
        let monsterDamageVarianceThisTurn = (baseMonsterDamageStd * Math.sqrt(effectiveMonsters)) ** 2;
        let playerDamageVarianceThisTurn = (basePlayerDamageStd * Math.sqrt(effectivePlayers)) ** 2;
        
        cumulativePlayerDamageVariance += monsterDamageVarianceThisTurn;
        cumulativeMonsterDamageVariance += playerDamageVarianceThisTurn;
        
        // Calculate cumulative standard deviations
        let cumulativePlayerDamageStd = Math.sqrt(cumulativePlayerDamageVariance);
        let cumulativeMonsterDamageStd = Math.sqrt(cumulativeMonsterDamageVariance);

        let newPlayerHP = Math.max(0, playerHP[turn - 1] - monsterDamageThisTurn);
        let newMonsterHP = Math.max(0, monsterHP[turn - 1] - playerDamageThisTurn);
        
        // Calculate confidence intervals using cumulative uncertainty
        let newPlayerHPUpper = Math.max(0, initialPlayerHP - (initialPlayerHP - newPlayerHP) + confidenceLevel * cumulativePlayerDamageStd);
        let newPlayerHPLower = Math.max(0, initialPlayerHP - (initialPlayerHP - newPlayerHP) - confidenceLevel * cumulativePlayerDamageStd);
        let newMonsterHPUpper = Math.max(0, initialMonsterHP - (initialMonsterHP - newMonsterHP) + confidenceLevel * cumulativeMonsterDamageStd);
        let newMonsterHPLower = Math.max(0, initialMonsterHP - (initialMonsterHP - newMonsterHP) - confidenceLevel * cumulativeMonsterDamageStd);
        
        playerHP.push(newPlayerHP);
        monsterHP.push(newMonsterHP);
        playerHPUpper.push(newPlayerHPUpper);
        playerHPLower.push(newPlayerHPLower);
        monsterHPUpper.push(newMonsterHPUpper);
        monsterHPLower.push(newMonsterHPLower);
        turns.push(turn);

        // Stop if one side is defeated
        if (newPlayerHP <= 0 || newMonsterHP <= 0) {
            break;
        }
    }

    return {
        turns: turns,
        playerHP: playerHP, // Keep initial values
        monsterHP: monsterHP, // Keep initial values
        playerHPUpper: playerHPUpper,
        playerHPLower: playerHPLower,
        monsterHPUpper: monsterHPUpper,
        monsterHPLower: monsterHPLower,
        initialPlayerHP: initialPlayerHP,
        initialMonsterHP: initialMonsterHP,
        avgPlayerHP: avgPlayerHP,
        avgMonsterHP: avgMonsterHP,
        basePlayerDamagePerTurn: basePlayerDamagePerTurn,
        baseMonsterDamagePerTurn: baseMonsterDamagePerTurn
    };
}

export default function Lanchester({ party = [], monsters = [] }) {
    const maxTurns = 100; // Fixed at 100 turns
    const [confidenceLevel, setConfidenceLevel] = useState(3); // Number of standard deviations
    const [simulationData, setSimulationData] = useState(null);

    useEffect(() => {
        if (party.length > 0 || monsters.length > 0) {
            const data = calculateLanchesterSimulation(party, monsters, maxTurns, confidenceLevel);
            setSimulationData(data);
        }
    }, [party, monsters, confidenceLevel]);

    const chartData = simulationData ? {
        labels: simulationData.turns,
        datasets: [
            {
                label: 'Player HP (Upper)',
                data: simulationData.playerHPUpper,
                borderColor: 'rgba(75, 192, 192, 0.3)',
                backgroundColor: 'rgba(75, 192, 192, 0.1)',
                tension: 0,
                fill: '+1',
                pointRadius: 0,
                borderWidth: 1
            },
            {
                label: 'Player HP',
                data: simulationData.playerHP,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0,
                fill: false
            },
            {
                label: 'Player HP (Lower)',
                data: simulationData.playerHPLower,
                borderColor: 'rgba(75, 192, 192, 0.3)',
                backgroundColor: 'rgba(75, 192, 192, 0.1)',
                tension: 0,
                fill: false,
                pointRadius: 0,
                borderWidth: 1
            },
            {
                label: 'Monster HP (Upper)',
                data: simulationData.monsterHPUpper,
                borderColor: 'rgba(255, 99, 132, 0.3)',
                backgroundColor: 'rgba(255, 99, 132, 0.1)',
                tension: 0,
                fill: '+1',
                pointRadius: 0,
                borderWidth: 1
            },
            {
                label: 'Monster HP',
                data: simulationData.monsterHP,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                tension: 0,
                fill: false
            },
            {
                label: 'Monster HP (Lower)',
                data: simulationData.monsterHPLower,
                borderColor: 'rgba(255, 99, 132, 0.3)',
                backgroundColor: 'rgba(255, 99, 132, 0.1)',
                tension: 0,
                fill: false,
                pointRadius: 0,
                borderWidth: 1
            }
        ]
    } : null;

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Lanchester\'s Laws Combat Simulation'
            },
            tooltip: {
                callbacks: {
                    afterLabel: function(context) {
                        const turnIndex = context.dataIndex;
                        const turn = simulationData.turns[turnIndex];
                        const playerHP = simulationData.playerHP[turnIndex];
                        const monsterHP = simulationData.monsterHP[turnIndex];
                        
                        // Calculate effective combatants for this turn
                        const effectivePlayers = Math.floor(playerHP / simulationData.avgPlayerHP);
                        const effectiveMonsters = Math.floor(monsterHP / simulationData.avgMonsterHP);
                        
                        // Calculate expected damage for this turn
                        const basePlayerDamage = simulationData.basePlayerDamagePerTurn || 0;
                        const baseMonsterDamage = simulationData.baseMonsterDamagePerTurn || 0;
                        const expectedPlayerDamage = basePlayerDamage * effectivePlayers;
                        const expectedMonsterDamage = baseMonsterDamage * effectiveMonsters;
                        
                        return [
                            `Turn ${turn}:`,
                            `Effective Players: ${effectivePlayers}`,
                            `Effective Monsters: ${effectiveMonsters}`,
                            `Expected Player Damage: ${Math.round(expectedPlayerDamage)}`,
                            `Expected Monster Damage: ${Math.round(expectedMonsterDamage)}`,
                            `Confidence: ±${confidenceLevel}σ`
                        ];
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Turn Number'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Hit Points'
                },
                beginAtZero: true
            }
        }
    };

    return (
        <div class="w3-container">
            <h1>Lanchester's Laws Combat Simulation</h1>
            <div class="w3-container w3-show">
                <div class="w3-row-padding">
                    <div class="w3-quarter">
                        <label>Confidence Level (σ)</label>
                        <input 
                            type="number" 
                            className="w3-input" 
                            value={confidenceLevel}
                            onChange={(e) => setConfidenceLevel(parseFloat(e.target.value) || 1)}
                            min="0.1"
                            max="4"
                            step="0.1"
                        />
                        <small>Standard deviations for confidence interval</small>
                    </div>
                </div>
                
                {simulationData && (
                    <div class="w3-row-padding w3-margin-top">
                        <div class="w3-half">
                            <h3>Initial Conditions</h3>
                            <p><strong>Player HP:</strong> {simulationData.initialPlayerHP}</p>
                            <p><strong>Monster HP:</strong> {simulationData.initialMonsterHP}</p>
                            <p><strong>Avg Player HP:</strong> {Math.round(simulationData.avgPlayerHP)}</p>
                            <p><strong>Avg Monster HP:</strong> {Math.round(simulationData.avgMonsterHP)}</p>
                        </div>
                        <div class="w3-half">
                            <h3>Combat Results</h3>
                            <p><strong>Final Player HP:</strong> {simulationData.playerHP[simulationData.playerHP.length - 1]}</p>
                            <p><strong>Final Monster HP:</strong> {simulationData.monsterHP[simulationData.monsterHP.length - 1]}</p>
                            <p><strong>Effective Players Remaining:</strong> {Math.floor(simulationData.playerHP[simulationData.playerHP.length - 1] / simulationData.avgPlayerHP)}</p>
                            <p><strong>Effective Monsters Remaining:</strong> {Math.floor(simulationData.monsterHP[simulationData.monsterHP.length - 1] / simulationData.avgMonsterHP)}</p>
                            <p><strong>Combat Duration:</strong> {simulationData.turns.length} turns</p>
                        </div>
                    </div>
                )}

                {chartData && (
                    <div class="w3-container w3-margin-top">
                        <Line data={chartData} options={options} />
                    </div>
                )}

                {(!party.length && !monsters.length) && (
                    <div class="w3-panel w3-yellow">
                        <p>No data available. Please set up your party and monsters first.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
