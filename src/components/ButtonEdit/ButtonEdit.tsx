import "./ButtonEdit.css";

export default function ButtonEdit(props: any) {
  const { onClick, children } = props;
  return (
    <button className="button-edit" onClick={onClick}>
      {children}
    </button>
  );
}
