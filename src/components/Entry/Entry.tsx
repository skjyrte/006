import "./Entry.css";
import Checkbox from "../Checkbox/Checkbox";
import ButtonEdit from "../ButtonEdit/ButtonEdit";
import { useState, forwardRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import CharCounter from "../CharCounter/CharCounter";
import BarLoader from "react-spinners/BarLoader";
import { CSSProperties } from "react";
import IconButton from "../Buttons/IconButton/IconButton";
import IconDelete from "../Icons/IconDelete/IconDelete";

interface Props {
  onSave: (id: string, edited: { task?: string; completed?: boolean }) => void;
  todo: {
    _id: string;
    completed: boolean;
    task: string;
  };
  inView: boolean;
  onDelete: (id: string) => void;
}

enum LoadingState {
  SAVE_EDITED_ENTRY = "save_edited_entry",
  DELETE_ENTRY = "delete_entry",
}

export default forwardRef(function Entry(
  { onSave, todo, inView, onDelete }: Props,
  ref: any
) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editInput, setEditInput] = useState<string>(todo.task);
  const [isCheckboxLoading, setIsCheckboxLoading] = useState<boolean>(false);
  const [isEntryLoading, setIsEntryLoading] = useState<boolean>(false);
  const [isEntryDeleting, setIsEntryDeleting] = useState<boolean>(false);

  const currentInputLength = editInput.length;
  const buttonDisabled = currentInputLength === 0;

  const handleClickCheckbox = async () => {
    setIsCheckboxLoading(() => true);
    await onSave(todo._id, { completed: !todo.completed });
    setIsCheckboxLoading(() => false);
  };

  const handleClickSave = async () => {
    setIsEntryLoading(() => true);
    await onSave(todo._id, { task: editInput });
    setIsEntryLoading(() => false);
    setEditMode(false);
  };

  const handleDeleteTodo = async () => {
    setIsEntryDeleting(() => true);
    await onDelete(todo._id);
    setIsEntryDeleting(() => false);
  };

  const handleClickEdit = () => {
    setEditMode(true);
  };

  const handleClickDiscard = () => {
    setEditMode(false);
    setEditInput(todo.task);
  };

  const override: CSSProperties = {
    display: "block",
    //margin: "0 auto",
    borderColor: "red",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50px, -50%)",
  };
  const color = "yellow";

  return (
    <div ref={ref} className="entry-box">
      {isEntryLoading && (
        <div className="todo-loader-box">
          <BarLoader
            color={color}
            cssOverride={override}
            loading={isEntryLoading}
            height={4}
            width={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      <Checkbox
        onChange={handleClickCheckbox}
        checked={todo.completed}
        isLoading={isCheckboxLoading}
      />
      {editMode ? (
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
            className={
              todo.completed ? "todo-content completed" : "todo-content"
            }
          >
            {todo.task}
          </div>{" "}
        </>
      )}

      <div className="button-edit-container">
        {editMode ? (
          <>
            <ButtonEdit
              onClick={handleClickSave}
              buttonDisabled={buttonDisabled}
            >
              Save
            </ButtonEdit>
            <ButtonEdit onClick={handleClickDiscard} buttonDisabled={false}>
              Discard
            </ButtonEdit>
          </>
        ) : (
          <ButtonEdit onClick={handleClickEdit} buttonDisabled={false}>
            Edit
          </ButtonEdit>
        )}
      </div>
      <IconButton
        onClick={handleDeleteTodo}
        isLoading={isEntryDeleting}
        IconComponent={IconDelete}
      />
    </div>
  );
});
