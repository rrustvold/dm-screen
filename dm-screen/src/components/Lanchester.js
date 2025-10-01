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

function calculateLanchesterSimulation(party, monsters, maxTurns = 20) {
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
    for (let i = 0; i < party.length; i++) {
        let pc = party[i];
        let avgDamage = parseInt(pc.avgDamage) || 10;
        basePlayerDamagePerTurn += avgDamage;
    }
    basePlayerDamagePerTurn = basePlayerDamagePerTurn / Math.max(party.length, 1); // Average per player

    // Calculate base monster damage per individual monster
    let baseMonsterDamagePerTurn = 0;
    for (let monsterIndex = 0; monsterIndex < monsters.length; monsterIndex++) {
        let monster = monsters[monsterIndex];
        if (!monster.damage) continue;

        let _damage = parseDamage(monster.damage);
        let attacksPerMonster = parseInt(monster.attacksPerMonster) || 1;
        let attackBonus = parseInt(monster.attackBonus) || 0;

        // Calculate average damage per monster to all players
        let monsterDamagePerMonster = 0;
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
        }
        baseMonsterDamagePerTurn += monster.numAttackers * monsterDamagePerMonster / Math.max(party.length);
    }
    baseMonsterDamagePerTurn = baseMonsterDamagePerTurn / Math.max(totalMonsterCount, 1); // Average per monster

    // Simulate turns with attrition
    let turns = [0]; // Start with turn 0
    let playerHP = [initialPlayerHP];
    let monsterHP = [initialMonsterHP];

    for (let turn = 1; turn <= maxTurns; turn++) {
        // Calculate effective number of combatants remaining
        let effectivePlayers = Math.ceil(playerHP[turn - 1] / avgPlayerHP);
        let effectiveMonsters = Math.ceil(monsterHP[turn - 1] / avgMonsterHP);

        // Calculate damage based on effective combatants
        let monsterDamageThisTurn = baseMonsterDamagePerTurn * effectiveMonsters;
        let playerDamageThisTurn = basePlayerDamagePerTurn * effectivePlayers;

        let newPlayerHP = Math.max(0, playerHP[turn - 1] - monsterDamageThisTurn);
        let newMonsterHP = Math.max(0, monsterHP[turn - 1] - playerDamageThisTurn);
        
        playerHP.push(newPlayerHP);
        monsterHP.push(newMonsterHP);
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
        initialPlayerHP: initialPlayerHP,
        initialMonsterHP: initialMonsterHP,
        avgPlayerHP: avgPlayerHP,
        avgMonsterHP: avgMonsterHP,
        basePlayerDamagePerTurn: basePlayerDamagePerTurn,
        baseMonsterDamagePerTurn: baseMonsterDamagePerTurn
    };
}

export default function Lanchester({ party = [], monsters = [] }) {
    const [maxTurns, setMaxTurns] = useState(5);
    const [simulationData, setSimulationData] = useState(null);

    useEffect(() => {
        if (party.length > 0 || monsters.length > 0) {
            const data = calculateLanchesterSimulation(party, monsters, maxTurns);
            setSimulationData(data);
        }
    }, [party, monsters, maxTurns]);

    const chartData = simulationData ? {
        labels: simulationData.turns,
        datasets: [
            {
                label: 'Player HP',
                data: simulationData.playerHP,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0
            },
            {
                label: 'Monster HP',
                data: simulationData.monsterHP,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                tension: 0
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
                            `Expected Monster Damage: ${Math.round(expectedMonsterDamage)}`
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
                        <label>Max Turns</label>
                        <input 
                            type="number" 
                            className="w3-input" 
                            value={maxTurns}
                            onChange={(e) => setMaxTurns(parseInt(e.target.value) || 20)}
                            min="1"
                            max="100"
                        />
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
