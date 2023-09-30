import "./Entry.css";
import Checkbox from "../Checkbox/Checkbox";
import ButtonDelete from "../ButtonDelete/ButtonDelete";
import ButtonEdit from "../ButtonEdit/ButtonEdit";
import { useState } from "react";
import { useEffect } from "react";

export default function Entry(props: any) {
  const { id, toDo, completed, onSave, onDelete } = props;
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editInput, setEditInput] = useState<string>(toDo);
  const [isCompleted, setIsCompleted] = useState<boolean>(completed);

  const toggleEdit = () => {
    editMode ? setEditMode(false) : setEditMode(true);
  };
  async function handleCheckbox() {
    setIsCompleted((prevState) => !prevState);
    //onSave(id, undefined, isCompleted);
  }
  useEffect(() => {
    onSave(id, undefined, isCompleted);
  }, [isCompleted]);

  return (
    <div className="entry-box">
      <Checkbox onChange={handleCheckbox} checked={isCompleted} />
      <div className="todo-box">
        {editMode ? (
          <input
            type="text"
            id="task"
            placeholder="Type edited task..."
            name="task"
            className="search-input"
            required
            minLength={1}
            onChange={(e) => setEditInput(e.target.value)}
            value={editInput}
          />
        ) : (
          toDo
        )}
      </div>
      <span className="entry-space"></span>
      {editMode ? (
        <>
          <ButtonEdit
            onClick={() => {
              toggleEdit();
              return onSave(id, editInput, undefined);
            }}
          >
            Save
          </ButtonEdit>
          <ButtonEdit onClick={toggleEdit}>Discard</ButtonEdit>
        </>
      ) : (
        <ButtonEdit onClick={toggleEdit}>Edit</ButtonEdit>
      )}
      <ButtonDelete onClick={onDelete} id={id} />
    </div>
  );
}
