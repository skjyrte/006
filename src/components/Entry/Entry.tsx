import "./Entry.css";
import Checkbox from "../Checkbox/Checkbox";
import ButtonDelete from "../ButtonDelete/ButtonDelete";
import ButtonEdit from "../ButtonEdit/ButtonEdit";
import { useState } from "react";

export default function Entry(props: any) {
  const { id, toDo, onSaveEdited, onDelete } = props;
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editInput, setEditInput] = useState<string>(toDo);

  const toggleEdit = () => {
    editMode ? setEditMode(false) : setEditMode(true);
  };

  return (
    <div className="entry-box">
      <Checkbox />
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
              return onSaveEdited(id, editInput);
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
