import {useState} from "react";
import Foraging from "./Foraging";
import Tracking from "./Tracking";
import { hideShow, getRandomThingFromList } from "../utils";
import { RandomEntrance } from "./randomDungeon/RandomEntrance";

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

export default function Wilderness() {
    let days = 0;
    let hours = 0;
    let distance = 0;
    let tiles = 0;
    let forcedMarch = false;
    let forcedMarchDC = "";
    const [temperature, setTemperature] = useState("Normal for the season");
    const [wind, setWind] = useState("No wind");
    const [precip, setPrecip] = useState("No precipitation");
    const [visibility, setVisibility] = useState("2 miles. 40 miles from a height.");
    const [environ, setEnviron] = useState("Grassland");
    const [encounterDistance, setEncounterDistance] = useState(0);

    const environs = ["Grassland", "Forest", "Hills", "Mountains", "Swamp", "Farmland", "Badlands", "Arctic", "Desert", "Underworld"];
    const [navDC, setNavDC] = useState(10);
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
            x.className = x.className.replace(" w3-show", " w3-hide");
        }
    }

    function setForcedMarchDC(val) {
        forcedMarchDC = val;
        let x = document.getElementById("forcedMarchDC")
        x.innerHTML = `<p>${val}</p>`;
        x.className = x.className.replace(" w3-hide", " w3-show");

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

    function march() {
        let pace; // miles per hour
        let rate;
        let difficult = document.getElementById("difficultTerrain").checked;
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

        // hours += rate;

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
                    let kind = "";
                    let _roll = roll(100);
                    if (_roll <= 40) {
                        kind = "Monster";
                    } else if (_roll <= 50) {
                        kind = `Dungeon: ${getRandomThingFromList(RandomEntrance)}`;
                    } else if (_roll <= 75) {
                        kind = `Monument: ${getLandmarkFeature()}`;
                    } else {
                        kind = "Kaiju";
                    }
                    encounter.innerText = kind;
                
                    encounterBlock.className = encounterBlock.className.replace(" w3-hide", " w3-show");
                
                break;
            }
        }
    }

    function newDay() {
        setHours(0);
        setDistance(0);
        setTiles(0);
        setForcedMarch(false);
        //setForcedMarchDC("");
        setDays(getDays() + 1);
        randomWeather();
    }

    function changeEnviron(newEnviron) {
        setEnviron(newEnviron);
        if (["Arctic", "Desert", "Farmland", "Grassland", "Badlands"].includes(newEnviron)){
            setEncounterDistance(roll(6, 6) * 10);
        } else if (["Forest", "Swamp", "Underworld"].includes(newEnviron)){
            setEncounterDistance(roll(8, 2) * 10);
        } else if (["Hills"].includes(newEnviron)) {
            setEncounterDistance(roll(10, 2) * 10);
        } else if (["Mountains"].includes(newEnviron)) {
            setEncounterDistance(roll(10, 4) * 10);
        }

        if (["Forest", "Jungle", "Swamp", "Mountains"].includes(newEnviron)) {
            setNavDC(15);
        } else if (["Arctic", "Desert", "Hills", "Badlands", "Underworld"].includes(newEnviron)) {
            setNavDC(10);
        } else if (["Grassland", "Farmland"].includes(newEnviron)) {
            setNavDC(5);
        }

    }

    function randomWeather() {

        let _roll = roll(20);
        if (_roll <= 14){
            setTemperature("Normal for the season");
        } else if (_roll <= 17){
            setTemperature(`${roll(4) * 10} degrees F colder than normal`);
        } else {
            setTemperature(`${roll(4) * 10} degrees F hotter than normal`);
        }

        _roll = roll(20);
        if (_roll <= 12) {
            setWind("None");
        } else if (roll <= 17) {
            setWind("Light");
        } else {
            setWind("Strong");
        }

        _roll = roll(20);
        if (_roll <= 12){
            setPrecip("None");
            setVisibility("2 miles. 40 miles from a height.");
        } else if (_roll <= 17) {
            setPrecip("Light rain or light snowfall");
            setVisibility("1 mile. 20 miles from a height.");
        } else {
            setPrecip("Heavy rain or snowfall");
            setVisibility("1/2 mile. 10 miles from a height.");
        }
    }

    let environOptions = [];
    environs.forEach(environ => environOptions.push(
        <>
        <option value={environ}>{environ}</option>
        </>
    ))



    return (
        <div class="w3-container">
            <h1 onClick={() => hideShow("wilderness")}>Wilderness Exploration</h1>
            <div class="w3-container w3-show" id="wilderness">
                <h2>Environment</h2>
                <p><select
                    name="environment"
                    class="w3-select"
                    id="environment"
                    value={environ}
                    onChange={(event) => changeEnviron(event.target.value)}>
                    {environOptions}
                </select></p>
                <p>Encounter Distance: {encounterDistance}</p>
                <p>Survival (Wisdom) Navigation check: DC {navDC}</p>
                <h3>Foraging</h3>
                <Foraging />
                <h3>Tracking</h3>
                <Tracking />
                <h2>Weather</h2>
                <div id="weather" class="w3-container">
                        <p>Temperature: {temperature}</p>
                        <p>Wind: {wind}</p>
                        <p>Precipitation: {precip}</p>
                        <p>Visibility: {visibility}</p>
                </div>
                <input type="button" class="w3-button" value="Generate"
                    onClick={() => randomWeather()}/>

                <h2>Marching</h2>
                    <p>
                    <label for="forcedMarch">Forced March </label>
                    <input type="checkbox" class="w3-check" id="forcedMarch"/>
                    <p id="forcedMarchDC" class="w3-panel w3-red w3-hide"></p>
                    </p>
                    <p>
                    <label for="daysMarched">Days Marched: </label>
                    <input type="text" id="daysMarched" class="w3-input" defaultValue="0"/><br/>
                    </p>
                    <p>
                    <label for="hoursMarched">Hours Marched: </label>
                    <input type="text" class="w3-input" id="hoursMarched" defaultValue="0"/>
                    </p>
                    <p>
                    <label for="distanceMarched">Distance Marched: </label>
                    <input type="text" class="w3-input" id="distanceMarched" defaultValue="0"/>
                    </p>
                    <p>
                    <label for="tilesMarched">Tiles Marched: </label>
                    <input type="text" class="w3-input" id="tilesMarched" defaultValue="0"/>
                    </p>
                    <p>
                    <label for="encounterChance">Chance of Encounter per hour
                        (%)</label><br/>
                    <input type="text" class="w3-input" id="encounterChance" defaultValue="5"/>
                    </p>
                    <p>
                    <input type="radio" class="w3-radio" id="paceSlow" value="slow" name="pace"/>
                    <label for="paceSlow">Slow (2 mph, can stealth, +5
                        navigation)</label>
                    </p>
                    <p>
                    <input type="radio" class="w3-radio" id="paceNormal" value="normal" name="pace" checked/>
                    <label for="paceNormal">Normal (3 mph)</label><br/>
                    </p>
                    <p>
                    <input type="radio" class="w3-radio" id="paceFast" value="fast" name="pace"/>
                    <label for="paceFast">Fast (4 mph, disadvantage on perception, -5
                        navigation)</label><br/>
                    </p>
                    <p>
                    <label for="difficultTerrain">Difficult Terrain </label>
                    <input type="checkbox" id="difficultTerrain" class="w3-check" /><br/>
                    </p>
                    
                    <div class="w3-row">
                        <div class="w3-col s3">
                            <p>
                                <input type="button" class="w3-button" value="Lost" id="lost" onClick={lost}/>&ensp;or &ensp;
                                <input type="button" class="w3-button" value="March" id="march" onClick={march}/>
                            </p>
                        </div>
                        <div class="w3-col s9">
                            <span id="encounter" class="w3-panel w3-teal w3-display-container w3-animate-right w3-show">
                                <span onClick={() => hideShow("encounter")} class="w3-button w3-display-topright">&times;</span>
                                <h4>
                                Random Encounter 
                                </h4>
                                <p id="encounterKind">Monster</p>
                            </span>
                        </div>
                    </div>


                    
                    
                    <p>
                    <input type="button" class="w3-button" value="New Day" id="newDay" onClick={newDay}/>
                    </p>
                    
                
            </div>
        </div>
    );
}