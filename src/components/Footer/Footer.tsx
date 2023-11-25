import "./Footer.css";
import { TextButton } from "components/Buttons";
import { FC } from "react";

interface Props {
  onClick: (parameter: string) => void;
  activeTodosCount: any;
  onDeleteCompleted: () => void;
  filterState: string;
}

const Footer: FC<Props> = ({
  onClick,
  activeTodosCount,
  onDeleteCompleted,
  filterState,
}) => {
  return (
    <div className="footer-container">
      <div className="counter-container">{`${activeTodosCount} item${
        activeTodosCount === 1 ? "" : "s"
      } left`}</div>
      <span></span>
      <div className="manage-state-container">
        <TextButton
          displayedText="All"
          onClick={() => onClick("All")}
          isActive={filterState === "All" ? true : false}
          size="small"
        />
        <TextButton
          displayedText="Active"
          onClick={() => onClick("Active")}
          isActive={filterState === "Active" ? true : false}
          size="small"
        />
        <TextButton
          displayedText="Completed"
          onClick={() => onClick("Completed")}
          isActive={filterState === "Completed" ? true : false}
          size="small"
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
};

export default Footer;
