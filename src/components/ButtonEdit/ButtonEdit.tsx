import "./ButtonEdit.css";

export default function ButtonEdit(props: any) {
  const { onClick, buttonDisabled, children } = props;

  return (
    <button
      className={buttonDisabled ? "button-edit disabled" : "button-edit"}
      onClick={onClick}
      disabled={buttonDisabled}
    >
      {children}
    </button>
  );
}
