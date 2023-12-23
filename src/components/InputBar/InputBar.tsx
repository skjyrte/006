import { ChangeEventHandler, FC, useState, useContext } from "react";
import "./InputBar.css";
import { IconButton } from "components/Buttons";
import { IconAdd } from "components/Icons";
import CharCounter from "components/CharCounter";
import classNames from "classnames";
import { ThemeContext } from "components/App";

interface Props {
  onClickAddEntry: (value: string) => void;
  loading: boolean;
}

const InputBar: FC<Props> = ({ onClickAddEntry, loading }) => {
  const [inputValue, setInputValue] = useState("");
  const currentTheme = useContext(ThemeContext);

  const handleEntryAdd = async () => {
    onClickAddEntry(inputValue);
    setInputValue("");
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div
      className={classNames("input-bar", currentTheme)}
      data-test-id="input-bar"
    >
      <CharCounter
        charCount={inputValue.length}
        maxCharCount={70}
        counter_type="input"
      />
      <input
        type="text"
        id="task"
        placeholder="Type new task..."
        name="task"
        autoComplete="off"
        className={classNames("input-bar__input-field", currentTheme)}
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
        dataTestId={"add-entry-button"}
      />
    </div>
  );
};

export default InputBar;
