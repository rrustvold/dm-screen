import {randomContents, randomState, randomPurpose, randomShape, randomExits} from "./RandomChamber.js";
import {randomDoor} from "./RandomDoor.js";
import {randomTrap} from "./RandomTrap.js";
import {randomHazard} from "./RandomHazard.js";
import {randomTrick} from "./RandomTrick.js";
import {RandomTreasure} from "./RandomTreasure.js";
import {useState} from "react";
import {getRandomThingFromList, hideShow} from "../../utils.js";
import {getRandomTheme} from "./RandomTheme";
import {
    booksScrollsTomes,
    containerContents, debrisList,
    generalFurnishings,
    mageFurnishings,
    religiousArticles,
    smellList
} from "./RandomDressing";

function Roll(sides, numDice=1) {
    let sum = 0;
    for (let i=0; i < numDice; i++) {
        sum += Math.floor(Math.random()*sides) + 1;
    }
    return sum;
}

function getBeyondDoor(setBeyondDoor) {
    function message () {
        let roll = Roll(20);
        if (roll >= 1 && roll <= 2) {
            return "Passage extending 10 ft., then T intersection extending 10 ft. to the right and left";
        } else if (roll >= 3 && roll <= 8) {
            return "Passage 20 ft. straight ahead";
        } else if (roll >= 9 && roll <= 18) {
            return "Chamber (roll on the Chamber table)";
        } else if (roll === 19) {
            return "Stairs (roll on the Stairs table)";
        } else if (roll === 20) {
            return "False door with trap";
        }
    }
    setBeyondDoor(message());
}

function startingRoom() {
    let roll = Roll(10);
    if (roll === 1) {
        return new Chamber(
            "Square, 20 × 20 ft.; passage on each wall",
            0,
            2
        )
    } else if (roll === 2) {
        return new Chamber(
            "Square, 20 × 20 ft.; door on two walls, passage in third wall",
            2,
            1
        )
    } else if (roll === 3) {
        return new Chamber(
            "Square, 40 × 40 ft.; doors on three walls",
            3,
            0
        )
    } else if (roll === 4) {
        return new Chamber(
            "Rectangle, 80 × 20 ft., with row of pillars down the middle; two passages leading from each long wall, doors on each short wall",
            2,
            4
        )
    } else if (roll === 5) {
        return new Chamber(
            "Rectangle, 20 × 40 ft.; passage on each wall",
            0,
            4
        )
    } else if (roll === 6) {
        return new Chamber(
            "Circle, 40 ft. diameter; one passage at each cardinal direction",
            0,
            4
        )
    } else if (roll === 7) {
        return new Chamber(
            "Circle, 40 ft. diameter; one passage in each cardinal direction; well in middle of room (might lead down to lower level)",
            0,
            4
        )
    } else {
        return new Chamber(
            "Square, 20 × 20 ft.; door on two walls, passage on third wall, secret door on fourth wall",
            3,
            1
        )
    }
}

function randomPassage() {
    let roll = Roll(20);
    if (roll >= 1 && roll <= 2) {
        return "Continue straight 30 ft., no doors or side passages";
    } else if (roll === 3) {
        return "Continue straight 20 ft., door to the right, then an additional 10 ft. ahead";
    } else if (roll === 4) {
        return "Continue straight 20 ft., door to the left, then an additional 10 ft. ahead";
    } else if (roll === 5) {
        return "Continue straight 20 ft.; passage ends in a door";
    } else if (roll >= 6 && roll <= 7) {
        return "Continue straight 20 ft., side passage to the right, then an additional 10 ft. ahead";
    } else if (roll >= 8 && roll <= 9) {
        return "Continue straight 20 ft., side passage to the left, then an additional 10 ft. ahead";
    } else if (roll === 10) {
        return "Continue straight 20 ft., comes to a dead end; 10 percent chance of a secret door";
    } else if (roll >= 11 && roll <= 12) {
        return "Continue straight 20 ft., then the passage turns left and continues 10 ft.";
    } else if (roll >= 13 && roll <= 14) {
        return "Continue straight 20 ft., then the passage turns right and continues 10 ft.";
    } else if (roll >= 15 && roll <= 19) {
        return "Chamber (roll on the Chamber table)";
    } else if (roll === 20) {
        return "Stairs (roll on the Stairs table)";
    }
}

function getDownPassage(setDownPassage) {
    setDownPassage(randomPassage());
}


class Door {
    constructor() {
        this.type = randomDoor();
    }
}

class Passage {
    constructor() {
        this.type = randomPassage();
        this.doors = [];
        this.passages = [];
    }
}


class Chamber{
    constructor(shape, numDoors, numPassages, purpose) {
        this.shape = shape;
        this.doors = [];
        for (let i=0; i < numDoors; i++){
            this.doors.push(new Door());
        }
        this.passages = [];
        for (let i=0; i < numPassages; i++){
            this.passages.push(new Passage());
        }
        this.purpose = randomPurpose(purpose);
        this.contents = randomContents();

        let roll = Roll(100);
        if (roll <= 25){
            this.smell = getRandomThingFromList(smellList);
        } else {
            this.smell = "Typical";
        }
        this.state = randomState();
    }

    markdown() {

        let doors = [];
        for (let i=0; i < this.doors.length; i++){
            let door = this.doors[i];
            doors.push(
                <>
                    <br/>&emsp;{door.type}
                </>
                )
        }
        return (
            <div>
                <dl>
                    <dt>Shape</dt>
                    <dd>{this.shape}</dd>
                    <dt>Exits</dt>
                    <dd>{this.doors.length} doors:{doors}</dd>
                    <dd>{this.passages.length} passages</dd>
                    <dt>Challenge</dt>
                    <dd>{this.contents}</dd>
                    <dt>Purpose</dt>
                    <dd>{this.purpose}</dd>
                    <dt>State</dt>
                    <dd>{this.state}</dd>
                    <dt>Odor</dt>
                    <dd>{this.smell}</dd>

                </dl>
            </div>
        )
    }
}

function generateChamber(setRoom, dungeonPurpose){
    let [numDoors, numPassages] = randomExits();
    let chamber = new Chamber(
        randomShape(),
        numDoors,
        numPassages,
        dungeonPurpose
    );
    setRoom(chamber);
}



export default function RandomDungeon() {
    const [theme, setTheme] = useState("");
    const [room, setRoom] = useState(startingRoom());
    const [beyondDoor, setBeyondDoor] = useState("");
    const [downPassage, setDownPassage] = useState("");
    const [dungeonPurpose, setDungeonPurpose] = useState("general");
    const [trap, setTrap] = useState("");
    const [hazard, setHazard] = useState("");
    const [trick, setTrick] = useState("");
    const [dressing, setDressing] = useState("");
    return (
        <div class="w3-container">
            <h1 onClick={() => hideShow("randomdungeon")}>Random Dungeon</h1>
            <div class="w3-container w3-show" id="randomdungeon">
                <label for="dungeonSelect">Dungeon Purpose</label>
                <select name="dungeonPurpose" onChange={(e) => {
                    setDungeonPurpose(e.target.value)
                }} class="w3-select">
                    <option value="general">General</option>
                    <option value="lair">Lair</option>
                    <option value="maze">Maze</option>
                    <option value="mine">Mine</option>
                    <option value="planarGate">Planar Gate</option>
                    <option value="stronghold">Stronghold</option>
                    <option value="temple">Temple or Shrine</option>
                    <option value="tomb">Tomb</option>
                    <option value="treasureVault">Treasure Vault</option>
                </select>
                <p><input type="button" className="w3-button" onClick={() => {
                    setTheme(getRandomTheme())
                }} defaultValue="Genereate"/></p>
                <div class="w3-container" id="dungeonThemes">
                    {theme}
                </div>
                <h2>Current Chamber</h2>
                <p><input type="button" className="w3-button" onClick={() => {
                    generateChamber(setRoom, dungeonPurpose)
                }} defaultValue="Generate Chamber"/></p>
                <div class="w3-container w3-border">
                    {room.markdown()}
                </div>
                <p>
                    <button type="button" className="w3-button"
                            onClick={() => setDressing(getRandomThingFromList(generalFurnishings, Roll(6)))}>
                        General Furnishings
                    </button>
                    <button type="button" className="w3-button"
                            onClick={() => setDressing(getRandomThingFromList(religiousArticles, Roll(6)))}>
                        Religious Articles
                    </button>
                    <button type="button" className="w3-button"
                            onClick={() => setDressing(getRandomThingFromList(mageFurnishings, Roll(6)))}>
                        Mage Furnishings
                    </button>
                    <button type="button" className="w3-button"
                            onClick={() => setDressing(getRandomThingFromList(containerContents, Roll(6)))}>
                        Container Contents
                    </button>
                    <button type="button" className="w3-button"
                            onClick={() => setDressing(getRandomThingFromList(booksScrollsTomes, Roll(6)))}>
                        Books, Scroll, and Tomes
                    </button>
                    <button type="button" className="w3-button"
                            onClick={() => setDressing(getRandomThingFromList(debrisList, Roll(6)))}>
                        Debris
                    </button>
                </p>
                <div class="w3-container w3-border">
                    <p>{dressing}</p>
                </div>

                <p><input type="button" className="w3-button" onClick={() => {
                    getBeyondDoor(setBeyondDoor)
                }} defaultValue="Beyond Door"/></p>
                <div class="w3-container w3-border">{beyondDoor}</div>

                <p><input type="button" className="w3-button" onClick={() => {
                    getDownPassage(setDownPassage)
                }}
                          defaultValue="Down Passage"/></p>
                <div class="w3-container w3-border">{downPassage}</div>

                <p><input type="button" className="w3-button" onClick={() => {
                    setTrap(randomTrap())
                }}
                          defaultValue="Trap"/></p>{trap}

                <p><input type="button" className="w3-button" onClick={() => {
                    setHazard(randomHazard())
                }}
                          defaultValue="Hazard"/></p>
                <div class="w3-container w3-border">{hazard}</div>

                <p><input type="button" className="w3-button" onClick={() => {
                    setTrick(randomTrick())
                }}
                          defaultValue="Trick"/></p>
                <div class="w3-container w3-border">{trick}</div>
            </div>
        </div>
    )
}