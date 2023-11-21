import "./TextButton.css";

export default function TextButton(props: any) {
  const {
    onClick,
    displayedText,
    isDisabled = false,
    isActive = false,
    size = "",
  } = props;

  return (
    <button
      className={`text-button${isDisabled ? "disabled " : " "}${
        isActive ? "active " : " "
      }${size}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {displayedText}
    </button>
  );
}
