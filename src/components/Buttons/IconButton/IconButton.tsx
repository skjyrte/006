import "./IconButton.css";
import PuffLoader from "react-spinners/PuffLoader";

export default function IconButton(props: any) {
  const { onClick, isLoading, buttonDisabled, IconComponent } = props;
  return (
    <div className={"icon-button-container"}>
      <button
        className={buttonDisabled ? "icon-button disabled" : "icon-button"}
        onClick={onClick}
        disabled={buttonDisabled}
      >
        {<IconComponent />}
      </button>
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
}
