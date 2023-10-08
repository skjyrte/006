import "./Entry.css";
import Checkbox from "../Checkbox/Checkbox";
import ButtonDelete from "../ButtonDelete/ButtonDelete";
import ButtonEdit from "../ButtonEdit/ButtonEdit";
import { useState } from "react";
import { useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";

export default function Entry(props: any) {
  const { id, toDo, completed, onSave, onDelete } = props;
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editInput, setEditInput] = useState<string>(toDo);
  const [isCompleted, setIsCompleted] = useState<boolean>(completed);

  const toggleEdit = () => {
    if (editMode === true) {
      setEditMode(false);
    } else {
      setEditInput(toDo); //synchronize edited value with database value
      setEditMode(true);
    }
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
      {editMode ? (
        <TextareaAutosize
          id="task"
          placeholder="Type edited task..."
          name="task"
          className="edit-input-field"
          maxLength={50}
          minRows={1}
          onChange={(e) => {
            const singleLineInput = e.target.value
              .split("")
              .filter((char) => char !== "\n")
              .join("");
            return setEditInput(singleLineInput);
          }}
          value={editInput}
        />
      ) : (
        <div className="todo-content">{toDo}</div>
      )}

      <div className="button-edit-container">
        {editMode ? (
          <>
            <ButtonEdit
              onClick={() => {
                toggleEdit();
                onSave(id, editInput, undefined);
              }}
            >
              Save
            </ButtonEdit>
            <ButtonEdit onClick={toggleEdit}>Discard</ButtonEdit>
          </>
        ) : (
          <ButtonEdit onClick={toggleEdit}>Edit</ButtonEdit>
        )}
      </div>
      <ButtonDelete onClick={onDelete} id={id} />
    </div>
  );
}
