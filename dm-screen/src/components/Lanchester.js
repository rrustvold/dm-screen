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
        let avgDamage = player.damageMean || 10;
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
            // Use parsed damage standard deviation
            let damageStd = player.damageStd || (avgDamage * 0.2);
            playerDamageStdPerPlayer += (damageStd * oddsToHit * numAttackers) ** 2;
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
    const [normalize, setNormalize] = useState(false); // Normalize HP to percentages
    const [simulationData, setSimulationData] = useState(null);

    useEffect(() => {
        if (party.length > 0 || monsters.length > 0) {
            const data = calculateLanchesterSimulation(party, monsters, maxTurns, confidenceLevel);
            setSimulationData(data);
        }
    }, [party, monsters, confidenceLevel]);

    // Function to normalize HP data to percentages
    const normalizeHPData = (data, initialHP) => {
        if (!normalize || initialHP === 0) return data;
        return data.map(hp => (hp / initialHP) * 100);
    };

    const chartData = simulationData ? {
        labels: simulationData.turns,
        datasets: [
            {
                label: 'Player HP (Upper)',
                data: normalizeHPData(simulationData.playerHPUpper, simulationData.initialPlayerHP),
                borderColor: 'rgba(59, 130, 246, 0.4)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0,
                fill: '+1',
                pointRadius: 0,
                borderWidth: 2,
                hoverRadius: 0,
                hoverBorderWidth: 0
            },
            {
                label: 'Player HP',
                data: normalizeHPData(simulationData.playerHP, simulationData.initialPlayerHP),
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                tension: 0,
                fill: false,
                borderWidth: 3,
                pointRadius: 2
            },
            {
                label: 'Player HP (Lower)',
                data: normalizeHPData(simulationData.playerHPLower, simulationData.initialPlayerHP),
                borderColor: 'rgba(59, 130, 246, 0.4)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0,
                fill: false,
                pointRadius: 0,
                borderWidth: 2,
                hoverRadius: 0,
                hoverBorderWidth: 0
            },
            {
                label: 'Monster HP (Upper)',
                data: normalizeHPData(simulationData.monsterHPUpper, simulationData.initialMonsterHP),
                borderColor: 'rgba(239, 68, 68, 0.4)',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                tension: 0,
                fill: '+1',
                pointRadius: 0,
                borderWidth: 2,
                hoverRadius: 0,
                hoverBorderWidth: 0,
                hoverBackgroundColor: 'transparent',
                hoverBorderColor: 'transparent'
            },
            {
                label: 'Monster HP',
                data: normalizeHPData(simulationData.monsterHP, simulationData.initialMonsterHP),
                borderColor: 'rgb(239, 68, 68)',
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                tension: 0,
                fill: false,
                borderWidth: 3,
                pointRadius: 2
            },
            {
                label: 'Monster HP (Lower)',
                data: normalizeHPData(simulationData.monsterHPLower, simulationData.initialMonsterHP),
                borderColor: 'rgba(239, 68, 68, 0.4)',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                tension: 0,
                fill: false,
                pointRadius: 0,
                borderWidth: 2,
                hoverRadius: 0,
                hoverBorderWidth: 0,
                hoverBackgroundColor: 'transparent',
                hoverBorderColor: 'transparent'
            }
        ]
    } : null;

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    boxWidth: 12,
                    font: {
                        size: 12,
                        color: '#ffffff'
                    },
                    color: '#ffffff'
                }
            },
            title: {
                display: true,
                text: 'Lanchester\'s Laws Combat Simulation',
                font: {
                    size: 14,
                    color: '#ffffff'
                },
                color: '#ffffff'
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#ffffff',
                bodyColor: '#ffffff',
                borderColor: '#ffffff',
                borderWidth: 1,
                callbacks: {
                    afterLabel: function(context) {
                        const turnIndex = context.dataIndex;
                        const turn = simulationData.turns[turnIndex];
                        const playerHP = simulationData.playerHP[turnIndex];
                        const monsterHP = simulationData.monsterHP[turnIndex];
                        
                        // Calculate effective combatants for this turn
                        const effectivePlayers = Math.ceil(playerHP / simulationData.avgPlayerHP);
                        const effectiveMonsters = Math.ceil(monsterHP / simulationData.avgMonsterHP);
                        
                        // Calculate expected damage for this turn
                        const basePlayerDamage = simulationData.basePlayerDamagePerTurn || 0;
                        const baseMonsterDamage = simulationData.baseMonsterDamagePerTurn || 0;
                        const expectedPlayerDamage = basePlayerDamage * effectivePlayers;
                        const expectedMonsterDamage = baseMonsterDamage * effectiveMonsters;
                        
                        // Format HP values based on normalize setting
                        const playerHPDisplay = normalize ? 
                            `${Math.round((playerHP / simulationData.initialPlayerHP) * 100)}%` : 
                            Math.round(playerHP);
                        const monsterHPDisplay = normalize ? 
                            `${Math.round((monsterHP / simulationData.initialMonsterHP) * 100)}%` : 
                            Math.round(monsterHP);
                        
                        return [
                            `Turn ${turn}:`,
                            `Player HP: ${playerHPDisplay}`,
                            `Monster HP: ${monsterHPDisplay}`,
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
                    text: 'Turn Number',
                    font: {
                        size: 12,
                        color: '#ffffff'
                    },
                    color: '#ffffff'
                },
                ticks: {
                    font: {
                        size: 10,
                        color: '#ffffff'
                    },
                    color: '#ffffff'
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)'
                }
            },
            y: {
                title: {
                    display: true,
                    text: normalize ? 'Hit Points (%)' : 'Hit Points',
                    font: {
                        size: 12,
                        color: '#ffffff'
                    },
                    color: '#ffffff'
                },
                ticks: {
                    font: {
                        size: 10,
                        color: '#ffffff'
                    },
                    color: '#ffffff'
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)'
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
                    <div class="w3-quarter">
                        <label>
                            <input 
                                type="checkbox" 
                                checked={normalize}
                                onChange={(e) => setNormalize(e.target.checked)}
                                className="w3-check"
                            />
                            Normalize HP to 0-100%
                        </label>
                        <small>Display HP as percentages instead of absolute values</small>
                    </div>
                </div>
            

                {chartData && (
                    <div class="w3-container w3-margin-top">
                        <div style={{ position: 'relative', height: '400px', width: '100%' }}>
                            <Line data={chartData} options={options} />
                        </div>
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
