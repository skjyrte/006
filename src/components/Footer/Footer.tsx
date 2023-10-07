import "./Footer.css";
import StateButton from "../ButtonState/StateButton";

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
        <StateButton
          buttonType="All"
          onClick={onClick}
          filterState={filterState}
        />
        <StateButton
          buttonType="Active"
          onClick={onClick}
          filterState={filterState}
        />
        <StateButton
          buttonType="Completed"
          onClick={onClick}
          filterState={filterState}
        />
      </div>
      <span></span>
      <div className="clear-container">
        <StateButton buttonType="Clear Completed" onClick={onDeleteCompleted} />
      </div>
    </div>
  );
}
