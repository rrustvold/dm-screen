import {useState} from "react";
import Foraging from "./Foraging";
import Tracking from "./Tracking";
import { generate } from "./RandomEncounter";
import { hideShow, getRandomThingFromList } from "../utils";
import { RandomEntrance } from "./randomDungeon/RandomEntrance";
import { desert, forest, grassland, hills, monuntains, swamp } from "./WildernessDressing";
import { randomActivity } from "./randomEncounter/randomMonsterActivity";

function getLandmarkFeature() {
    let _roll = roll(20);
    if (_roll === 1) {
        return "Sealed burial mound or pyramid";
    } else if (_roll === 2) {
        return "Plundered burial mound or pyramid";
    } else if (_roll === 3) {
        return "Faces carved into a mountainside or cliff";
    } else if (_roll === 4) {
        return "Giant statues carved out of a mountainside or cliff";
    } else if (_roll >= 5 && _roll <= 6) {
        return "Intact obelisk etched with a warning, historical lore, dedication, or religious iconography";
    } else if (_roll >= 7 && _roll <= 8) {
        return "Ruined or toppled obelisk";
    } else if (_roll >= 9 && _roll <= 10) {
        return "Intact statue of a person or deity";
    } else if (_roll >= 11 && _roll <= 13) {
        return "Ruined or toppled statue of a person or deity";
    } else if (_roll === 14) {
        return "Great stone wall, intact, with tower fortifications spaced at one-mile intervals";
    } else if (_roll === 15) {
        return "Great stone wall in ruins";
    } else if (_roll === 16) {
        return "Great stone arch";
    } else if (_roll === 17) {
        return "Fountain";
    } else if (_roll === 18) {
        return "Intact circle of standing stones";
    } else if (_roll === 19) {
        return "Ruined or toppled circle of standing stones";
    } else if (_roll === 20) {
        return "Totem pole";
    }
}


function roll(sides, numDice=1) {
    let sum = 0;
    for (let i=0; i < numDice; i++) {
        sum += Math.floor(Math.random()*sides) + 1;
    }
    return sum;
}


export function getListFromEnviron(environ){
    switch (environ.toLowerCase()) {
        case "grassland":
            return grassland
        case "forest":
            return forest
        case "hills":
            return hills
        case "mountains":
            return monuntains
        case "swamp":
            return swamp
        case "farmland":
            return grassland
        case "arctic":
            return []
        case "desert":
            return desert
        case "underworld":
            return []
        case "coast":
            return []
    }
}

export function getRandomEncounterDistance(environment){
    console.log(environment);
    if (["arctic", "desert", "farmland", "grassland", "badlands", "coast"].includes(environment)){
        return roll(6, 6) * 10
    } else if (["forest", "swamp", "underworld"].includes(environment)){
        return roll(8, 2) * 10
    } else if (["hills"].includes(environment)) {
        return roll(10, 2) * 10
    } else if (["mountains"].includes(environment)) {
        return roll(10, 4) * 10
    }
}

export default function Wilderness({party}) {
    let days = 0;
    let hours = 0;
    let distance = 0;
    let tiles = 0;
    let forcedMarch = false;
    let forcedMarchDC = "";
    let difficultTerrain = false;
    const [temperature, setTemperature] = useState("Normal for the season");
    const [wind, setWind] = useState("No wind");
    const [precip, setPrecip] = useState("No precipitation");
    const [visibility, setVisibility] = useState("2 miles. 40 miles from a height.");
    const [environ, setEnviron] = useState("Grassland");
    const [encounterDistance, setEncounterDistance] = useState(0);
    const [forcedMarchDCValue, setForcedMarchDCValue] = useState("");

    const environs = ["Grassland", "Coast", "Forest", "Hills", "Mountains", "Swamp", "Arctic", "Desert", "Underworld"];
    const environSurvivalDC = [5, 5, 15, 10, 15, 15, 10, 10, 10];
    const [navDC, setNavDC] = useState(10);

    const [randomEvent, setRandomEvent] = useState({encounterDict: {}, activity: ""});

    function setHours(val){
        hours = val;
        document.getElementById("hoursMarched").value = val;
    }

    function getHours(){
        return Number(document.getElementById("hoursMarched").value);
    }

    function setDays(val){
        days = val;
        document.getElementById("daysMarched").value = val;
    }
    function getDays() {
        return Number(document.getElementById("daysMarched").value);
    }

    function setDistance(val){
        distance = val;
        document.getElementById("distanceMarched").value = val;
    }

    function getDistance(){
        return Number(document.getElementById("distanceMarched").value)
    }

    function setTiles(val) {
        tiles = val;
        document.getElementById("tilesMarched").value = val;
    }

    function setForcedMarch(val) {
        forcedMarch = val;
        document.getElementById("forcedMarch").checked = val;
        console.log(val);
        if (val === false) {
            let x = document.getElementById("forcedMarchDC");
            x.className = x.className.replace(" w3-red", " w3-gray");
        }
    }

    function setForcedMarchDC(val) {
        forcedMarchDC = val;
        let x = document.getElementById("forcedMarchDC")
        setForcedMarchDCValue(val);
        console.log("THE VALUE IS");
        console.log(val);
        x.className = x.className.replace(" w3-gray", " w3-red");

    }

    function setWeather(val) {
        document.getElementById("weather").innerText = val;
    }

    function lost() {
        setHours(getHours() + roll(6))
        checkForcedMarch();
    }

    function checkForcedMarch(){
        if (getHours() >= 8) {
            setForcedMarch(true);
            setForcedMarchDC(`DC ${10 + getHours() - 8} Con Save per hour`);
        }
    }

    function getRandomEncounterDifficulty(){
        let _roll = roll(100);
        if (_roll <= 10){return "Easy"}
        if (_roll <= 50){return "Medium"}
        if (_roll <= 90){return "Hard"}
        if (_roll <= 100){return "Deadly"}
    }

    function march(setRandomEvent, environ) {
        console.log("March!");
        let pace; // miles per hour
        let rate;
        let difficult = difficultTerrain;
        if (document.getElementById("paceSlow").checked){
            pace = 2;
            rate = 2;
        } else if (document.getElementById("paceNormal").checked) {
            pace = 3;
            rate = 2;
        } else {
            pace = 4;
            rate = 2;
        }
        if (document.getElementById("forcedMarch").checked) {
            rate = 1;
        }
        if (difficult){
            pace /= 2;
        }

        setHours(getHours() + rate);
        checkForcedMarch();

        setDistance(getDistance() + pace * rate);

        setTiles(Math.floor(getDistance() / 6));

        let encounterChance = Number(document.getElementById("encounterChance").value);
        let encounterBlock = document.getElementById("encounter");
        encounterBlock.className = encounterBlock.className.replace(" w3-show", " w3-hide");
        for (let i=0; i<rate; i++) {
            if (roll(100) <= encounterChance) {
                    
                    let encounter = document.getElementById("encounterKind");
                    let dressing = document.getElementById("wildernessDressing");
                    let kind = "";
                    let _roll = roll(100);
                    setRandomEvent({encounterDict: {}, activity: ""});
                    if (_roll <= 40) {
                        let difficulty = getRandomEncounterDifficulty();
                        console.log(`The environment is ${environ}`);
                        let randomEncounter = generate(party, difficulty, `any${environ}`);
                        randomEncounter.difficulty = difficulty;
                        if (randomEncounter.maxInt >= 7) {
                            // Determine monster activity
                            randomEncounter.activity = getRandomThingFromList(randomActivity);
                            console.log(randomEncounter.activity);
                        } else {
                            randomEncounter.activity = "dumb";
                        }
                        setRandomEvent(randomEncounter);
                        kind = `Monster (${difficulty}) at ${getRandomEncounterDistance(environ)} feet`;
                    } else if (_roll <= 50) {
                        kind = `Dungeon: ${getRandomThingFromList(RandomEntrance(environ))}`;
                    } else if (_roll <= 75) {
                        kind = `Monument: ${getLandmarkFeature()}`;
                    } else if (_roll <= 95) {
                        kind = "Keeper";
                    } else {
                        kind = "Muse/Druid";
                    }
                    encounter.innerText = kind;

                    dressing.innerText = getRandomThingFromList(getListFromEnviron(environ));

                    encounterBlock.className = encounterBlock.className.replace(" w3-hide", " w3-show");
                
                break;
            }
        }
    }

    function newDay() {
        setHours(0);
        setDistance(0);
        setTiles(0);
        setForcedMarchDCValue("");
        setForcedMarch(false);
        //setForcedMarchDC("");
        setDays(getDays() + 1);
        randomWeather();

    }



    function changeEnviron(newEnviron) {
        setEnviron(newEnviron);
        setEncounterDistance(getRandomEncounterDistance(newEnviron))

        if (["Forest", "Jungle", "Swamp", "Mountains"].includes(newEnviron)) {
            setNavDC(15);
        } else if (["Arctic", "Desert", "Hills", "Badlands", "Underworld"].includes(newEnviron)) {
            setNavDC(10);
        } else if (["Grassland", "Farmland"].includes(newEnviron)) {
            setNavDC(5);
        }

    }

    function randomWeather() {
        let season = document.getElementById("season").value;
        let temp = 70
        switch (season) {
            case "winter":
                temp = 30;
                break;
            case "spring":
                temp = 50;
                break;
            case "summer":
                temp = 80;
                break;
            case "fall":
                temp = 40;
                break;
        }

        let _roll = roll(20);
        if (_roll <= 14){
        } else if (_roll <= 17){
            temp -= roll(20) * 2
        } else {
            temp += roll(20) * 2
        }

        
        let tempPanel = document.getElementById("tempPanel");
        if (temp >= 100) {
            // temp += " Extreme Heat. Extra water needed";
            tempPanel.className = "w3-panel w3-red";
        }
        else if (temp <= 0 ) {
            // temp += " Extreme Cold. DC10 Con save each hour or exhaustion."
            tempPanel.className = "w3-panel w3-blue";
        }
        else {
            tempPanel.className = "w3-panel";
        }
        setTemperature(temp);

        let windPanel = document.getElementById("windPanel");
        _roll = roll(20);
        if (_roll <= 12) {
            setWind("None");
            windPanel.className = "w3-panel";
        } else if (roll <= 17) {
            setWind("Light");
            windPanel.className = "w3-panel";
        } else {
            setWind(<>
                Strong
                <ul>
                    <li>Disad. on ranged weapon attacks</li>
                    <li>Dsiad. on Wisdom (Perception) that rely on listening</li>
                    <li>Extinguishes open flames</li>
                    <li>Disperses Fog</li>
                    <li>No non-magical flying</li>
                    <li>Possible dust or sandstorms</li>
                </ul>
            </>
            );
            windPanel.className = "w3-panel w3-blue";
        }

        let precipPanel = document.getElementById("precipPanel");
        _roll = roll(20);
        if (_roll <= 12){
            setPrecip("None");
            precipPanel.className = "w3-panel";
            setVisibility("2 miles. 40 miles from a height.");
        } else if (_roll <= 17) {
            precipPanel.className = "w3-panel";
            setPrecip("Light rain or light snowfall");
            setVisibility("1 mile. 20 miles from a height.");
        } else {
            precipPanel.className = "w3-panel w3-blue";
            setPrecip(<>
                Heavy Rain or Snowfall
                <ul>
                    <li>Vision is lightly obscured</li>
                    <li>Disad. on Wisdom (perception)</li>
                    <li>Extinguishes open flames</li>
                </ul>
            </>);
            setVisibility("1/2 mile. 10 miles from a height.");
        }

    }

    let environOptions = [];
    environs.forEach(environ => environOptions.push(
        <>
        <option value={environ}>{environ}</option>
        </>
    ))

    
    let xp_values = [];
    let randomEventBlock = [];
    console.log(randomEvent);
    randomEventBlock.push(
        <>Monster Stealth: {randomEvent.minStealth}<br/></>
    )
    for (const [key, value] of Object.entries(randomEvent.encounterDict)) {
        for (let i=0; i < value.qty; i++) {
            xp_values.push(value.xp);
        }
        randomEventBlock.push(
            <>{value.qty} <a href={value.link ? value.link : `https://www.dndbeyond.com/monsters/${value.key}`} target="_blank">{value.name} - Init {value.init}</a><br/></>
        )
    }
    if (randomEventBlock.length > 0) {
        randomEventBlock.push(<p></p>);
        randomEventBlock.push(<p>Monsters are: {randomEvent.activity}</p>)
    }



    if (document.getElementById("monster-xp")) {
        document.getElementById("monster-xp").value = xp_values.join(",");
    }

    let marchButtons = [];
    for (let i=0; i < environs.length; i++){
        if (environs[i] == "Mountains" || environs[i] == "Swamp"){

        }
        marchButtons.push(
            <input type="button" class="w3-button" value={environs[i] + " " + environSurvivalDC[i]} onClick={
                () => {
                    setEnviron(environs[i]); 
                    if (environs[i] == "Mountains" || environs[i] == "Swamp") {
                        difficultTerrain = true;
                    } else {
                        difficultTerrain = false;
                    }
                    march(setRandomEvent, environs[i]);
                    
                }
            }/>
        )
    }

    return (
        <div class="w3-container">
            <h1 onClick={() => hideShow("wilderness")}>Wilderness Exploration</h1>
            <div className="w3-container w3-show" id="wilderness">
                {/*<h3>Foraging</h3>*/}
                {/*<Foraging/>*/}
                {/*<h3>Tracking</h3>*/}
                {/*<Tracking/>*/}


                <h2>Marching</h2>

                <div className="w3-container-fluid">
                    <p>
                        <label>Season </label>
                        <select class="w3-select" id="season">
                            <option value="winter">Winter</option>
                            <option value="spring">Spring</option>
                            <option value="summer">Summer</option>
                            <option value="fall">Fall</option>
                        </select>
                    </p>
                </div>


                {/* <p>*/}
                {/*    <label htmlFor="daysMarched">Days Marched: </label>*/}
                {/*    <input type="text" id="daysMarched" className="w3-input"*/}
                {/*           defaultValue="0"/><br/>*/}
                {/*</p>*/}
                {/*/!*<div className="w3-row-padding">*!/*/}
                {/*    <div className="w3-col l4">*/}
                {/*        <p>*/}
                {/*            <label htmlFor="hoursMarched">Hours Marched: </label>*/}
                {/*            <input type="text" className="w3-input" id="hoursMarched"*/}
                {/*                   defaultValue="0"/>*/}
                {/*        </p>*/}
                {/*    </div>*/}
                {/*    <div className="w3-col l4">*/}
                {/*        <p>*/}
                {/*            <label htmlFor="distanceMarched">Miles Marched: </label>*/}
                {/*            <input type="text" className="w3-input" id="distanceMarched"*/}
                {/*                   defaultValue="0"/>*/}
                {/*        </p>*/}
                {/*    </div>*/}
                {/*    <div className="w3-col l4">*/}
                {/*        <p>*/}
                {/*            <label htmlFor="tilesMarched">Tiles Marched: </label>*/}
                {/*            <input type="text" className="w3-input" id="tilesMarched"*/}
                {/*                   defaultValue="0"/>*/}
                {/*        </p>*/}
                {/*    </div>*/}
                {/*/!*</div>*!/*/}

                {/*<p>*/}
                {/*    <label htmlFor="encounterChance">Chance of Encounter per hour*/}
                {/*        (%)</label><br/>*/}
                {/*    <input type="text" className="w3-input" id="encounterChance"*/}
                {/*           defaultValue="20"/>*/}
                {/*</p>*/}
                {/*<div className="w3-row-padding">*/}
                {/*    <div className="w3-col l4">*/}
                {/*        <p>*/}
                {/*            <input type="radio" className="w3-radio" id="paceSlow"*/}
                {/*                   value="slow" name="pace"/>*/}
                {/*            <label htmlFor="paceSlow">Slow (2 mph, advantage on Wisdom*/}
                {/*                (perception or survival)) </label>*/}
                {/*        </p>*/}
                {/*    </div>*/}
                {/*    <div className="w3-col l4">*/}
                {/*        <p>*/}
                {/*            <input type="radio" className="w3-radio" id="paceNormal"*/}
                {/*                   value="normal" name="pace"/>*/}
                {/*            <label htmlFor="paceNormal">Normal (3 mph, disadvantage*/}
                {/*                (stealth)) </label>*/}
                {/*        </p>*/}
                {/*    </div>*/}
                {/*    <div className="w3-col l4">*/}
                {/*        <p>*/}
                {/*            <input type="radio" className="w3-radio" id="paceFast"*/}
                {/*                   value="fast" name="pace"/>*/}
                {/*            <label htmlFor="paceFast">Fast (4 mph, disadvantage on*/}
                {/*                Wisdom*/}
                {/*                (perception or survival) and Dexterity*/}
                {/*                (stealth)) </label>*/}
                {/*        </p>*/}
                {/*    </div>*/}
                {/*</div> */}

                <div id="weather" className="w3-panel w3-blue-gray">
                    <div className="w3-row-padded">
                        <div className="w3-col l3">
                            <div className="w3-panel" id="tempPanel">
                                {temperature}
                            </div>
                        </div>
                        <div className="w3-col l3">
                            <div className="w3-panel" id="windPanel">
                                {wind}
                            </div>
                        </div>
                        <div className="w3-col l3">
                            <div className="w3-panel" id="precipPanel">
                                {precip}
                            </div>
                        </div>
                        <div className="w3-col l3">
                            <div className="w3-panel" id="visibPanel">
                                {visibility}
                            </div>
                        </div>
                    </div>

                </div>

                <div class="w3-container w3-cell">
                    <input type="button" className="w3-button" value="Generate Weather"
                           onClick={() => randomWeather()}/>
                </div>
                {/*<div class="w3-container w3-cell">*/}
                {/*    <input type="button" id="forcedMarchDC" value={forcedMarchDCValue}*/}
                {/*           className="w3-button w3-gray"></input>*/}
                {/*</div>*/}

                {/*<div className="w3-container w3-cell w3-cell-top">*/}

                {/*        <label htmlFor="forcedMarch">Forced March </label>*/}
                {/*        <input type="checkbox" className="w3-check" id="forcedMarch"/>*/}

                {/*</div>*/}


                {/*<div className="w3-container">*/}

                {/*</div>*/}

                {/* <div className="w3-row">*/}
                {/*    <div className="w3-col s3">*/}
                {/*        <p>The march terrain is whatever terrain the characters are currently in.</p>*/}
                {/*        <p>*/}
                {/*            <input type="button" className="w3-button" value="Lost"*/}
                {/*                   id="lost" onClick={lost}/>&ensp;or &ensp;*/}
                {/*            {marchButtons}*/}
                {/*        </p>*/}
                {/*    </div>*/}
                {/*    <div className="w3-col s9">*/}
                {/*            <span id="encounter"*/}
                {/*                  class="w3-panel w3-teal w3-display-container w3-animate-right w3-hide">*/}
                {/*                <span onClick={() => hideShow("encounter")}*/}
                {/*                      class="w3-button w3-display-topright">&times;</span>*/}
                {/*                <h4>*/}
                {/*                Random Encounter */}
                {/*                </h4>*/}
                {/*                <p id="wildernessDressing"></p>*/}
                {/*                <p id="encounterKind"></p>*/}
                {/*                {randomEventBlock}*/}
                {/*            </span>*/}
                {/*    </div>*/}
                {/*</div> */}


                {/*<p>*/}
                {/*    <input type="button" className="w3-button" value="New Day"*/}
                {/*           id="newDay"*/}
                {/*           onClick={newDay}/>*/}
                {/*</p>*/}


            </div>
        </div>
    );
}