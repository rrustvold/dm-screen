import logo from './logo.svg';
import './App.css';
import DamageSeverity from './components/DamageSeverity'
import Wilderness from "./components/Wilderness";
import RandomEncounter from "./components/Encounter";
import Party from "./components/Party";
import {useState} from "react";
import HordeMath from "./components/HordeMath";
import RandomDungeon from './components/randomDungeon/RandomDungeon';
import RandomEncounter2 from "./components/RandomEncounter";
import {RandomTreasure} from "./components/randomDungeon/RandomTreasure";
import Table from "./components/Table";

function App() {
    const [partySize, setPartySize] = useState(2);
    const [party, setParty] = useState([]);
    const [tableState, setTableState] = useState(1);

  return (
      <div class="w3-container">
          <Party partySize={partySize} setPartySize={setPartySize} party={party} setParty={setParty}></Party>
          <Table tableState={tableState}></Table>
          <HordeMath party={party} tableState={tableState} setTableState={setTableState}></HordeMath>
          <RandomEncounter2 party={party}></RandomEncounter2>
          <RandomTreasure party={party}></RandomTreasure>
        <RandomDungeon></RandomDungeon>
        <Wilderness party={party}></Wilderness>
          <DamageSeverity></DamageSeverity>
          
      </div>
  );
}

export default App;
