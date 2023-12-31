import "./Checkbox.css";
import PuffLoader from "react-spinners/PuffLoader";
import { FC, useContext } from "react";
import classNames from "classnames";
import { ThemeContext } from "components/App";

interface Props {
  onClick: () => void;
  isChecked: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
}

const Checkbox: FC<Props> = ({
  onClick,
  isChecked,
  isLoading = false,
  isDisabled = false,
}) => {
  const currentTheme = useContext(ThemeContext);
  const checkboxWrapperClassName = classNames(
    "checkbox-wrapper",
    isDisabled && "checkbox-wrapper_disabled"
  );
  return (
    <div data-testid="checkbox" className={checkboxWrapperClassName}>
      <label className="checkbox-wrapper__input-label">
        <input
          type="checkbox"
          data-testid="checkbox-input"
          checked={isChecked}
          onChange={onClick}
          disabled={isDisabled}
        />
        <span className="checkbox-wrapper__input-label__checkmark"></span>
      </label>
      <PuffLoader
        color={currentTheme === "dark" ? "yellow" : "red"}
        cssOverride={{
          display: "block",
          margin: "0 auto",
          position: "absolute",
          zIndex: 10,
        }}
        loading={isLoading}
        size={40}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Checkbox;
