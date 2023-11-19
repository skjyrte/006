import "./IconButton.css";
import MoonLoader from "react-spinners/MoonLoader";

export default function IconButton(props: any) {
  const { onClick, isLoading, buttonDisabled, IconComponent } = props;

  return (
    <div className={"button-icon-container"}>
      <button
        className={buttonDisabled ? "button-icon disabled" : "button-icon"}
        onClick={onClick}
        disabled={buttonDisabled}
      >
        <IconComponent />
      </button>
      <MoonLoader
        color={"yellow"}
        cssOverride={{
          display: "block",
          borderColor: "red",
          position: "absolute",
          zIndex: "10",
        }}
        loading={isLoading}
        size={40}
        aria-label="Loading Spinner"
        data-testid="loader"
      ></MoonLoader>
    </div>
  );
}
