import "./Checkbox.css";
import PuffLoader from "react-spinners/PuffLoader";
import { CSSProperties } from "react";

export default function Checkbox(props: any) {
  const { onChange, checked, isLoading } = props;

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    position: "absolute",
  };
  const color = "yellow";

  return (
    <div className="general-container">
      <label className="container-label">
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className="checkmark"></span>
      </label>
      <PuffLoader
        color={color}
        cssOverride={override}
        loading={isLoading}
        size={45}
        aria-label="Loading Spinner"
        data-testid="loader"
      ></PuffLoader>
    </div>
  );
}
