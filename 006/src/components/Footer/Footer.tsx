import "./Footer.css";
import StateButton from "../StateButton/StateButton";

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="counter-container">5 items left</div>
      <span></span>
      <div className="manage-state-container">
        <StateButton buttonType="All" />
        <StateButton buttonType="Active" />
        <StateButton buttonType="Completed" />
      </div>
      <span></span>
      <div className="clear-container">
        <StateButton buttonType="Clear Completed" />
      </div>
    </div>
  );
}
