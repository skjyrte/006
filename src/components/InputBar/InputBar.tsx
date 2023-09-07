import "./InputBar.css";
import Checkbox from "../Checkbox/Checkbox";

export default function InputBar() {
  return (
    <div className="input-bar">
      <Checkbox />
      <input
        type="text"
        id="task"
        placeholder="Type new task..."
        name="task"
        className="search-input"
        required
        minLength={1}
      />
    </div>
  );
}
