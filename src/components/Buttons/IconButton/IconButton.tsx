import { FC, ElementType } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import "./IconButton.css";

interface Props {
  onClick?: () => void;
  isLoading: boolean;
  isDisabled?: boolean;
  IconComponent: ElementType;
}

const IconButton: FC<Props> = ({
  onClick,
  isLoading,
  isDisabled,
  IconComponent,
}) => (
  <div className="icon-button-container">
    <button
      className={isDisabled ? "icon-button disabled" : "icon-button"}
      onClick={onClick}
      disabled={isDisabled}
    >
      <IconComponent />
    </button>
    <PuffLoader
      color="yellow"
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

export default IconButton;
