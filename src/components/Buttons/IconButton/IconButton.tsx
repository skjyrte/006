import { FC, ElementType } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import "./IconButton.css";
import classNames from "classnames";

interface Props {
  onClick: () => void;
  isLoading?: boolean;
  isDisabled: boolean;
  IconComponent: ElementType;
}

const IconButton: FC<Props> = ({
  onClick,
  isLoading,
  isDisabled,
  IconComponent,
}) => {
  const buttonClassName = classNames(
    "icon-button",
    isDisabled && "icon-button_disabled"
  );
  return (
    <button className={buttonClassName} onClick={onClick} disabled={isDisabled}>
      <IconComponent />
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
    </button>
  );
};

export default IconButton;
