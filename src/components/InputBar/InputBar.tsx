import "./InputBar.css";
import ButtonAdd from "../ButtonAdd/ButtonAdd";

export default function InputBar(props: any) {
  const { onChange, onClick, inputValue } = props;
  return (
    <div className="input-bar">
      <input
        type="text"
        id="task"
        placeholder="Type new task..."
        name="task"
        className="input-field"
        required
        minLength={1}
        maxLength={70}
        onChange={onChange}
        value={inputValue}
      />
      <ButtonAdd onClick={onClick} />
    </div>
  );
}
