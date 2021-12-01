import "./styles.css";
import { Counter } from "./features/counter/Couter";
import { Switch } from "./features/switch/Switch";

export default function App() {
  return (
    <div className="App">
      <Counter />
      <Switch />
    </div>
  );
}
