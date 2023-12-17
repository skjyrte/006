import "./Checkbox.css";
import PuffLoader from "react-spinners/PuffLoader";
import { FC } from "react";
import classNames from "classnames";

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
  const checkboxWrapperClassName = classNames(
    "checkbox-wrapper",
    isDisabled && "checkbox-wrapper_disabled"
  );
  return (
    <div className={checkboxWrapperClassName}>
      <label className="checkbox-wrapper__input-label">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onClick}
          disabled={isDisabled}
        />
        <span className="checkbox-wrapper__input-label__checkmark"></span>
      </label>
      <PuffLoader
        color={"yellow"}
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
