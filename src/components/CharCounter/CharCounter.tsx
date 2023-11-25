import "./CharCounter.css";
import { FC } from "react";

interface Props {
  charCount: number;
  maxCharCount: number;
  counter_type: string;
}

const CharCounter: FC<Props> = ({ charCount, maxCharCount, counter_type }) => {
  return (
    <div
      className={
        charCount < 60
          ? `char-counter ${counter_type}`
          : `char-counter char-counter-warning ${counter_type}`
      }
    >
      {charCount}/{maxCharCount}
    </div>
  );
};

export default CharCounter;
