import { FC, ElementType, useContext } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import "./IconButton.css";
import classNames from "classnames";
import { ThemeContext } from "components/App";

interface Props {
  onClick: () => void;
  isLoading?: boolean;
  isDisabled: boolean;
  IconComponent: ElementType;
  dataTestId?: string;
}

const IconButton: FC<Props> = ({
  onClick,
  isLoading,
  isDisabled,
  IconComponent,
  dataTestId,
}) => {
  const currentTheme = useContext(ThemeContext);
  const buttonClassName = classNames(
    "icon-button",
    isDisabled && "icon-button_disabled",
    currentTheme
  );
  return (
    <button
      data-test-id={dataTestId}
      className={classNames(buttonClassName, currentTheme)}
      onClick={onClick}
      disabled={isDisabled}
    >
      <IconComponent />
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
    </button>
  );
};

export default IconButton;
