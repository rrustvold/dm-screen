import Roll, { hideShow } from "../../utils.js"
import {useState} from "react";

class Treasure{
  constructor(cp, sp, ep, gp, pp, gems, art, magicItems){
    this.cp = cp;
    this.sp = sp;
    this.ep = ep;
    this.gp = gp;
    this. pp = pp;
    this.gems = gems;
    this.art = art;
    this.magicItems = magicItems;
  }
}

function randomGemCollection(targetValue) {
  let value = 0;
  let gems = [];
  let gemValues = [10, 50, 100, 500, 1000, 5000];

  while (value < targetValue) {
    let i = Roll(6) - 1;
    let testGem = gemValues[i];
    if (value + testGem <= targetValue + gemValues[0]) {
      gems.push(testGem);
      value += testGem;
    }
  }
  return gems
}


function randomArtCollection(targetValue) {
  let value = 0;
  let art = [];
  let artValues = [25, 250, 750, 2500, 7500];

  while (value < targetValue) {
    let i = Roll(5) - 1;
    let testArt = artValues[i];
    if (value + testArt <= targetValue + artValues[0]) {
      art.push(testArt);
      value += testArt;
    }
  }
  return art
}

function randomCoinCollection(targetValue) {
  let cp = targetValue * .2 * 100;
  let sp = targetValue * .4 * 10;
  let ep = targetValue * .1 * 2;
  let gp = targetValue * .25;
  let pp = targetValue * .05 * .1;
  return [cp, sp, ep, gp, pp]
}

function randomTreasureHorde(tier, set){
  let grossValue;
  let numMagicItems;
  console.log("tier" + tier);
  if (tier === 1){
    grossValue = Roll(4, 2) * 100;
    numMagicItems = Roll(4, 1) - 1;
  } else if (tier === 2) {
    grossValue = Roll(10, 8) * 100;
    numMagicItems = Roll(3, 1);
  } else if (tier === 3) {
    grossValue = Roll(8, 8) * 10000;
    numMagicItems = Roll(4, 1);
  } else if (tier === 4) {
    grossValue = Roll(10, 6) * 10000;
    numMagicItems = Roll(6, 1);
  }
  console.log("Gross value is " + grossValue);
  let coinValue = .3 * grossValue;
  let treasure = randomCoinCollection(coinValue);
  let gemValue = .2 * grossValue;
  treasure.push(randomGemCollection(gemValue));
  let artValue = .5 * grossValue;
  treasure.push(randomArtCollection(artValue));
  console.log("treasure = " + treasure);
  set(new Treasure(...treasure));
}

function randomMonsterTreasure(treasure, xp) {

    let roll = Math.floor(Math.random() * 100) + 1;

    if (xp <= 1100) {
      if (roll <= 30) {
        treasure.cp += Roll(6, 5);
      } else if (roll <= 60){
        treasure.sp += Roll(6, 4);
      } else if (roll <= 70) {
        treasure.ep += Roll(6, 3);
      } else if (roll <=95) {
        treasure.gp += Roll(6, 3);
      } else {
        treasure.pp += Roll(6);
      }
    } else if (xp <= 5900) {
      if (roll <= 30) {
        treasure.cp += Roll(6, 4) * 100;
        treasure.ep += Roll(6) * 10
      } else if (roll <= 60){
        treasure.sp += Roll(6, 6) * 10;
        treasure.gp += Roll(6, 2) * 10;
      } else if (roll <= 70) {
        treasure.ep += Roll(6, 3) * 10;
        treasure.gp += Roll(6, 2) * 10;
      } else if (roll <=95) {
        treasure.gp += Roll(6, 4) * 10;
      } else {
        treasure.gp += Roll(6, 2) * 10;
        treasure.pp += Roll(6, 3);
      }
    }  else if (xp <= 15000) {
      if (roll <= 20) {
        treasure.sp += Roll(6, 4) * 100;
        treasure.gp += Roll(6) * 100
      } else if (roll <= 35){
        treasure.ep += Roll(6, 1) * 100;
        treasure.gp += Roll(6, 1) * 100;
      } else if (roll <= 75) {
        treasure.gp += Roll(6, 2) * 100;
        treasure.pp += Roll(6, 1) * 10;
      } else {
        treasure.gp += Roll(6, 2) * 100;
        treasure.pp += Roll(6, 2) * 10;
      }
    } else {
      if (roll <= 15) {
        treasure.ep += Roll(6, 2) * 1000;
        treasure.gp += Roll(6, 8) * 100
      } else if (roll <= 55){
        treasure.gp += Roll(6, 1) * 1000;
        treasure.pp += Roll(6, 1) * 100;
      } else {
        treasure.gp += Roll(6, 1) * 1000;
        treasure.pp += Roll(6, 2) * 100;
      }
    }
  }

function randomEncounterTreasure(xp, setTreasure, party){
  let treasure = new Treasure(0,0,0,0,0,[],[],[]);
    let xps = xp.split(",");
    for (let i=0; i<xps.length; i++){
      let xp_num = Number(xps[i].trim());
      randomMonsterTreasure(treasure, xp_num);
    }

    if (party) {
      // Make sure the treasure is equally divisible to all party members
      let partySize = party.length;
      treasure.cp = Math.round(treasure.cp / partySize) * partySize;
      treasure.sp = Math.round(treasure.sp / partySize) * partySize;
      treasure.ep = Math.round(treasure.ep / partySize) * partySize;
      treasure.gp = Math.round(treasure.gp / partySize) * partySize;
      treasure.pp = Math.round(treasure.pp / partySize) * partySize;
    }
    setTreasure(treasure);
}


export function RandomTreasure({party}){
  const [treasure, setTreasure] = useState(new Treasure(0,0,0,0,0,[],[],[]));

  return (
    <div class="w3-container">
      <h1 onClick={() => hideShow("randomtreasure")}>Random Treasure</h1>
      <div class="w3-container w3-show" id="randomtreasure">
        <label for="monster-xp">Monster XP Values: </label>
        <input type="text" id="monster-xp" class="w3-input" /><br/>
        <input type="button" defaultValue="Treasure" class="w3-bar" onClick={() => randomEncounterTreasure(document.getElementById("monster-xp").value, setTreasure, party)}/><br/>
        <div class="w3-row-padding">
          <div class="w3-col m2">
            CP: {treasure.cp}
          </div>
          <div class="w3-col m2">
            SP: {treasure.sp}
          </div>
          <div class="w3-col m2">
            EP: {treasure.ep}
          </div>
          <div class="w3-col m2">
            GP: {treasure.gp}
          </div>
          <div class="w3-col m2">
            PP: {treasure.pp}
          </div>
          <div class="w3-col m2"></div>

        </div>
         
      </div>
    </div>
  )
}


export function RandomTreasureHorde() {
  const [treasureHorde, setTreasureHorde] = useState(new Treasure(0, 0, 0, 0, 0, [], [], []));

  return (
      <div className="w3-container">
        <h1 onClick={() => hideShow("randomtreasurehorde")}>Random Treasure Horde</h1>
        <div className="w3-container w3-show" id="randomtreasurehorde">
          <label htmlFor="adventure-tier">Adventure Tier: </label>
          <select id="adventure-tier" className="w3-input" namd="adventure-tier">
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>

          <input type="button" defaultValue="Treasure" className="w3-bar"
                 onClick={() => randomTreasureHorde(Number(document.getElementById("adventure-tier").value), setTreasureHorde)}/><br/>
          <div className="w3-row-padding">
            <div className="w3-col m2">
              CP: {treasureHorde.cp}
            </div>
            <div className="w3-col m2">
              SP: {treasureHorde.sp}
            </div>
            <div className="w3-col m2">
              EP: {treasureHorde.ep}
            </div>
            <div className="w3-col m2">
              GP: {treasureHorde.gp}
            </div>
            <div className="w3-col m2">
              PP: {treasureHorde.pp}
            </div>
            <div className="w3-col m2">
              Gems: {treasureHorde.gems.join(",")}
            </div>
            <div className="w3-col m2">
              Art: {treasureHorde.art.join(",")}
            </div>
            <div className="w3-col m2"></div>

          </div>

        </div>
      </div>
  )
}