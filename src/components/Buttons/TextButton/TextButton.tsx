import "./TextButton.css";
import { FC } from "react";
import classNames from "classnames";

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
  const buttonClassName = classNames(
    "text-button",
    ` text-button_${size}`,
    isDisabled && "text-button_disabled",
    isNowSelected && "text-button_now-selected"
  );
  return (
    <button className={buttonClassName} onClick={onClick} disabled={isDisabled}>
      {displayedText}
    </button>
  );
};

export default TextButton;
