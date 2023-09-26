import "./ButtonDelete.css";

export default function ButtonDelete(props: any) {
  const { onClick, id } = props;
  return (
    <div className="button-delete-container">
      <button className="button-delete" onClick={() => onClick(id)}>
        <img src="/icon-cross.svg" alt="delete" />
      </button>
    </div>
  );
}
