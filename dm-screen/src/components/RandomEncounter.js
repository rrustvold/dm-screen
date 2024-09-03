import {useState} from "react";

import {allLists, allOptions} from "./randomEncounter/environs";
import {forest, forestOptions} from "./randomEncounter/environs/forest";
import {hills, hillsOptions} from "./randomEncounter/environs/hills";
import {grassland, grasslandOptions} from "./randomEncounter/environs/grassland";
import { hideShow } from "../utils";

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
            limits[j] += encounter_difficulty[Number(pc.level) - 1][j];
        }
    }
    return limits
}

function randomFamily(environ) {
    let random = Math.floor(Math.random() * Object.keys(environ).length);
    return environ[Object.keys(environ)[random]];
}

function generate(setEncounter, party) {
    let difficulty = document.getElementById("difficulty").value;

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
    console.log(monsterSelection);
    let monsterFamily = allLists()[monsterSelection];
    if (monsterSelection === "anyForest") {
        monsterFamily = randomFamily(forest);
    } else if (monsterSelection === "anyHills") {
        monsterFamily = randomFamily(hills);
    } else if (monsterSelection === "anyGrassland") {
        monsterFamily = randomFamily(grassland);
    }

    console.log(monsterFamily);
    let monsterList = monsterFamily.list;
    let totalXP = 0;
    let encounter = [];
    let encounterDict = {};
    let loopCount = 0;
    let randomNum = Math.floor(Math.random() * monsterList.length);
    let draws = [];
    let drawLimit = Number(document.getElementById("maxDiffMonsters").value);
    let monster = monsterList[randomNum];
    let solo = monsterFamily.type;
    if (!solo) {
        solo = monster.type;
    }
    while (totalXP * multiplier < limit && loopCount < 20) {
        loopCount++;
        if (!solo) {
            if (draws.length < drawLimit) {
                randomNum = Math.floor(Math.random() * monsterList.length);
            } else {
                randomNum = draws[Math.floor(Math.random() * drawLimit)];
            }
            monster = monsterList[randomNum];
            if (monster.solo && encounter.length > 0){
                continue
            }
            solo = monster.solo;
        }

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
        if ((totalXP + monster.xp) * multiplier <= limit * 1.10) {
            totalXP += monster.xp;
            encounter.push(monster);
            if (monster.key in encounterDict) {
                encounterDict[monster.key].qty++;
            } else {
                encounterDict[monster.key] = monster;
                encounterDict[monster.key].qty = 1;
            }
            draws.push(randomNum);

        }
    }
    setEncounter(encounterDict);

}

function RandomEncounterInput({setEncounter, party}){
    const [monsterTypeOptions, setMonsterTypeOptions] = useState(
        []
    );

    function changeEnviron(environ) {
        if (environ === "any") {
            setMonsterTypeOptions(
                allOptions()
            )
        } else if (environ === "forest") {
            setMonsterTypeOptions(forestOptions());
        } else if (environ === "hills") {
            setMonsterTypeOptions(hillsOptions());
        } else if (environ === "grassland") {
            setMonsterTypeOptions(grasslandOptions());
        }
    }


    return (
        <div class="w3-container">
            <div class="w3-row-padding">
                <div class="w3-col s3">
                    <label>Difficulty</label>
                    <select name="difficulty" id="difficulty" class="w3-select">
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                        <option value="deadly">Deadly</option>
                    </select>
                </div>
                <div class="w3-col s3">
                    <label>Environment</label>
                    <select name="environ" id="encounter-environ" onChange={(e) => changeEnviron(e.target.value)}  class="w3-select">
                        <option value="forest">Forest</option>
                        <option value="hills">Hills</option>
                        <option value="grassland">Grassland</option>
                    </select>
                </div>
                <div class="w3-col s3">
                    <label>Monster Type</label>
                    <select name="monster-type" id="monster-type"  class="w3-select">
                        {monsterTypeOptions}
                    </select>
                </div>
                <div class="w3-col s3">
                    <label>Max different creatures</label>
                    <input type="text" defaultValue="3" id="maxDiffMonsters" class="w3-input"/>
                </div>
            </div>
            <p>
            <input type="button" defaultValue="Generate" onClick={() => generate(setEncounter, party)} class="w3-block" />
            </p>
        </div>
    )
}

export default function RandomEncounter2({party}){
    const [encounter, setEncounter] = useState({});

    let xp_values = [];
    let encounterBlock = [];
    for (const [key, value] of Object.entries(encounter)) {
        for (let i=0; i < value.qty; i++) {
            xp_values.push(value.xp);
        }
        encounterBlock.push(
            <>{value.qty} <a href={value.link ? value.link : `https://www.dndbeyond.com/monsters/${value.key}`} target="_blank">{value.name}</a><br/></>
        )
    }

    if (document.getElementById("monster-xp")) {
        document.getElementById("monster-xp").value = xp_values.join(",");
    }
    return (
        <div class="w3-container">
            <h1 onClick={() => hideShow("randomencounter")}>Random Encounter</h1>
            <div class="w3-container w3-show" id="randomencounter">
                <RandomEncounterInput setEncounter={setEncounter} party={party}></RandomEncounterInput>
                <p>
                    {encounterBlock}
                </p>
            </div>
        </div>
    )
}