import "./IconButton.css";
import MoonLoader from "react-spinners/MoonLoader";

export default function IconButton(props: any) {
  const { onClick, isLoading, buttonDisabled, IconComponent } = props;

  console.log(isLoading);
  return (
    <div className={"icon-button-container"}>
      <button
        className={buttonDisabled ? "icon-button disabled" : "icon-button"}
        onClick={onClick}
        disabled={buttonDisabled}
      >
        {<IconComponent />}
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
      />
    </div>
  );
}
