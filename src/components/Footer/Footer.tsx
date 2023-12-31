import "./Footer.css";
import { TextButton } from "components/Buttons";
import { FC, useContext } from "react";
import { FilterState } from "types/common";
import { ThemeContext } from "components/App";
import classNames from "classnames";

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
  const currentTheme = useContext(ThemeContext);
  return (
    <div className={classNames("footer", currentTheme)}>
      <div
        data-testid="active-todo-counter"
        className={classNames("footer__counter-wrapper", currentTheme)}
      >
        {`${activeTodosCount} item${activeTodosCount === 1 ? "" : "s"} left`}
      </div>
      <span className={classNames("footer__span-element", currentTheme)}></span>
      <div
        className={classNames("footer__manage-state-container", currentTheme)}
      >
        <TextButton
          displayedText={"All"}
          onClick={() => onClick(FilterState.ALL)}
          isNowSelected={filterState === FilterState.ALL ? true : false}
          size="small"
          dataTestId="all-button"
        />
        <TextButton
          displayedText={"Active"}
          onClick={() => onClick(FilterState.ACTIVE)}
          isNowSelected={filterState === FilterState.ACTIVE ? true : false}
          size="small"
          dataTestId="active-button"
        />
        <TextButton
          displayedText={"Completed"}
          onClick={() => onClick(FilterState.COMPLETED)}
          isNowSelected={filterState === FilterState.COMPLETED ? true : false}
          size="small"
          dataTestId="completed-button"
        />
      </div>
      <span className={classNames("footer__span-element", currentTheme)}></span>
      <div className={classNames("footer__clear-wrapper", currentTheme)}>
        <TextButton
          displayedText="Clear Completed"
          onClick={onDeleteCompleted}
          dataTestId="clear-completed-button"
        />
      </div>
    </div>
  );
};

export default Footer;
