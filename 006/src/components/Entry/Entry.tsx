import "./Entry.css";
import Checkbox from "../Checkbox/Checkbox";
import ButtonDelete from "../ButtonDelete/ButtonDelete";

export default function Entry({ toDo }: { toDo: string }) {
  return (
    <div className="entry-box">
      <Checkbox />
      <div className="todo-box">{toDo}</div>
      <span className="entry-space"></span>
      <ButtonDelete />
    </div>
  );
}
