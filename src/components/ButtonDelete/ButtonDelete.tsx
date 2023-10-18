import "./ButtonDelete.css";
import IconDelete from "../IconDelete/IconDelete";

export default function ButtonDelete(props: any) {
  const { onClick } = props;
  return (
    <div className="button-delete-container">
      <button className="button-delete" onClick={onClick}>
        <IconDelete />
      </button>
    </div>
  );
}
