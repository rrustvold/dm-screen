import {useRef, useState} from "react";

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
    return (
        <>
            <label htmlFor="numAttackers">Number of Monsters </label>
            <input type="text" id="numAttackers" value={props.numAttackers}
                   onChange={(e) => props.setNumAttackers(Number(e.target.value))}/><br/>
            <label htmlFor="attacksPerMonster">Attacks per Monster </label>
            <input type="text" id="attacksPerMonster" value={props.attacksPerMonster}
                   onChange={(e) => props.setAttacksPerMonster(Number(e.target.value))}/><br/>
            <label htmlFor="attackBonus">Attack Bonus </label>
            <input type="text" id="attackBonus" value={props.attackBonus}
                   onChange={(e) => props.setAttackBonus(Number(e.target.value))}/><br/>
            <label htmlFor="damage">Attack Damage </label>
            <input type="text" id="damage" defaultValue={props.damage}
                   onChange={(e) => props.setDamage(e.target.value)}/><br/>
        </>
    )
}

export default function HordeMath({characterNames, characterACs}) {
    const [numAttackers, setNumAttackers] = useState(1);
    const [attacksPerMonster, setAttacksPerMonster] = useState(1);
    const [attackBonus, setAttackBonus] = useState(0.0);
    const [damage, setDamage] = useState("1d6");

    function HordeMathOutput() {

        let _damage = parseDamage(damage);

        let results = [];
        for (let i=0; i < characterACs.length; i++) {
            let ac = characterACs[i];
            console.log(`AC = ${ac}`);
            console.log(attackBonus);
            let oddsToHit = Math.max(
                Math.min(
                    (attackBonus + 21 - ac) * 0.05,
                    1
                ),
                0
            );
            console.log(oddsToHit);
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
        <>
            <h2>Horde Math</h2>
            <HordeMathInput
                numAttackers={numAttackers}
                setNumAttackers={setNumAttackers}
                attacksPerMonster={attacksPerMonster}
                setAttacksPerMonster={setAttacksPerMonster}
                attackBonus={attackBonus}
                setAttackBonus={setAttackBonus}
                damage={damage}
                setDamage={setDamage}
            ></HordeMathInput>
            <br/>
            <HordeMathOutput></HordeMathOutput>
        </>
    )
}