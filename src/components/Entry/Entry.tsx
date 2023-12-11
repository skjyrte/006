import { useState, forwardRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import BarLoader from "react-spinners/BarLoader";

import "./Entry.css";
import { default as Checkbox } from "components/Checkbox";
import { default as CharCounter } from "components/CharCounter";
import { IconButton } from "components/Buttons";
import { TextButton } from "components/Buttons";
import { IconDelete } from "components/Icons";
import { Todo, Nullable } from "components/CommonTypes";

interface Props {
  onSave: (id: string, edited: { task?: string; completed?: boolean }) => void;
  todo: Todo;
  onDelete: (id: string) => void;
}

enum LoadingState {
  SAVE_EDITED_CHECKBOX = "save_edited_checkbox",
  SAVE_EDITED_ENTRY = "save_edited_entry",
  DELETE_ENTRY = "delete_entry",
}

export default forwardRef(function Entry(
  { onSave, todo, onDelete }: Props,
  ref: any
) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editInput, setEditInput] = useState<string>(todo.task);
  const [loader, setLoader] = useState<Nullable<LoadingState>>(null);

  const currentInputLength = editInput.length;
  const isEditEmpty = currentInputLength === 0;

  const handleClickCheckbox = async () => {
    setLoader(LoadingState.SAVE_EDITED_CHECKBOX);
    await onSave(todo._id, { completed: !todo.completed });
    setLoader(null);
  };

  const handleClickSave = async () => {
    setLoader(LoadingState.SAVE_EDITED_ENTRY);
    await onSave(todo._id, { task: editInput });
    setEditMode(false);
    setLoader(null);
  };

  const handleDeleteTodo = async () => {
    setLoader(LoadingState.DELETE_ENTRY);
    await onDelete(todo._id);
    setLoader(null);
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
      {loader === LoadingState.SAVE_EDITED_ENTRY && (
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
            loading={loader === LoadingState.SAVE_EDITED_ENTRY}
            height={4}
            width={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      <Checkbox
        onClick={handleClickCheckbox}
        isChecked={todo.completed}
        isLoading={loader === LoadingState.SAVE_EDITED_CHECKBOX}
        isDisabled={loader !== null}
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
              isDisabled={isEditEmpty || loader !== null}
            />
            <TextButton
              onClick={handleClickDiscard}
              displayedText={"Discard"}
              isDisabled={loader !== null}
            />
          </>
        ) : (
          <TextButton
            onClick={handleClickEdit}
            displayedText={"Edit"}
            isDisabled={loader !== null}
          />
        )}
      </div>
      <IconButton
        onClick={handleDeleteTodo}
        isLoading={loader === LoadingState.DELETE_ENTRY}
        IconComponent={IconDelete}
        isDisabled={loader !== null}
      />
    </div>
  );
});
