import "./Checkbox.css";
import PuffLoader from "react-spinners/PuffLoader";
import { FC } from "react";

interface Props {
  onClick: () => void;
  isChecked: boolean;
  isLoading: boolean;
  isDisabled: boolean;
}

const Checkbox: FC<Props> = ({
  onClick,
  isChecked,
  isLoading = false,
  isDisabled = false,
}) => {
  return (
    <div className={`general-container ${isDisabled ? "disabled" : ""}`}>
      <label className="container-label">
        <input
          type="checkbox"
          checked={isChecked}
          onClick={onClick}
          disabled={isDisabled}
        />
        <span className="checkmark"></span>
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
