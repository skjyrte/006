import "./Entry.css";
import Checkbox from "../Checkbox/Checkbox";
import ButtonDelete from "../ButtonDelete/ButtonDelete";

export default function Entry(props: any) {
  const { id, toDo, onClick } = props;

  return (
    <div className="entry-box">
      <Checkbox />
      <div className="todo-box">{toDo}</div>
      <span className="entry-space"></span>
      <ButtonDelete onClick={onClick} id={id} />
    </div>
  );
}
