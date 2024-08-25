import logo from './logo.svg';
import './App.css';
import DamageSeverity from './components/DamageSeverity'
import Wilderness from "./components/Wilderness";
import RandomEncounter from "./components/Encounter";
import Party from "./components/Party";
import {useState} from "react";
import HordeMath from "./components/HordeMath";

class PC {
    constructor(player, name, level, ac, hp) {
        this.player = player;
        this.name = name;
        this.level = level;
        this.ac = ac;
        this.hp = hp;
    }
}

function App() {
    const characters = [
        new PC(
            "Rian",
            "Biggie",
            3,
            15,
            22
        ),
        new PC(
            "Maria",
            "Smalls",
            4,
            12,
            28
        )
    ]
    const characterNames = ["Biggie", "Smalls"];
    const characterLevels = [2, 3];
    const characterACs = [12, 15];
  return (
      <div>
          <Party characterNames={characterNames} characterACs={characterACs}></Party>

        <Wilderness></Wilderness>
          <RandomEncounter partyLevels={characterLevels}></RandomEncounter>
          {/*<DamageSeverity></DamageSeverity>*/}
          <HordeMath characterNames={characterNames} characterACs={characterACs}></HordeMath>
      </div>
  );
}

export default App;
