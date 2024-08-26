import {useState} from "react";
import {orcs} from "./randomEncounter/orcs";
import {goblins} from "./randomEncounter/goblins";

function getPartyLimits(party){
    const encounter_difficulty = [
        //easy, medium, difficult, deadly
        [25, 50, 75, 100],
        [50, 100, 150, 200],
        [75, 150, 225, 400],
        [125, 250, 375, 500],
        [250, 500, 750, 1100],
        [300, 600, 900, 1400],
        [350, 750, 1100, 1700],
        [450, 900, 1400, 2100],
        [550, 1100, 1600, 2400],
        [600, 1200, 1900, 2800]
    ];

    let limits = [0, 0, 0, 0];
    for (let i=0; i < party.length; i++) {
        let pc = party[i];
        for (let j=0; j < 4; j++) {
            limits[j] += encounter_difficulty[Number(pc.level)][j];
        }
    }
    return limits
}

function generate(setEncounter, party) {
    let difficulty = document.getElementById("difficulty").value;
    let monsterType = document.getElementById("monster-type").value;
    let limits = getPartyLimits(party);
    let limit;
    if (difficulty === "easy"){
        limit = limits[0];
    } else if (difficulty === "medium") {
        limit = limits[1];
    } else if (difficulty === "hard") {
        limit = limits[2];
    } else {
        limit = limits[3];
    }


    let multiplier = 1;
    if (party.length < 3) {
        multiplier = 1.5;
    }

    let monsterSelection = document.getElementById("monster-type").value;
    let monsterList;
    if (monsterSelection === "orcs") {
        monsterList = orcs;
    } else if (monsterSelection === "goblins"){
        monsterList = goblins;
    }

    let totalXP = 0;
    let encounter = [];
    let encounterDict = {};
    let loopCount = 0;
    while (totalXP * multiplier < limit && loopCount < 10) {
        loopCount++;
        let randomNum = Math.floor(Math.random() * monsterList.length);
        let monster = monsterList[randomNum];
        if (encounter.length === 1){
            multiplier = 1.5;
            if (party.length < 3) {
                multiplier = 2.0;
            }
        } else if (encounter.length === 2){
            multiplier = 2.0;
            if (party.length < 3){
                multiplier = 2.5;
            }
        } else if (encounter.length === 6) {
            multiplier = 2.5;
            if (party.length < 3){
                multiplier = 3
            }
        } else if (encounter.length === 10){
            multiplier = 3;
            if (party.length < 3){
                multiplier = 4;
            }
        } else if (encounter.length === 14) {
            multiplier = 4;
        }
        if (totalXP * multiplier + monster.xp <= limit * 1.25) {
            totalXP += monster.xp;
            encounter.push(monster);
            if (monster.key in encounterDict) {
                encounterDict[monster.key].qty++;
            } else {
                encounterDict[monster.key] = monster;
                encounterDict[monster.key].qty = 1;
            }

        }
    }
    setEncounter(encounterDict);

}

function RandomEncounterInput({setEncounter, party}){
    return (
        <>
            <select name="difficulty" id="difficulty">
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                <option value="deadly">Deadly</option>
            </select>
            <select name="monster-type" id="monster-type">
                <option value="orcs">Orcs</option>
                <option value="goblins">Goblins</option>
            </select>
            <input type="button" defaultValue="Generate" onClick={() => generate(setEncounter, party)}/>
        </>
    )
}

export default function RandomEncounter2({party}){
    const [encounter, setEncounter] = useState({});

    let encounterBlock = [];
    for (const [key, value] of Object.entries(encounter)) {
        encounterBlock.push(
            <>{value.qty} <a href={value.link}>{value.name}</a><br/></>
        )
    }

    return (
        <>
            <h1>Random Encounter</h1>
        <RandomEncounterInput setEncounter={setEncounter} party={party}></RandomEncounterInput>
            <div>{encounterBlock}</div>
        </>
    )
}