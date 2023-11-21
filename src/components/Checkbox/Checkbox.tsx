import "./Checkbox.css";
import PuffLoader from "react-spinners/PuffLoader";

export default function Checkbox(props: any) {
  const { onChange, checked, isLoading } = props;

  return (
    <div className="general-container">
      <label className="container-label">
        <input type="checkbox" checked={checked} onChange={onChange} />
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
}
