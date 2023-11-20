import "./ButtonDelete.css";
import IconDelete from "../Icons/IconDelete/IconDelete";

export default function ButtonDelete(props: any) {
  const { onClick } = props;
  return (
    <button className="button-delete" onClick={onClick}>
      <IconDelete />
    </button>
  );
}
