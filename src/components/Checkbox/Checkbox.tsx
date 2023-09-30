import "./Checkbox.css";

export default function Checkbox(props: any) {
  const { onChange, checked } = props;

  return (
    <label className="container">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="checkmark"></span>
    </label>
  );
}
