import { ChangeEventHandler, FC, useState } from "react";
import "./InputBar.css";
import { IconButton } from "components/Buttons";
import { IconAdd } from "components/Icons";
import CharCounter from "components/CharCounter";

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

  return (
    <div className="input-bar">
      <CharCounter
        charCount={inputValue.length}
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
      <IconButton
        onClick={handleEntryAdd}
        isLoading={loading}
        isDisabled={inputValue.length === 0 || loading}
        IconComponent={IconAdd}
      />
    </div>
  );
};

export default InputBar;
