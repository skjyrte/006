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
          displayedText={"All"}
          onClick={() => onClick(FilterState.ALL)}
          isNowSelected={filterState === FilterState.ALL ? true : false}
          size="small"
        />
        <TextButton
          displayedText={"Active"}
          onClick={() => onClick(FilterState.ACTIVE)}
          isNowSelected={filterState === FilterState.ACTIVE ? true : false}
          size="small"
        />
        <TextButton
          displayedText={"Completed"}
          onClick={() => onClick(FilterState.COMPLETED)}
          isNowSelected={filterState === FilterState.COMPLETED ? true : false}
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
