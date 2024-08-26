import Roll from "../../utils.js"
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
    }
  }

function randomEncounterTreasure(xp, setTreasure){
  console.log(xp);
  let treasure = new Treasure(0,0,0,0,0,[],[],[]);
    let xps = xp.split(",");
    for (let i=0; i<xps.length; i++){
      let xp_num = Number(xps[i].trim());
      randomMonsterTreasure(treasure, xp_num);
    }
    setTreasure(treasure);
}


export function RandomTreasure(){
  const [treasure, setTreasure] = useState(new Treasure(0,0,0,0,0,[],[],[]));

  return (
    <>
    <label for="monster-xp">Monster XP Values: </label>
    <input type="text" id="monster-xp"/><br/>
      <input type="button" defaultValue="Treasure" onClick={() => randomEncounterTreasure(document.getElementById("monster-xp").value, setTreasure)}/><br/>
      CP: {treasure.cp}<br/>
      SP: {treasure.sp}<br/>
      EP: {treasure.ep}<br/>
      GP: {treasure.gp}<br/>
      PP: {treasure.pp}<br/>
    </>
  )
}