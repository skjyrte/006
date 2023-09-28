import "./ButtonEdit.css";

export default function ButtonEdit(props: any) {
  const { onClick, children } = props;
  return (
    <div className="button-edit-container">
      <button className="button-edit" onClick={onClick}>
        {children}
      </button>
    </div>
  );
}
