import { useState, forwardRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import BarLoader from "react-spinners/BarLoader";

import "./Entry.css";
import { default as Checkbox } from "components/Checkbox";
import { default as CharCounter } from "components/CharCounter";
import { IconButton } from "components/Buttons";
import { TextButton } from "components/Buttons";
import { IconDelete } from "components/Icons";
import { InView } from "react-intersection-observer";

interface Props {
  onSave: (id: string, edited: { task?: string; completed?: boolean }) => void;
  todo: {
    _id: string;
    completed: boolean;
    task: string;
  };

  onDelete: (id: string) => void;
  inView: any;
}

enum LoadingState {
  SAVE_EDITED_ENTRY = "save_edited_entry",
  DELETE_ENTRY = "delete_entry",
}

export default forwardRef(function Entry(
  { onSave, todo, onDelete, inView }: Props,
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

  return (
    <div ref={ref} className="entry-box">
      {String(inView)}
      {isEntryLoading && (
        <div className="todo-loader-box">
          <BarLoader
            color={"yellow"}
            cssOverride={{
              display: "block",
              borderColor: "red",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50px, -50%)",
            }}
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
            <TextButton
              onClick={handleClickSave}
              displayedText={"Save"}
              isDisabled={buttonDisabled}
            />
            <TextButton
              onClick={handleClickDiscard}
              displayedText={"Discard"}
              isDisabled={false}
            />
          </>
        ) : (
          <TextButton
            onClick={handleClickEdit}
            displayedText={"Edit"}
            isDisabled={false}
          />
        )}
      </div>
      <IconButton
        onClick={handleDeleteTodo}
        isLoading={isEntryDeleting}
        IconComponent={IconDelete}
        /*         buttonDisabled={false} */
      />
    </div>
  );
});
