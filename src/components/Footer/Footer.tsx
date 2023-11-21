import "./Footer.css";
import TextButton from "../Buttons/TextButton/TextButton";

export default function Footer(props: any) {
  const { onClick, countActiveToDos, onDeleteCompleted, filterState } = props;
  const countTextGenerator = (() => {
    if (countActiveToDos === 1) {
      return `${countActiveToDos} item left`;
    } else return `${countActiveToDos} items left`;
  })();

  return (
    <div className="footer-container">
      <div className="counter-container">{countTextGenerator}</div>
      <span></span>
      <div className="manage-state-container">
        <TextButton
          displayedText="All"
          onClick={() => onClick("All")}
          isActive={filterState === "All" ? true : false}
          size="medium"
        />
        <TextButton
          displayedText="Active"
          onClick={() => onClick("Active")}
          isActive={filterState === "Active" ? true : false}
          size="medium"
        />
        <TextButton
          displayedText="Completed"
          onClick={() => onClick("Completed")}
          isActive={filterState === "Completed" ? true : false}
          size="medium"
        />
      </div>
      <span></span>
      <div className="clear-container">
        <TextButton
          displayedText="Clear Completed"
          onClick={onDeleteCompleted}
        />
      </div>
    </div>
  );
}
