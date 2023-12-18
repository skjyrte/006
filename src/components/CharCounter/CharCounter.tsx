import "./CharCounter.css";
import { FC, useContext } from "react";
import classNames from "classnames";
import { ThemeContext } from "components/App";

interface Props {
  charCount: number;
  maxCharCount: number;
  counter_type: "input" | "edit";
}

const CharCounter: FC<Props> = ({ charCount, maxCharCount, counter_type }) => {
  const currentTheme = useContext(ThemeContext);
  const charCounterClassName = classNames(
    "char-counter",
    `char-counter_${counter_type}`,
    charCount > 60 && "char-counter_warning"
  );
  return (
    <div className={classNames(charCounterClassName, currentTheme)}>
      {charCount}/{maxCharCount}
    </div>
  );
};

export default CharCounter;
