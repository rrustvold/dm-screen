
import React from 'react';
import { hideShow } from '../utils';

function parseDamage(damage_str){
    damage_str = damage_str.trim().toLowerCase();
    let diceBonus = damage_str.split("+");
    let dice = diceBonus[0];
    let bonus = "0";
    if (diceBonus.length === 2){
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

function PartyInput({party, setParty}) {
    const updatePlayer = (index, field, value) => {
        const updatedParty = party.map((player, i) => {
            if (i === index) {
                const updatedPlayer = { ...player, [field]: value };
                // Recreate PC object with updated values
                return new PC(
                    updatedPlayer.name,
                    updatedPlayer.name,
                    updatedPlayer.level,
                    updatedPlayer.ac,
                    updatedPlayer.hp,
                    updatedPlayer.initiative,
                    updatedPlayer.avgDamage,
                    updatedPlayer.attackBonus
                );
            }
            return player;
        });
        setParty(updatedParty);
    };

    const removePlayer = (index) => {
        const updatedParty = party.filter((_, i) => i !== index);
        setParty(updatedParty);
    };


    let rows = [];
    for (let i=0; i < party.length; i++){
        let name_id = `name_${i}`;
        let ac_id = `ac_${i}`;
        let level_id = `level_${i}`;
        let hp_id = `hp_${i}`;
        let initiative_id = `initiative_${i}`;
        let avg_damage_id = `avg_damage_${i}`;
        let attack_bonus_id = `attack_bonus_${i}`;
        // Other pc properties are not used elsewhere yet, but if they do get referenced, then change events can be added
        // Get saved party data for this player, or use defaults
        const savedPlayer = party[i] || {};
        const defaultValues = {
            level: savedPlayer.level || 3,
            name: savedPlayer.name || `Player ${i + 1}`,
            ac: savedPlayer.ac || 15,
            hp: savedPlayer.hp || 24,
            initiative: savedPlayer.initiative || 2,
            avgDamage: savedPlayer.avgDamage || "2d6+3",
            attackBonus: savedPlayer.attackBonus || 5
        };

        rows.push(
            <div key={i} class="w3-quarter w3-margin-bottom">
            <div class="w3-card-4" style={{border: '3px solid #2196F3', borderRadius: '8px', padding: '15px', position: 'relative'}}>
                <button 
                    className="w3-button w3-red w3-small" 
                    onClick={() => removePlayer(i)}
                    style={{
                        position: 'absolute',
                        top: '5px',
                        right: '5px',
                        padding: '2px 6px',
                        fontSize: '12px'
                    }}
                >
                    ×
                </button>
                <label>Level</label>
                <input className="w3-input" type="number" id={level_id}
                       value={savedPlayer.level || defaultValues.level}
                       onChange={(e) => updatePlayer(i, 'level', e.target.value)}/>
                <label>Name</label>
                <input className="w3-input" type="text" id={name_id}
                       value={savedPlayer.name || defaultValues.name}
                       onChange={(e) => updatePlayer(i, 'name', e.target.value)}/>
                <label>AC</label>
                <input className="w3-input" type="number" id={ac_id}
                       value={savedPlayer.ac || defaultValues.ac}
                       onChange={(e) => updatePlayer(i, 'ac', e.target.value)}/>
                <label>HP</label>
                <input className="w3-input" type="number" id={hp_id}
                       value={savedPlayer.hp || defaultValues.hp}
                       onChange={(e) => updatePlayer(i, 'hp', e.target.value)}/>
                <label>Initiative</label>
                <input className="w3-input" type="number" id={initiative_id}
                       value={savedPlayer.initiative || defaultValues.initiative}
                       onChange={(e) => updatePlayer(i, 'initiative', e.target.value)}/>
                <label>Average Damage</label>
                <input className="w3-input" type="text" id={avg_damage_id}
                       value={savedPlayer.avgDamage || defaultValues.avgDamage}
                       onChange={(e) => updatePlayer(i, 'avgDamage', e.target.value)} placeholder="e.g., 1d8+2, 2d6+3"/>
                <label>Attack Bonus</label>
                <input className="w3-input" type="number" id={attack_bonus_id}
                       value={savedPlayer.attackBonus || defaultValues.attackBonus}
                       onChange={(e) => updatePlayer(i, 'attackBonus', e.target.value)}/>
            </div>
            </div>
        )
    }
    return <div class="w3-row-padding">{rows}</div>
}


export class PC {
    constructor(player, name, level, ac, hp, initiative, avgDamage, attackBonus) {
        this.player = player;
        this.name = name;
        this.level = level;
        this.ac = ac;
        this.hp = hp;
        this.initiative = initiative;
        this.avgDamage = avgDamage;
        this.attackBonus = attackBonus;
        
        // Parse damage string to get mean and std
        try {
            const parsedDamage = parseDamage(avgDamage);
            this.damageMean = parsedDamage.mean;
            this.damageStd = parsedDamage.std;
        } catch (error) {
            // Fallback to numeric value if parsing fails
            this.damageMean = parseFloat(avgDamage) || 0;
            this.damageStd = 0;
        }
    }
}

// Default values for each level
const LEVEL_DEFAULTS = {
    1: { level: 1,   ac: 15, hp: 10,  initiative: 2, avgDamage: "2d6+3", attackBonus:  5 },
    2: { level: 2,   ac: 15, hp: 17,  initiative: 2, avgDamage: "2d6+3", attackBonus:  5 },
    3: { level: 3,   ac: 15, hp: 24,  initiative: 2, avgDamage: "2d6+3", attackBonus:  5 },
    4: { level: 4,   ac: 15, hp: 31,  initiative: 3, avgDamage: "2d6+4", attackBonus:  6 },
    5: { level: 5,   ac: 15, hp: 38,  initiative: 3, avgDamage: "3d6+4", attackBonus:  7 },
    6: { level: 6,   ac: 15, hp: 45,  initiative: 3, avgDamage: "3d6+4", attackBonus:  7 },
    7: { level: 7,   ac: 15, hp: 52,  initiative: 4, avgDamage: "3d6+4", attackBonus:  7 },
    8: { level: 8,   ac: 15, hp: 59,  initiative: 4, avgDamage: "3d6+5", attackBonus:  8 },
    9: { level: 9,   ac: 15, hp: 66,  initiative: 4, avgDamage: "3d6+5", attackBonus:  9 },
    10: { level: 10, ac: 15, hp: 73,  initiative: 5, avgDamage: "3d6+5", attackBonus:  9 },
    11: { level: 11, ac: 15, hp: 80,  initiative: 5, avgDamage: "4d6+5", attackBonus:  9 },
    12: { level: 12, ac: 15, hp: 87,  initiative: 5, avgDamage: "4d6+5", attackBonus:  9 },
    13: { level: 13, ac: 15, hp: 94, initiative: 6, avgDamage:  "4d6+5", attackBonus:  10},
    14: { level: 14, ac: 15, hp: 101, initiative: 6, avgDamage: "4d6+5", attackBonus:  10},
    15: { level: 15, ac: 15, hp: 108, initiative: 6, avgDamage: "4d6+5", attackBonus:  10 },
    16: { level: 16, ac: 15, hp: 115, initiative: 7, avgDamage: "5d6+5", attackBonus: 10 },
    17: { level: 17, ac: 15, hp: 122, initiative: 7, avgDamage: "5d6+5", attackBonus: 11 },
    18: { level: 18, ac: 15, hp: 129, initiative: 7, avgDamage: "5d6+5", attackBonus: 11 },
    19: { level: 19, ac: 15, hp: 136, initiative: 8, avgDamage: "5d6+5", attackBonus: 11 },
    20: { level: 20, ac: 15, hp: 143, initiative: 8, avgDamage: "5d6+5", attackBonus: 11 }
};

export function Party({party, setParty}){
    const [selectedLevel, setSelectedLevel] = React.useState(3);
    
    const addPlayer = () => {
        const defaults = LEVEL_DEFAULTS[selectedLevel];
        const newPlayer = new PC("", `Player ${party.length + 1}`, defaults.level, defaults.ac, defaults.hp, defaults.initiative, defaults.avgDamage, defaults.attackBonus);
        setParty([...party, newPlayer]);
    };

    return (
        <div class="w3-container">
            <h1 onClick={() => hideShow("party")} style={{cursor: 'pointer'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrows-collapse" viewBox="0 0 16 16" style={{verticalAlign: 'middle', marginRight: '8px'}}>
                    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8m7-8a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 4.293V.5A.5.5 0 0 1 8 0m-.5 11.707-1.146 1.147a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 11.707V15.5a.5.5 0 0 1-1 0z"/>
                </svg>
                Party
            </h1>
            <div class="w3-container w3-show" id="party">
                <div class="w3-container w3-margin-bottom">
                    <div className="w3-row-padding">
                        <div className="w3-col m3">
                            <label>Level for New Player</label>
                            <select 
                                className="w3-select" 
                                value={selectedLevel} 
                                onChange={(e) => setSelectedLevel(parseInt(e.target.value))}
                                style={{marginBottom: '10px'}}
                            >
                                {Object.keys(LEVEL_DEFAULTS).map(level => (
                                    <option key={level} value={level}>Level {level}</option>
                                ))}
                            </select>
                        </div>
                        <div className="w3-col m3">
                            <button 
                                className="w3-button w3-blue" 
                                onClick={addPlayer}
                                style={{marginTop: '25px'}}
                            >
                                + Add Player
                            </button>
                        </div>
                    </div>
                </div>
                
                <PartyInput party={party} setParty={setParty}></PartyInput>
            </div>
        </div>
    )
}