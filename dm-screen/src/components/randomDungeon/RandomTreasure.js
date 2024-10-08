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