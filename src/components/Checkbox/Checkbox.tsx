import "./Checkbox.css";
import PuffLoader from "react-spinners/PuffLoader";
import { FC } from "react";

interface Props {
  onChange: () => void;
  checked: boolean;
  isLoading: boolean;
  disabled: boolean;
}

const Checkbox: FC<Props> = ({
  onChange,
  checked,
  isLoading,
  disabled = false,
}) => {
  return (
    <div className={`general-container ${disabled ? "disabled" : ""}`}>
      <label className="container-label">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
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
