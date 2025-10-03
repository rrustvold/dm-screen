import React, {useRef, useState, useEffect} from "react";
import { hideShow } from "../utils";

export class Monster {
    constructor(name, numAttackers, attacksPerMonster, attackBonus, damage, armorClass, hitPoints, hitPointMaximum, initiative) {
        this.name = name;
        this.numAttackers = numAttackers;
        this.attacksPerMonster = attacksPerMonster;
        this.attackBonus = attackBonus;
        this.damage = damage;
        this.armorClass = armorClass;
        this.hitPoints = hitPoints;
        this.hitPointMaximum = hitPointMaximum;
        this.initiative = initiative;
    }
}

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

class Roll {
    constructor(numDice, sides, bonus=0) {
        this.numDice = numDice;
        this.sides = sides;
        this.bonus = bonus;
        this.mean = this._mean();
        this.std = this._std();
    }

    _mean() {
        return this.numDice * (this.sides + 1) / 2 + this.bonus;
    }

    _std() {
        return (this.numDice * (this.sides ** 2 - 1) / 12) ** .5;
    }
}


function roundToNearestDie(num) {
    let dice = [4, 6, 8, 10, 12, 20, 100];
    if (num < 4) {
        return 4;
    }
    if (num > 100) {
        return 100;
    }
    for (let i=0; i < dice.length - 1; i++) {
        let d1 = num - dice[i];
        let d2 = dice[i + 1] - num;
        if (d1 < d2) {
            return dice[i];
        }
    }
}

function save(monsters) {
    let state = JSON.stringify(monsters);
    const blob = new Blob([state], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "encounter.json"; // Specify the filename
    // Programmatically click the link to trigger the download
    link.click();

    // Clean up by revoking the object URL
    URL.revokeObjectURL(link.href);
}

function load(file, setMonsters) {
    if (file){
        const reader = new FileReader();
        reader.onload = (e) => {
            const monsters = JSON.parse(e.target.result);
            setMonsters(monsters);
        };
        reader.readAsText(file);
    }
}

function damage(amount, rowNum, monsters, setMonsters) {
    setMonsters(prev => prev.map((monster, index) => 
        index === rowNum 
            ? { ...monster, hitPoints: Math.max(0, Number(monster.hitPoints) - amount) }
            : monster
    ));
}

function MonsterInput({monsters, setMonsters}) {
    const removeMonster = (index) => {
        const updatedMonsters = monsters.filter((_, i) => i !== index);
        setMonsters(updatedMonsters);
    };

    const updateMonster = (index, field, value) => {
        setMonsters(prev => prev.map((monster, i) => 
            i === index ? { ...monster, [field]: value } : monster
        ));
    };

    const clearMonster = (index) => {
        setMonsters(prev => prev.map((monster, i) => 
            i === index ? {
                name: "",
                numAttackers: 1,
                attacksPerMonster: 1,
                attackBonus: 0,
                damage: "",
                armorClass: 0,
                hitPoints: 0,
                hitPointMaximum: 0,
                initiative: 0
            } : monster
        ));
    };

    let rows = [];
    for (let i = 0; i < monsters.length; i++) {
        const monster = monsters[i] || {};
        rows.push(
            <div key={i} className="w3-quarter w3-margin-bottom" style={{border: '3px solid #2196F3', borderRadius: '8px', padding: '15px'}}>
                <div className="w3-card-4" style={{position: 'relative'}}>
                    <button 
                        className="w3-button w3-red w3-small" 
                        onClick={() => removeMonster(i)}
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
                    <label>Name</label>
                    <input 
                        type="text" 
                        className="w3-input" 
                        value={monster.name || ""}
                        onChange={(e) => updateMonster(i, 'name', e.target.value)}
                    />
                    <label>Number of monsters in Horde</label>
                    <input 
                        type="number" 
                        className="w3-input"
                        value={monster.numAttackers || ""}
                        onChange={(e) => updateMonster(i, 'numAttackers', e.target.value)}
                    />
                    <label>Attacks per Monster</label>
                    <input 
                        type="number" 
                        className="w3-input"
                        value={monster.attacksPerMonster || ""}
                        onChange={(e) => updateMonster(i, 'attacksPerMonster', e.target.value)}
                    />
                    <label>Attack Bonus</label>
                    <input 
                        type="number" 
                        className="w3-input"
                        value={monster.attackBonus || ""}
                        onChange={(e) => updateMonster(i, 'attackBonus', e.target.value)}
                    />
                    <label>Damage per Attack</label>
                    <input 
                        type="text" 
                        className="w3-input"
                        value={monster.damage || ""}
                        onChange={(e) => updateMonster(i, 'damage', e.target.value)}
                    />
                    <label>AC</label>
                    <input 
                        type='number' 
                        className='w3-input'
                        value={monster.armorClass || ""}
                        onChange={(e) => updateMonster(i, 'armorClass', e.target.value)}
                    />
                    <label>Damage</label>
                    <div>
                        <button 
                            type="button" 
                            className="w3-button" 
                            onClick={() => damage(10, i, monsters, setMonsters)}
                        >
                            -10
                        </button>
                        <button 
                            type="button" 
                            className="w3-button" 
                            onClick={() => damage(5, i, monsters, setMonsters)}
                        >
                            -5
                        </button>
                        <button 
                            type="button" 
                            className="w3-button" 
                            onClick={() => damage(1, i, monsters, setMonsters)}
                        >
                            -1
                        </button>
                        <button 
                            type="button" 
                            className="w3-button" 
                            onClick={() => damage(-1, i, monsters, setMonsters)}
                        >
                            +1
                        </button>
                        <button 
                            type="button" 
                            className="w3-button" 
                            onClick={() => damage(-5, i, monsters, setMonsters)}
                        >
                            +5
                        </button>
                        <button 
                            type="button" 
                            className="w3-button" 
                            onClick={() => damage(-10, i, monsters, setMonsters)}
                        >
                            +10
                        </button>
                    </div>
                    <label>Current Hit Points (of single monster)</label>
                    <input 
                        type='number' 
                        className='w3-input'
                        value={monster.hitPoints || ""}
                        onChange={(e) => updateMonster(i, 'hitPoints', e.target.value)}
                    />
                    <label>Maximum HP (of single monster)</label>
                    <input 
                        type='number' 
                        className='w3-input'
                        value={monster.hitPointMaximum || ""}
                        onChange={(e) => updateMonster(i, 'hitPointMaximum', e.target.value)}
                    />
                    <label>Initiative</label>
                    <input 
                        type='number' 
                        className='w3-input'
                        value={monster.initiative || ""}
                        onChange={(e) => updateMonster(i, 'initiative', e.target.value)}
                    />
                </div>
            </div>
        )
    }
    return <div className="w3-row-padding">{rows}</div>
}

function clearMonsters(monsterCount, setMonsters) {
    const clearedMonsters = [];
    for (let i = 0; i < monsterCount; i++) {
        clearedMonsters.push({
            name: "",
            numAttackers: 1,
            attacksPerMonster: 1,
            attackBonus: 0,
            damage: "",
            armorClass: 0,
            hitPoints: 0,
            hitPointMaximum: 0,
            initiative: 0
        });
    }
    setMonsters(clearedMonsters);
}



function HordeMathOutput({monsters, party}) {
    if (!monsters || monsters.length === 0) {
        return <div></div>;
    }

    let characterNames = [];
    let characterACs = [];
    for (let i=0; i < party.length; i++) {
        let pc = party[i];
        characterNames.push(pc.name);
        characterACs.push(pc.ac);
    }

    let results = [];
    
    for (let monsterIndex = 0; monsterIndex < monsters.length; monsterIndex++) {
        let monster = monsters[monsterIndex];
        if (!monster.name && !monster.damage) continue; // Skip empty monsters
        
        let _damage = parseDamage(monster.damage || "1d6");
        let numAttackers = parseInt(monster.numAttackers) || 1;
        let attacksPerMonster = parseInt(monster.attacksPerMonster) || 1;
        let attackBonus = parseInt(monster.attackBonus) || 0;

        for (let i=0; i < characterACs.length; i++) {
            let ac = characterACs[i];
            let oddsToHit = Math.max(
                Math.min(
                    (attackBonus + 21 - ac) * 0.05,
                    1
                ),
                0
            );
            let totalDamage = new Roll(
                _damage.numDice * numAttackers * attacksPerMonster,
                _damage.sides,
                _damage.bonus * numAttackers * attacksPerMonster
            )
            let meanDamage = totalDamage.mean * oddsToHit;
            results.push(
                <div key={`${monsterIndex}-${i}`}>
                    <strong>{monster.name || "Monster"}</strong> hits {characterNames[i]} {Math.round(oddsToHit * numAttackers * attacksPerMonster)} times for {Math.round(meanDamage)} damage ({Math.round(meanDamage - totalDamage.std)} + 1d{roundToNearestDie(2 * totalDamage.std)}) {Math.round(meanDamage)} +/- {Math.round(totalDamage.std)}<br/>
                </div>
            )
        }
    }

    return (
        <div className="w3-container">
            <h3>Horde Damage Output</h3>
            {results.length > 0 ? results : <p>Enter monster data to see damage calculations</p>}
        </div>
    )
}

export default function HordeMathContainer({party, tableState, setTableState, monsters, setMonsters}) {
    const addMonster = () => {
        const newMonster = {
            name: "",
            numAttackers: 1,
            attacksPerMonster: 1,
            attackBonus: 0,
            damage: "1d6",
            armorClass: 10,
            hitPoints: 10,
            hitPointMaximum: 10,
            initiative: 10
        };
        setMonsters([...monsters, newMonster]);
    };

    return (
        <div className="w3-container">
            <h1 onClick={() => hideShow("hordemath")} style={{cursor: 'pointer'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrows-collapse" viewBox="0 0 16 16" style={{verticalAlign: 'middle', marginRight: '8px'}}>
                    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8m7-8a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 4.293V.5A.5.5 0 0 1 8 0m-.5 11.707-1.146 1.147a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 11.707V15.5a.5.5 0 0 1-1 0z"/>
                </svg>
                Monster Math
            </h1>
            <div className="w3-container w3-show" id="hordemath">
                <div className="w3-container w3-margin-bottom">
                    <button 
                        className="w3-button w3-blue" 
                        onClick={addMonster}
                        style={{marginBottom: '10px'}}
                    >
                        + Add Monster Type
                    </button>
                </div>
                <MonsterInput monsters={monsters} setMonsters={setMonsters}></MonsterInput>
                
                <HordeMathOutput monsters={monsters} party={party}></HordeMathOutput>

                <button type="button" className="w3-button" onClick={() => clearMonsters(monsters.length, setMonsters)}>
                    Clear
                </button>
                <button type="button" className="w3-button" onClick={() => save(monsters)}>
                    Save
                </button>
                <input type="file" accept=".json" onChange={(event) => {load(event.target.files[0], setMonsters)}}></input>
            </div>
            
        </div>
    )
}

