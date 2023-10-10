import "./CharCounter.css";

export default function CharCounter(props: {
  charCount: number;
  maxCharCount: number;
  counter_type: string;
}) {
  const charCount = props.charCount;
  const maxCharCount = props.maxCharCount;
  const counter_type = props.counter_type;
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
}
