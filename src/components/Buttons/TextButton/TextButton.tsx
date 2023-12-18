import "./TextButton.css";
import { FC, useContext } from "react";
import classNames from "classnames";
import { ThemeContext } from "components/App";

interface Props {
  onClick: () => void;
  displayedText: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  isNowSelected?: boolean;
  size?: ButtonSizes;
}

type ButtonSizes = "medium" | "small";

const TextButton: FC<Props> = ({
  onClick,
  displayedText,
  isDisabled = false,
  isNowSelected = false,
  size = "medium",
}) => {
  const currentTheme = useContext(ThemeContext);
  const buttonClassName = classNames(
    "text-button",
    ` text-button_${size}`,
    isDisabled && "text-button_disabled",
    isNowSelected && "text-button_now-selected",
    currentTheme
  );
  return (
    <button className={buttonClassName} onClick={onClick} disabled={isDisabled}>
      {displayedText}
    </button>
  );
};

export default TextButton;
