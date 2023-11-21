import { ChangeEventHandler, FC, useState } from "react";
import "./InputBar.css";
import { Buttons, Icons } from "../index";
import CharCounter from "../CharCounter/CharCounter";

interface Props {
  onClickAddEntry: (value: string) => void;
  loading: boolean;
}

const InputBar: FC<Props> = ({ onClickAddEntry, loading }) => {
  const [inputValue, setInputValue] = useState("");

  const handleEntryAdd = async () => {
    onClickAddEntry(inputValue);
    setInputValue("");
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputValue(event.target.value);
  };

  const currentInputLength = inputValue.length;
  const buttonDisabled = currentInputLength === 0 || loading;

  return (
    <div className="input-bar">
      <CharCounter
        charCount={currentInputLength}
        maxCharCount={70}
        counter_type="char-counter-input"
      />
      <input
        type="text"
        id="task"
        placeholder="Type new task..."
        name="task"
        autoComplete="off"
        className="input-field"
        required
        minLength={1}
        maxLength={70}
        onChange={handleInputChange}
        value={inputValue}
      />
      <Buttons.IconButton
        onClick={handleEntryAdd}
        isLoading={loading}
        buttonDisabled={buttonDisabled}
        IconComponent={Icons.IconAdd}
      />
    </div>
  );
};

export default InputBar;
