import "./Entry.css";
import Checkbox from "../Checkbox/Checkbox";
import ButtonDelete from "../ButtonDelete/ButtonDelete";
import ButtonEdit from "../ButtonEdit/ButtonEdit";
import { useState } from "react";
import { useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";

export default function Entry(props: any) {
  const {
    id,
    toDo,
    completed,
    onSave,
    onDelete,
    nowEdited,
    handleToggleEdit,
    shutTheEdit,
  } = props;

  const [editInput, setEditInput] = useState<string>(toDo);
  const [isCompleted, setIsCompleted] = useState<boolean>(completed);

  async function handleCheckbox() {
    shutTheEdit();
    setIsCompleted((prevState) => !prevState);
    //onSave(id, undefined, isCompleted);
  }
  useEffect(() => {
    onSave(id, undefined, isCompleted);
  }, [isCompleted]);

  return (
    <div className="entry-box">
      <Checkbox onChange={handleCheckbox} checked={isCompleted} />
      {nowEdited === id ? (
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
        {nowEdited === id ? (
          <>
            <ButtonEdit
              onClick={() => {
                handleToggleEdit(id);
                onSave(id, editInput, undefined);
              }}
            >
              Save
            </ButtonEdit>
            <ButtonEdit
              onClick={() => {
                handleToggleEdit(id);
              }}
            >
              Discard
            </ButtonEdit>
          </>
        ) : (
          <ButtonEdit
            onClick={() => {
              setEditInput(toDo); //synchronize edited value with database value
              handleToggleEdit(id);
            }}
          >
            Edit
          </ButtonEdit>
        )}
      </div>
      <ButtonDelete onClick={onDelete} id={id} />
    </div>
  );
}
