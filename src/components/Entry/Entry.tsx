import "./Entry.css";
import Checkbox from "../Checkbox/Checkbox";
import ButtonDelete from "../ButtonDelete/ButtonDelete";
import ButtonEdit from "../ButtonEdit/ButtonEdit";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import CharCounter from "../CharCounter/CharCounter";

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
  const [isCheckboxLoading, setIsCheckboxLoading] = useState<boolean>(false);

  const currentInputLength = editInput.length;

  async function handleCheckbox() {
    shutTheEdit();
    try {
      setIsCheckboxLoading(() => true);
      await onSave(id, undefined, !completed);
    } catch {
      throw new Error("error updating checkbox");
    } finally {
      setIsCheckboxLoading(() => false);
    }
  }

  return (
    <div className="entry-box">
      <Checkbox
        onChange={handleCheckbox}
        checked={completed}
        isLoading={isCheckboxLoading}
      />
      {nowEdited === id ? (
        <>
          <CharCounter
            charCount={currentInputLength}
            maxCharCount={70}
            counter_type="char-counter-edit"
          />
          <TextareaAutosize
            id="task"
            placeholder="Type edited task..."
            name="task"
            className="edit-input-field"
            maxLength={70}
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
        </>
      ) : (
        <>
          <div
            className={completed ? "todo-content completed" : "todo-content"}
          >
            {toDo}
          </div>{" "}
        </>
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
