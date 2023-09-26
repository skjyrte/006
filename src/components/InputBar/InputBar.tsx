import "./InputBar.css";
import ButtonAdd from "../ButtonAdd/ButtonAdd";

export default function InputBar(props: any) {
  const { onChange, onClick } = props;
  return (
    <div className="input-bar">
      <input
        type="text"
        id="task"
        placeholder="Type new task..."
        name="task"
        className="search-input"
        required
        minLength={1}
        onChange={onChange}
      />
      <ButtonAdd onClick={onClick} />
    </div>
  );
}
