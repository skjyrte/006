import "./Checkbox.css";

export default function Checkbox() {
  const handleCheckbox = () => {
    console.log("Checkbox");
  };
  return (
    <label className="container">
      <input type="checkbox" onClick={handleCheckbox} />
      <span className="checkmark"></span>
    </label>
  );
}
