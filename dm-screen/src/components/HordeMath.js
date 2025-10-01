import React, {useRef, useState} from "react";
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

function save(monsterCount) {
    let monsters = [];
    for (let i=0; i < monsterCount; i++) {
        let monster = {
            name: document.getElementById(`monster-name-${i}`).value,
            numAttackers: document.getElementById(`numAttackers-${i}`).value,
            attacksPerMonster: document.getElementById(`attacksPerMonster-${i}`).value,
            attackBonus: document.getElementById(`attackBonus-${i}`).value,
            damage: document.getElementById(`damage-${i}`).value,
            armorClass: document.getElementById(`armor-class-${i}`).value,
            hitPoints: document.getElementById(`hit-points-${i}`).value,
            hitPointMaximum: document.getElementById(`hit-point-maximum-${i}`).value,
            initiative: document.getElementById(`initiative-${i}`).value,
        };
        monsters.push(monster);
    }

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

function load(file, setMonsterCount) {

    if (file){
        const reader = new FileReader();
        reader.onload = (e) => {
            const monsters = JSON.parse(e.target.result);
            
            // Set the monster count to match loaded data
            setMonsterCount(monsters.length);

            for (let i=0; i < monsters.length; i++){
                document.getElementById(`monster-name-${i}`).value = monsters[i].name;
                document.getElementById(`numAttackers-${i}`).value = monsters[i].numAttackers;
                document.getElementById(`attacksPerMonster-${i}`).value = monsters[i].attacksPerMonster;
                document.getElementById(`attackBonus-${i}`).value = monsters[i].attackBonus;
                document.getElementById(`damage-${i}`).value = monsters[i].damage;
                document.getElementById(`armor-class-${i}`).value = monsters[i].armorClass;
                document.getElementById(`hit-points-${i}`).value = monsters[i].hitPoints;
                document.getElementById(`hit-point-maximum-${i}`).value = monsters[i].hitPointMaximum;
                document.getElementById(`initiative-${i}`).value = monsters[i].initiative;
            }
        };
        reader.readAsText(file);
    }
}

function damage(amount, rowNum) {
    let hp_bar = document.getElementById(`hit-points-${rowNum}`);
    let hp = Number(hp_bar.value);
    hp -= amount;
    hp_bar.value = hp;
}

function MonsterInput({monsterCount, monsters, setMonsters}) {
    function change() {
        let monsters = []
        for (let i=0; i < monsterCount; i++){
            monsters.push(
                new Monster(
                    document.getElementById(`monster-name-${i}`).value,
                    document.getElementById(`numAttackers-${i}`).value,
                    document.getElementById(`attacksPerMonster-${i}`).value,
                    document.getElementById(`attackBonus-${i}`).value,
                    document.getElementById(`damage-${i}`).value,
                    document.getElementById(`armor-class-${i}`).value,
                    document.getElementById(`hit-points-${i}`).value,
                    document.getElementById(`hit-point-maximum-${i}`).value,
                    document.getElementById(`initiative-${i}`).value
                )
            )
        }
        setMonsters(monsters);
    }

    // Update monsters when monster count changes
    React.useEffect(() => {
        change();
    }, [monsterCount]);

    let rows = [];
    for (let i=0; i < monsterCount; i++){
        rows.push(
            <div class="w3-quarter w3-margin-bottom">
                <div class="w3-card-4">
                    <label>Name</label>
                    <input type="text" className="w3-input" id={`monster-name-${i}`}
                           onChange={() => change()} defaultValue={i === 0 ? "Kobolds" : ""}/>
                    <label>Number of monsters in Horde</label>
                    <input type="number" id={`numAttackers-${i}`} className="w3-input"
                           onChange={() => change()} defaultValue={i === 0 ? 6 : 1}/>
                    <label>Attacks per Monster</label>
                    <input type="number" id={`attacksPerMonster-${i}`} className="w3-input"
                           onChange={() => change()} defaultValue={1}/>
                    <label>Attack Bonus</label>
                    <input type="number" id={`attackBonus-${i}`} className="w3-input"
                           onChange={() => change()} defaultValue={i === 0 ? 4 : 0}/>
                    <label>Damage per Attack</label>
                    <input type="text" id={`damage-${i}`} className="w3-input"
                           onChange={() => change()} defaultValue={i === 0 ? "1d4+2" : "1d6"}/>
                    <label>AC</label>
                    <input type='number' id={`armor-class-${i}`} className='w3-input'
                           onChange={() => change()} defaultValue={i === 0 ? 14 : 10}/>
                    <label>Damage</label>
                    <div>
                        <input type="button" className="w3-button" defaultValue="-10"
                               onClick={() => damage(10, i)}></input>
                        <input type="button" className="w3-button" defaultValue="-5"
                               onClick={() => damage(5, i)}></input>
                        <input type="button" className="w3-button" defaultValue="-1"
                               onClick={() => damage(1, i)}></input>
                        <input type="button" className="w3-button" defaultValue="+1"
                               onClick={() => damage(-1, i)}></input>
                        <input type="button" className="w3-button" defaultValue="+5"
                               onClick={() => damage(-5, i)}></input>
                        <input type="button" className="w3-button" defaultValue="+10"
                               onClick={() => damage(-10, i)}></input>
                    </div>
                    <label>Current Hit Points (of single monster)</label>
                    <input type='number' id={`hit-points-${i}`} className='w3-input'
                           onChange={() => change()} defaultValue={i === 0 ? 7 : 10}/>
                    <label>Maximum HP (of single monster)</label>
                    <input type='number' id={`hit-point-maximum-${i}`} className='w3-input'
                           onChange={() => change()} defaultValue={i === 0 ? 7 : 10}/>
                    <label>Initiative</label>
                    <input type='number' id={`initiative-${i}`} className='w3-input'
                           onChange={() => change()} defaultValue={i === 0 ? 12 : 10}/>
                </div>
            </div>
        )
    }
    return <div class="w3-row-padding">{rows}</div>
}

function clearMonsters(monsterCount) {
    for (let i=0; i < monsterCount; i++){
        document.getElementById(`monster-name-${i}`).value = "";
        document.getElementById(`numAttackers-${i}`).value = 1;
        document.getElementById(`attacksPerMonster-${i}`).value = 1;
        document.getElementById(`attackBonus-${i}`).value = 0;
        document.getElementById(`damage-${i}`).value = "";
        document.getElementById(`armor-class-${i}`).value = 0;
        document.getElementById(`hit-points-${i}`).value = 0;
        document.getElementById(`hit-point-maximum-${i}`).value = 0;
        document.getElementById(`initiative-${i}`).value = 0;
    }
}


function MonsterCount({setMonsterCount}){
    return (
        <div class="w3-container">
            <p>
                <label for="monsterCount">Number of Monster Types </label> 
                <input type="number" id="monsterCount" onChange={(e) => setMonsterCount(e.target.value)} defaultValue="1" />
            </p>
        </div>
    )
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
        <div class="w3-container">
            <h3>Damage Output</h3>
            {results.length > 0 ? results : <p>Enter monster data to see damage calculations</p>}
        </div>
    )
}

export default function HordeMathContainer({party, tableState, setTableState, monsters, setMonsters}) {
    const [monsterCount, setMonsterCount] = useState(1);

    return (
        <div class="w3-container">
            <h1 onClick={() => hideShow("hordemath")}>Monster Math</h1>
            <div class="w3-container w3-show" id="hordemath">
                <MonsterCount setMonsterCount={setMonsterCount}></MonsterCount>
                <MonsterInput monsterCount={monsterCount} monsters={monsters} setMonsters={setMonsters}></MonsterInput>
                
                <HordeMathOutput monsters={monsters} party={party}></HordeMathOutput>

                <input type="button" class="w3-button" defaultValue="Clear" onClick={() => clearMonsters(monsterCount)} />
                <input type="button" className="w3-button" value="save" onClick={() => save(monsterCount)}></input>
                <input type="file" accept=".json" onChange={(event) => {load(event.target.files[0], setMonsterCount)}}></input>
            </div>
            
        </div>
    )
}

