import "./Footer.css";
import { Buttons } from "../index";

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
        <Buttons.TextButton
          displayedText="All"
          onClick={() => onClick("All")}
          isActive={filterState === "All" ? true : false}
          size="medium"
        />
        <Buttons.TextButton
          displayedText="Active"
          onClick={() => onClick("Active")}
          isActive={filterState === "Active" ? true : false}
          size="medium"
        />
        <Buttons.TextButton
          displayedText="Completed"
          onClick={() => onClick("Completed")}
          isActive={filterState === "Completed" ? true : false}
          size="medium"
        />
      </div>
      <span></span>
      <div className="clear-container">
        <Buttons.TextButton
          displayedText="Clear Completed"
          onClick={onDeleteCompleted}
        />
      </div>
    </div>
  );
}
