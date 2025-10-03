
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
    const [isInitialized, setIsInitialized] = React.useState(false);

    function change() {
        let updatedParty = []
        for (let i=0; i < party.length; i++){
            updatedParty.push(
                new PC(
                    document.getElementById(`name_${i}`).value,
                    document.getElementById(`name_${i}`).value,
                    document.getElementById(`level_${i}`).value,
                    document.getElementById(`ac_${i}`).value,
                    document.getElementById(`hp_${i}`).value,
                    document.getElementById(`initiative_${i}`).value,
                    document.getElementById(`avg_damage_${i}`).value,
                    document.getElementById(`attack_bonus_${i}`).value
                )
            )
        }
        setParty(updatedParty);
    }

    const removePlayer = (index) => {
        const updatedParty = party.filter((_, i) => i !== index);
        setParty(updatedParty);
    };

    // Update party when party changes, but only after initial load
    React.useEffect(() => {
        if (isInitialized) {
            change();
        } else {
            setIsInitialized(true);
        }
    }, [party.length]);


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
                       onChange={(e) => change(e.target.value)} defaultValue={defaultValues.level}/>
                <label>Name</label>
                <input className="w3-input" type="text" id={name_id}
                       onChange={(e) => change(e.target.value)} defaultValue={defaultValues.name}/>
                <label>AC</label>
                <input className="w3-input" type="number" id={ac_id}
                       onChange={(e) => change(e.target.value)} defaultValue={defaultValues.ac}/>
                <label>HP</label>
                <input className="w3-input" type="number" id={hp_id}
                       onChange={(e) => change(e.target.value)} defaultValue={defaultValues.hp}/>
                <label>Initiative</label>
                <input className="w3-input" type="number" id={initiative_id}
                       onChange={(e) => change(e.target.value)} defaultValue={defaultValues.initiative}/>
                <label>Average Damage</label>
                <input className="w3-input" type="text" id={avg_damage_id}
                       onChange={(e) => change(e.target.value)} defaultValue={defaultValues.avgDamage} placeholder="e.g., 1d8+2, 2d6+3"/>
                <label>Attack Bonus</label>
                <input className="w3-input" type="number" id={attack_bonus_id}
                       onChange={(e) => change(e.target.value)} defaultValue={defaultValues.attackBonus}/>
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

export function Party({party, setParty}){
    const addPlayer = () => {
        const newPlayer = new PC("", `Player ${party.length + 1}`, 3, 15, 24, 2, "2d6+3", 5);
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
                    <button 
                        className="w3-button w3-blue" 
                        onClick={addPlayer}
                        style={{marginBottom: '10px'}}
                    >
                        + Add Player
                    </button>
                </div>
                
                <PartyInput party={party} setParty={setParty}></PartyInput>
            </div>
        </div>
    )
}