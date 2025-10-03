import logo from './logo.svg';
import './App.css';
import DamageSeverity from './components/DamageSeverity'
import Wilderness from "./components/Wilderness";
import RandomEncounter from "./components/Encounter";
import {Party, PC} from "./components/Party";
import {useState} from "react";
import HordeMathContainer from "./components/HordeMath";
import Lanchester from "./components/Lanchester";
import RandomDungeon from './components/randomDungeon/RandomDungeon';
import RandomEncounter2 from "./components/RandomEncounter";
import {
    RandomTreasure,
    RandomTreasureHorde
} from "./components/randomDungeon/RandomTreasure";
import Table from "./components/Table";

function App() {
    const [partySize, setPartySize] = useState(2);
    const [party, setParty] = useState([new PC(
                    "",
                    "",
                    5,
                    10,
                ),
    new PC(
                    "",
                    "",
                    5,
                    10,
                )]);
    const [tableState, setTableState] = useState(1);
    const [activeTab, setActiveTab] = useState('home');
    const [monsters, setMonsters] = useState([]);
  return (
      <div class="w3-container">
          <div className="flex gap-4 border-b mb-4">
              <button onClick={() => setActiveTab('wilderness')}
                      className={activeTab === 'wilderness' ? 'font-bold border-b-2' : ''}>Wilderness
              </button>
              <button onClick={() => setActiveTab('party')}
                      className={activeTab === 'party' ? 'font-bold border-b-2' : ''}>Party
              </button>
              <button onClick={() => setActiveTab('monster-math')}
                      className={activeTab === 'monster-math' ? 'font-bold border-b-2' : ''}>Monster
                  Math
              </button>
              <button onClick={() => setActiveTab('lanchester')}
                      className={activeTab === 'lanchester' ? 'font-bold border-b-2' : ''}>Lanchester
              </button>
              <button onClick={() => setActiveTab('random-encounter')}
                      className={activeTab === 'random-encounter' ? 'font-bold border-b-2' : ''}>Random
                  Encounter
              </button>
              <button onClick={() => setActiveTab('random-treasure')}
                      className={activeTab === 'random-treasure' ? 'font-bold border-b-2' : ''}>Random
                  Treasure
              </button>
              <button onClick={() => setActiveTab('random-dungeon')}
                      className={activeTab === 'random-dungeon' ? 'font-bold border-b-2' : ''}>Random
                  Dungeon
              </button>
          </div>

          <div style={{display: activeTab === 'wilderness' ? 'block' : 'none'}}>
              <Wilderness party={party}></Wilderness>
          </div>
          <div style={{display: (activeTab === 'party' || activeTab === 'lanchester') ? 'block' : 'none'}}>
              <Party partySize={partySize} setPartySize={setPartySize} party={party}
                 setParty={setParty}></Party>
          </div>
          <div style={{display: (activeTab === 'monster-math' || activeTab === 'lanchester') ? 'block' : 'none'}}>
              <HordeMathContainer party={party} tableState={tableState}
                              setTableState={setTableState} monsters={monsters} setMonsters={setMonsters}></HordeMathContainer>
          </div>
          <div style={{display: activeTab === 'lanchester' ? 'block' : 'none'}}>
              <Lanchester party={party} monsters={monsters}></Lanchester>
          </div>

          {/*<Table tableState={tableState}></Table>*/}
          <div style={{display: activeTab === 'random-encounter' ? 'block' : 'none'}}>
              <RandomEncounter2 party={party} setMonsters={setMonsters}></RandomEncounter2>
          </div>
          <div style={{display: activeTab === 'random-treasure' ? 'block' : 'none'}}>
              <RandomTreasure party={party}></RandomTreasure>
              <RandomTreasureHorde></RandomTreasureHorde>
          </div>
          <div style={{display: activeTab === 'random-dungeon' ? 'block' : 'none'}}>
              <RandomDungeon></RandomDungeon>
             <DamageSeverity></DamageSeverity>
          </div>


      </div>
  );
}

export default App;
