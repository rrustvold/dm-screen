import logo from './logo.svg';
import './App.css';
import DamageSeverity from './components/DamageSeverity'
import Wilderness from "./components/Wilderness";
import RandomEncounter from "./components/Encounter";
import Party from "./components/Party";
import {useState} from "react";
import HordeMath from "./components/HordeMath";
import RandomDungeon from './components/randomDungeon/RandomDungeon';


function App() {
    const [partySize, setPartySize] = useState(2);
    const [party, setParty] = useState([]);

  return (
      <div>
          <Party partySize={partySize} setPartySize={setPartySize} party={party} setParty={setParty}></Party>
        <RandomDungeon></RandomDungeon>
        <Wilderness></Wilderness>
          <RandomEncounter party={party}></RandomEncounter>
          {/*<DamageSeverity></DamageSeverity>*/}
          <HordeMath party={party}></HordeMath>
      </div>
  );
}

export default App;
