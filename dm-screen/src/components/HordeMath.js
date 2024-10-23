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



function HordeMathInput(props) {
    let rows = [];
    let numRows = 3;
    for (let i=0; i<numRows; i++){
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
                    <input type="text" id="attacksPerMonster" class="w3-input" value={props.attacksPerMonster}
                        onChange={(e) => props.setAttacksPerMonster(Number(e.target.value))}/>
                </td>
                <td>
                    <input type="text" id="attackBonus" class="w3-input" value={props.attackBonus}
                        onChange={(e) => props.setAttackBonus(Number(e.target.value))}/>
                </td>
                <td>
                    <input type="text" id="damage" class="w3-input" defaultValue={props.damage}
                        onChange={(e) => props.setDamage(e.target.value)}/>
                </td>
                <td>
                    <input type='text' id='armor-class' class='w3-input' defaultValue={props.armorClass}
                        onChange={(e) => props.setArmorClass(e.target.value)}/>
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
    }
    return (
        <>
            <table class="w3-table">
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Number of Monsters</td>
                        <td>Attacks per Monster</td>
                        <td>Attack Bonus</td>
                        <td>Attack Damage</td>
                        <td>AC</td>
                        <td>HP</td>
                        <td>Total HP (all monsters summed)</td>
                        <td>Initiative</td>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
                
                
            </table>
        </>
    )
}

export default function HordeMath({party, tableState, setTableState}) {

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
                    {characterNames[i]}: Hit {Math.round(oddsToHit * numAttackers * attacksPerMonster)} times for {Math.round(meanDamage)} ({Math.round(meanDamage - totalDamage.std)} + 1d{roundToNearestDie(2 * totalDamage.std)}) {Math.round(meanDamage)} +/- {Math.round(totalDamage.std)}<br/>
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
        <div class="w3-container">
            <h1 onClick={() => hideShow("hordemath")}>Horde Math</h1>
            <div class="w3-container w3-show" id="hordemath">
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
                ></HordeMathInput>
                <div class="w3-container">
                    <HordeMathOutput></HordeMathOutput>
                </div>
                
            </div>
            
        </div>
    )
}