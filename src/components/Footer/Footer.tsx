import "./Footer.css";
import { TextButton } from "components/Buttons";
import { FC } from "react";
import { FilterState } from "components/CommonTypes";

interface Props {
  onClick: (parameter: FilterState) => void;
  activeTodosCount: any;
  onDeleteCompleted: () => void;
  filterState: FilterState;
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
          displayedText={FilterState.ALL}
          onClick={() => onClick(FilterState.ALL)}
          isActive={filterState === FilterState.ALL ? true : false}
          size="small"
        />
        <TextButton
          displayedText={FilterState.ACTIVE}
          onClick={() => onClick(FilterState.ACTIVE)}
          isActive={filterState === FilterState.ACTIVE ? true : false}
          size="small"
        />
        <TextButton
          displayedText={FilterState.COMPLETED}
          onClick={() => onClick(FilterState.COMPLETED)}
          isActive={filterState === FilterState.COMPLETED ? true : false}
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
