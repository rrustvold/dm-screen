import {useRef, useState} from "react";
import { hideShow } from "../utils";

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

function save() {
    let monsters = [];
    for (let i=0; i < 3; i++) {
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

function load(file) {

    if (file){
        const reader = new FileReader();
        reader.onload = (e) => {
            const monsters = JSON.parse(e.target.result);

            for (let i=0; i < 3; i++){
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

function HordeMathInput(props) {
    let rows = [];
    let numRows = 1;
    let i = props.count;
    rows.push(
        <tr>
            <td>
                <input type="text" class="w3-input" id={"monster-name-" + i}></input>
            </td>
            <td>
                <input type="text" id={"numAttackers-" + i} class="w3-input" value={props.numAttackers}
                    onChange={(e) => props.setNumAttackers(Number(e.target.value))}/>
            </td>
            <td>
                <input type="text" id={"attacksPerMonster-" + i} class="w3-input" value={props.attacksPerMonster}
                    onChange={(e) => props.setAttacksPerMonster(Number(e.target.value))}/>
            </td>
            <td>
                <input type="text" id={"attackBonus-" + i} class="w3-input" value={props.attackBonus}
                    onChange={(e) => props.setAttackBonus(Number(e.target.value))}/>
            </td>
            <td>
                <input type="text" id={"damage-" + i} class="w3-input" defaultValue={props.damage}
                    onChange={(e) => props.setDamage(e.target.value)}/>
            </td>
            <td>
                <input type='text' id={'armor-class-' + i} class='w3-input' defaultValue={props.armorClass}
                    onChange={(e) => props.setArmorClass(e.target.value)}/>
            </td>
            <td>
                <input type="button" class="w3-button" defaultValue="-10" onClick={() => damage(10, i)}></input>
                <input type="button" class="w3-button" defaultValue="-5" onClick={() => damage(5, i)}></input>
                <input type="button" class="w3-button" defaultValue="-1" onClick={() => damage(1, i)}></input>
            </td>
            <td>
                <input type='text' id={"hit-points-" + i} class='w3-input' defaultValue={props.hitPoints}
                    onChange={(e) => props.setHitPoints(e.target.value)}/>
            </td>
            <td>
                <input type='text' id={"hit-point-maximum-" + i} class='w3-input' defaultValue={props.hitPointMaximum}
                    onChange={(e) => props.setHitPointMaximum(e.target.value)}/>
            </td>
            <td>
                <input type='text' id={"initiative-" + i} class='w3-input' defaultValue={props.initiative}
                    onChange={(e) => {
                        props.setInitiative(e.target.value);
                        props.setTableState(e.target.value);
                    }}/>
            </td>
        </tr>
    )

    return (
        <>
            <table class="w3-table">
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Num. Mons</td>
                        <td>Atks per Mon</td>
                        <td>Atk Bonus</td>
                        <td>Atk dmg</td>
                        <td>AC</td>
                        <td>Dmg</td>
                        <td>Current HP</td>
                        <td>Max Total HP</td>
                        <td>Init</td>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
                
                
            </table>
            
        </>
    )
}

function clearMonsters() {
    for (let i=0; i < 3; i++){
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

function HordeMath({party, tableState, setTableState, count}) {

    const [numAttackers, setNumAttackers] = useState(1);
    const [attacksPerMonster, setAttacksPerMonster] = useState(1);
    const [attackBonus, setAttackBonus] = useState(0.0);
    const [damage, setDamage] = useState("1d6");
    const [armorClass, setArmorClass] = useState(10);
    const [hitPoints, setHitPoints] = useState(10);
    const [hitPointMaximum, setHitPointMaximum] = useState(10);
    const [initiative, setInitiative] = useState(10);

    let characterNames = [];
    let characterACs = [];
    for (let i=0; i < party.length; i++) {
        let pc = party[i];
        characterNames.push(pc.name);
        characterACs.push(pc.ac);
    }

    function HordeMathOutput() {

        let _damage = parseDamage(damage);

        let results = [];
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
                <>
                    Hits: {characterNames[i]} {Math.round(oddsToHit * numAttackers * attacksPerMonster)} times for {Math.round(meanDamage)} ({Math.round(meanDamage - totalDamage.std)} + 1d{roundToNearestDie(2 * totalDamage.std)}) {Math.round(meanDamage)} +/- {Math.round(totalDamage.std)}<br/>
                </>
            )
        }

        return (
            <>
                {results}
            </>
        )
    }



    return (
            <div class="w3-responsive">
                <HordeMathInput
                    numAttackers={numAttackers}
                    setNumAttackers={setNumAttackers}
                    attacksPerMonster={attacksPerMonster}
                    setAttacksPerMonster={setAttacksPerMonster}
                    attackBonus={attackBonus}
                    setAttackBonus={setAttackBonus}
                    damage={damage}
                    setDamage={setDamage}
                    setArmorClass={setArmorClass}
                    setHitPoints={setHitPoints}
                    setHitPointMaximum={setHitPointMaximum}
                    setInitiative={setInitiative}
                    tableState={tableState}
                    setTableState={setTableState}
                    count={count}
                ></HordeMathInput>
                <div class="w3-container">
                    <HordeMathOutput></HordeMathOutput>
                </div>
            </div>
    )
}

export default function HordeMathContainer({party, tableState, setTableState}) {
    return (
        <div class="w3-container">
            <h1 onClick={() => hideShow("hordemath")}>Monster Math</h1>
            <div class="w3-container w3-show" id="hordemath">
                <HordeMath party={party} tableState={tableState} setTableState={setTableState} count={0}></HordeMath>
                {/*<HordeMath party={party} tableState={tableState} setTableState={setTableState} count={1}></HordeMath>*/}
                {/*<HordeMath party={party} tableState={tableState} setTableState={setTableState} count={2}></HordeMath>*/}
                <input type="button" class="w3-button" defaultValue="Clear" onClick={clearMonsters} />
                <input type="button" className="w3-button" value="save" onClick={() => save()}></input>
                <input type="file" accept=".json" onChange={(event) => {load(event.target.files[0])}}></input>
            </div>
            
        </div>
    )
}

