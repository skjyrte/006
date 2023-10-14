import "./InputBar.css";
import ButtonAdd from "../ButtonAdd/ButtonAdd";
import CharCounter from "../CharCounter/CharCounter";
import { useState } from "react";

export default function InputBar(props: any) {
  const { onChange, onClick, inputValue } = props;
  const [isEntryAdding, setIsEntryAdding] = useState<boolean>(false);

  async function handleEntryAdd() {
    try {
      setIsEntryAdding(() => true);
      await onClick();
    } catch {
      throw new Error("error adding todo");
    } finally {
      setIsEntryAdding(() => false);
    }
  }

  const currentInputLength = inputValue.length;
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
        onChange={onChange}
        value={inputValue}
      />
      <ButtonAdd onClick={handleEntryAdd} isEntryAdding={isEntryAdding} />
    </div>
  );
}
