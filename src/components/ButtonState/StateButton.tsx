import "./StateButton.css";

export default function StateButton(props: any) {
  const { buttonType, onClick, filterState } = props;
  const handleClick = () => {
    if (filterState !== undefined) {
      return onClick(buttonType);
    } else {
      return onClick();
    }
  };
  return (
    <button
      onClick={handleClick}
      type="button"
      className={
        filterState === buttonType ? "state-button active" : "state-button"
      }
    >
      {buttonType}
    </button>
  );
}

//"state-button"
