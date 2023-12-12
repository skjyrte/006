import "./CharCounter.css";
import { FC } from "react";
import classNames from "classnames";

interface Props {
  charCount: number;
  maxCharCount: number;
  counter_type: "input" | "edit";
}

const CharCounter: FC<Props> = ({ charCount, maxCharCount, counter_type }) => {
  const charCounterClassName = classNames(
    "char-counter",
    `char-counter_${counter_type}`,
    charCount > 60 && "char-counter_warning"
  );
  return (
    <div className={charCounterClassName}>
      {charCount}/{maxCharCount}
    </div>
  );
};

export default CharCounter;
