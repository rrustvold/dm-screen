import {useEffect, useState} from "react";

import {
    allEnvirons,
    changeEnviron, getFamily, randomFamily
} from "./randomEncounter/Environs";
import Roll, { hideShow, getRandomThingFromList } from "../utils";
import {getListFromEnviron, getRandomEncounterDistance} from "./Wilderness";


function getModifierFromScore(score) {
    let x = (score - 10) / 2;
    if (x >= 0){
        return Math.floor(x);
    } else {
        return Math.ceil(x);
    }
}


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
        if (pc.level === null || pc.level === ""){
            continue
        }
        for (let j=0; j < 4; j++) {
            limits[j] += encounter_difficulty[Number(pc.level) - 1][j];
        }
    }
    return limits
}

export function generate(party, difficulty, monsterSelection) {
    if (!difficulty){
        difficulty = document.getElementById("difficulty").value;
    }

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

    if (!monsterSelection){
        console.log("There is no selection");
        monsterSelection = document.getElementById("monster-type").value;
    }
    
    let monsterFamily = getFamily(monsterSelection);
    let fullMonsterList = monsterFamily.list;
    // filter out monsters by source
    let validSources = [];
    if (document.getElementById("srd5.1").checked) {
        validSources.push("5.1 SRD");
    }
    if (document.getElementById("2014 MM").checked) {
        validSources.push("2014 MM");
    }
    if (document.getElementById("srd5.2").checked) {
        validSources.push("5.2 SRD (2025 MM)");
    }
    let monsterList = [];
    for (let i= 0; i < fullMonsterList.length; i++){
        let monster = fullMonsterList[i];
        if (validSources.includes(monster.source)) {
            monsterList.push(monster);
        }
    }
    if (monsterList.length === 0){
        return {
            encounterDict: {},
            maxInt: 0,
            minStealth: 0,
        }
    }

    let totalXP = 0;
    let encounter = [];
    let encounterDict = {};
    let loopCount = 0;
    let randomNum = Math.floor(Math.random() * monsterList.length);
    let draws = [];
    let drawLimit = Number(document.getElementById("maxDiffMonsters").value);
    let monster = monsterList[randomNum];
    let maxInt = 0;
    try {
        maxInt = monster.int;
    } catch {}


    let minStealth = 0;
    if (monster.stealth){
        minStealth += monster.stealth;
    } else {
        minStealth += getModifierFromScore(monster.dex);
    }
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

            if (!maxInt || monster.int > maxInt) {
                maxInt = monster.int;
            }
            let stealth = 0;
            if (monster.stealth){
                stealth = monster.stealth;
            } else {
                stealth = getModifierFromScore(monster.dex);
            }
            if (!minStealth || stealth < minStealth) {
                minStealth = stealth;
            }
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

        if (!document.getElementById("use-multiplier").checked){
            console.log("Not using a multiplier");
            multiplier = 1;
        }
        if ((totalXP + monster.xp) * multiplier <= limit) {
            totalXP += monster.xp;
            encounter.push(monster);
            if (monster.key in encounterDict) {
                encounterDict[monster.key].qty++;
            } else {
                encounterDict[monster.key] = monster;
                encounterDict[monster.key].qty = 1;
                encounterDict[monster.key].init = Roll(20) + getModifierFromScore(monster.dex);

            }
            draws.push(randomNum);

        }
    }
    let result = {
        encounterDict: encounterDict,
        maxInt: maxInt,
        minStealth: Roll(20) + minStealth,
    }

    console.log(`Min stealth ${minStealth}`);
    console.log("Actual Difficulty: ");
    if (totalXP * multiplier <= limits[0]) {
        console.log("Easy");
    } else if (totalXP * multiplier <= limits[1]) {
        console.log("Medium");
    } else if (totalXP * multiplier <= limits[2]) {
        console.log("Hard");
    } else {
        console.log("Deadly");
    }

    return result

}

function RandomEncounterInput({setEncounter, party}){
    const [monsterTypeOptions, setMonsterTypeOptions] = useState(
        []
    );
    const [limits, setLimits] = useState([0, 0, 0, 0]);
    
    useEffect(() => {
        changeEnviron("dungeon", setMonsterTypeOptions)
    }, []);
    
    // Update limits whenever party changes
    useEffect(() => {
        const newLimits = getPartyLimits(party);
        setLimits(newLimits);
    }, [party]);
    return (
        <div className="w3-container">
            <div className="w3-row-padding">
                <div className="w3-col m1">
                    <label>Use mulitiplier? </label>
                    <input className="w3-check" type="checkbox" id="use-multiplier"/>
                </div>
                <div className="w3-col m3">
                    <label>Difficulty</label>
                    <select name="difficulty" id="difficulty" className="w3-select">
                        <option value="easy">Trivial (don't use) &lt; {limits[0]}</option>
                        <option value="medium">Easy &lt; {limits[1]}</option>
                        <option value="hard" selected="selected">Moderate &lt; {limits[2]}</option>
                        <option value="deadly">Hard &lt; {limits[3]}</option>
                    </select>
                </div>
                <div className="w3-col m3">
                    <label>Environment</label>
                    <select
                        name="environ"
                        id="encounter-environ"
                        onChange={
                        (e) =>
                            changeEnviron(e.target.value, setMonsterTypeOptions)
                        }

                        className="w3-select"
                    >
                        {allEnvirons}
                    </select>
                </div>
                <div className="w3-col m3">
                    <label>Monster Type</label>
                    <select name="monster-type" id="monster-type"  className="w3-select">
                        {monsterTypeOptions}
                    </select>
                </div>
                <div className="w3-col m2">
                    <label>Max different creatures</label>
                    <input type="number" defaultValue="2" id="maxDiffMonsters" className="w3-input"/>
                </div>
                <div className="w3-col m3">
                    <label>SRD 5.1 (2014)</label>
                    <input type="checkbox" id="srd5.1"/>
                    <label>2014 MM</label>
                    <input type="checkbox" id="2014 MM"/>
                    <label>SRD 5.2 (2025)</label>
                    <input type="checkbox" id="srd5.2" checked/>
                </div>
            </div>
            <div className="w3-container">
                <input type="button" className="w3-block" defaultValue="Dressing" onClick={
                    () => {
                        let dressing = document.getElementById("random-setting");
                        let environ = document.getElementById("encounter-environ").value.toLowerCase();
                        dressing.innerText = getRandomThingFromList(getListFromEnviron(environ));
                    }
                }/>
                <p className="w3-panel w3-pale-yellow w3-padding-large w3-border w3-border-red w3-round-xxlarge" id="random-setting"></p>
            </div>
            <p>
                <input type="button" defaultValue="Generate" onClick={() => setEncounter(generate(party))} className="w3-block" />
            </p>
        </div>
    )
}

function MonsterFamilyList({ selectedFamily }) {
    if (!selectedFamily) return null;

    const monsterFamily = getFamily(selectedFamily);
    if (!monsterFamily?.list) return null;

    let sortedMonsters = monsterFamily.list;

    sortedMonsters.sort(function(a, b) {
        return a.xp - b.xp;
    });

    return (
        <div className="w3-container ">
            <h4>Monsters in Family:</h4>
            <ul className="w3-ul">
                {sortedMonsters.map((monster, index) => (
                    <li key={index}>
                        <a href={monster.link || `https://www.dndbeyond.com/monsters/${monster.key}`}
                           target="_blank"
                           rel="noopener noreferrer">
                             {monster.xp} - {monster.name} {monster.source}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function setEncounter2(encounter) {
    let i =0;
    for (const [key, value] of Object.entries(encounter.encounterDict)) {
        let monster = value;
        document.getElementById(`monster-name-${i}`).value = monster.name;
        document.getElementById(`numAttackers-${i}`).value = monster.qty;
        document.getElementById(`attacksPerMonster-${i}`).value = 0;
        document.getElementById(`attackBonus-${i}`).value = 0;
        document.getElementById(`damage-${i}`).value =0;
        document.getElementById(`armor-class-${i}`).value = monster.ac;
        document.getElementById(`hit-points-${i}`).value = monster.hp * monster.qty;
        document.getElementById(`hit-point-maximum-${i}`).value = monster.hp * monster.qty;

        let init = 6;
        if (monster.init < 5) {
            init = 5;
        } else if (monster.init === 14) {
            init = 13;
        } else if (monster.init > 23) {
            init = 23;
        } else {
            init = monster.init;
        }
        document.getElementById(`initiative-${i}`).value = init;
        i++;
    }
}

export default function RandomEncounter2({party}){
    const [encounter, setEncounter] = useState({encounterDict: {}});
    const [remainingMonsters, setRemainingMonsters] = useState({});

    // Function to handle quantity changes - only updates display state
    const updateQuantity = (monsterId, change) => {
        setRemainingMonsters(prev => {
            const newQuantities = { ...prev };
            const currentQty = newQuantities[monsterId] ?? encounter.encounterDict[monsterId]?.qty ?? 0;
            const newQty = Math.max(0, currentQty + change);
            newQuantities[monsterId] = newQty;
            return newQuantities;
        });
    };

    // Create the monster cards directly from encounter and remainingMonsters state
    const monsterCards = Object.entries(encounter.encounterDict).map(([key, value]) => (
        <div key={key} className="w3-col l3 m3 s12" style={{padding: '8px'}}>
            <div className="w3-card-4 w3-black">
                <header className="w3-container w3-red" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h3 style={{margin: '8px 0'}}>{value.name} - {remainingMonsters[key] ?? value.qty}</h3>
                    <div>
                        <button 
                            className="w3-button w3-black" 
                            onClick={() => updateQuantity(key, -1)}
                            style={{padding: '4px 8px', marginRight: '4px'}}
                        >
                            -
                        </button>
                        <button 
                            className="w3-button w3-black" 
                            onClick={() => updateQuantity(key, 1)}
                            style={{padding: '4px 8px'}}
                        >
                            +
                        </button>
                    </div>
                </header>
                <div className="w3-container" style={{padding: 0, height: '600px'}}>
                    <iframe 
                        src={`/monster-wrapper.html?monster=${key}.html`}
                        style={{width: '100%', height: '100%', border: 'none', scrollbarWidth: 'none'}}
                        title={value.name}
                    />
                </div>
            </div>
        </div>
    ));

    let xp_values = [];
    let encounterBlock = [];
    let totalXP = 0;


    encounterBlock.push(
        <>Monster Stealth: {encounter.minStealth}<br/></>
    )
    for (const [key, value] of Object.entries(encounter.encounterDict)) {
        for (let i=0; i < value.qty; i++) {
            xp_values.push(value.xp);
            totalXP += value.xp;
        }
        encounterBlock.push(
            <>{value.qty} <a href={value.link ? value.link : `https://www.dndbeyond.com/monsters/${value.key}`} target="_blank">{value.name} @ {value.xp} - Init: {value.init} {value.source}</a><br/></>
        )
    }
    encounterBlock.push(<>XP: {totalXP}</>)

    if (document.getElementById("monster-xp")) {
        document.getElementById("monster-xp").value = xp_values.join(",");
    }

    let selectedFamily = document.getElementById("monster-type")?.value;

    return (
        <div className="w3-container">
            <h1>Random Encounter</h1>
            <div className="w3-container w3-show" id="randomencounter">
                <RandomEncounterInput setEncounter={setEncounter}
                                      party={party}></RandomEncounterInput>
                <p>
                    {encounterBlock}
                    <input type="button" defaultValue="Set" onClick={(e) => {
                        e.target.disabled = true;
                        try {
                            window.parent.postMessage({
                                type: 'setEncounter',
                                encounter: encounter.encounterDict
                            }, '*'); // Specify exact target origin for security

                            setTimeout(() => {
                                e.target.disabled = false;
                            }, 1000);
                        } catch (exception) {
                            console.error('Error creating monster cards:', exception);
                        }
                    }} className="w3-block w3-button w3-red"/>
                </p>
            </div>
            
            {/* Monster Cards Container */}
            <div className="w3-row-padding">
                {monsterCards}
            </div>

            <div className="w3-container">
                <input type="button" id="encounter-distance-button" defaultValue="Encounter Distance: " onClick={
                    () => {
                        let encounterDistance = document.getElementById("encounter-distance-button");
                        let environ = document.getElementById("encounter-environ").value.toLowerCase();

                        encounterDistance.value = `Encounter distance: ${getRandomEncounterDistance(environ)}`;
                    }
                }/>
            </div>
            <MonsterFamilyList selectedFamily={selectedFamily} />
        </div>
    )
}