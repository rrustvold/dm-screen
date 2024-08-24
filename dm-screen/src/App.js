import logo from './logo.svg';
import './App.css';
import DamageSeverity from './components/DamageSeverity'
import Wilderness from "./components/Wilderness";
import RandomEncounter from "./components/Encounter";
import Whiteboard from "./components/Whiteboard";

function App() {
  return (
      <div>
        <DamageSeverity></DamageSeverity>
        <Wilderness></Wilderness>
          <RandomEncounter></RandomEncounter>
      </div>
  );
}

export default App;
