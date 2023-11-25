import "./TextButton.css";
import { FC } from "react";

interface Props {
  onClick: () => void;
  displayedText: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  isActive?: boolean;
  size?: string;
}

const TextButton: FC<Props> = ({
  onClick,
  displayedText,
  isDisabled = false,
  isActive = false,
  size = "medium",
}) => (
  <button
    className={`text-button${isDisabled ? "disabled " : " "}${
      isActive ? "active " : " "
    }${size}`}
    onClick={onClick}
    disabled={isDisabled}
  >
    {displayedText}
  </button>
);

export default TextButton;
