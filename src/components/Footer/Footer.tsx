import "./Footer.css";
import { TextButton } from "components/Buttons";
import { FC } from "react";
import { FilterState } from "types/common";

interface Props {
  onClick: (parameter: FilterState) => void;
  activeTodosCount: number;
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
    <div className="footer">
      <div className="footer__counter-wrapper">
        {`${activeTodosCount} item${activeTodosCount === 1 ? "" : "s"} left`}
      </div>
      <span className="footer__span-element"></span>
      <div className="footer__manage-state-container">
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
      <span className="footer__span-element"></span>
      <div className="footer__clear-wrapper">
        <TextButton
          displayedText="Clear Completed"
          onClick={onDeleteCompleted}
          isDisabled={activeTodosCount === 0 ? true : false}
        />
      </div>
    </div>
  );
};

export default Footer;
