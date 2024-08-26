import {useState} from "react";
import Foraging from "./Foraging";
import Tracking from "./Tracking";

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
    }

    function setForcedMarchDC(val) {
        forcedMarchDC = val;
        document.getElementById("forcedMarchDC").innerText = val;
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
        document.getElementById("encounter").innerText = ""
        for (let i=0; i<rate; i++) {
            if (roll(100) <= encounterChance) {
                document.getElementById("encounter").innerText = "RANDOM ENCOUNTER";
                break;
            }
        }
    }

    function newDay() {
        setHours(0);
        setDistance(0);
        setTiles(0);
        setForcedMarch(false);
        setForcedMarchDC("");
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
        <div>
            <h1>Wilderness Exploration</h1>
            <h2>Environment</h2>
            <select
                name="environment"
                id="environment"
                value={environ}
                onChange={(event) => changeEnviron(event.target.value)}>
                {environOptions}
            </select><br/>
            Encounter Distance: {encounterDistance}<br/>
            Survival (Wisdom) Navigation check: DC {navDC}<br/>
            <h3>Foraging</h3>
            <Foraging />
            <h3>Tracking</h3>
            <Tracking />
            <h2>Weather</h2>
            <div id="weather">
                <div>
                    Temperature: {temperature}<br/>
                    Wind: {wind}<br/>
                    Precipitation: {precip}<br/>
                    Visibility: {visibility}<br/>
                </div>
            </div>
            <input type="button" value="Generate"
                   onClick={() => randomWeather()}/>
            <h2>Marching</h2>
            <form>
            <label for="forcedMarch">Forced March</label>
                <input type="checkbox" id="forcedMarch"/><br/>

                <label for="daysMarched">Days Marched: </label>
                <input type="text" id="daysMarched" defaultValue="0"/><br/>
                <label for="hoursMarched">Hours Marched: </label>
                <input type="text" id="hoursMarched" defaultValue="0"/><br/>
                <label for="distanceMarched">Distance Marched: </label>
                <input type="text" id="distanceMarched" defaultValue="0"/><br/>
                <label for="tilesMarched">Tiles Marched: </label>
                <input type="text" id="tilesMarched" defaultValue="0"/><br/>
                <label for="encounterChance">Chance of Encounter per hour
                    (%)</label><br/>
                <input type="text" id="encounterChance" defaultValue="5"/><br/>

                <input type="radio" id="paceSlow" value="slow" name="pace"/>
                <label for="paceSlow">Slow (2 mph, can stealth, +5
                    navigation)</label><br/>
                <input type="radio" id="paceNormal" value="normal" name="pace" checked/>
                <label for="paceNormal">Normal (3 mph)</label><br/>
                <input type="radio" id="paceFast" value="fast" name="pace"/>
                <label for="paceFast">Fast (4 mph, disadvantage on perception, -5
                    navigation)</label><br/>

                <label for="difficultTerrain">Difficult Terrain</label>
                <input type="checkbox" id="difficultTerrain"/><br/>

                <input type="button" value="Lost" id="lost" onClick={lost}/> or
                <input type="button" value="March" id="march" onClick={march}/>
                <p id="forcedMarchDC"></p>
                <input type="button" value="New Day" id="newDay" onClick={newDay}/>
            </form>
            <span id="encounter"></span>
        </div>
    );
}