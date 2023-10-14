import "./ButtonDelete.css";

export default function ButtonDelete(props: any) {
  const { onClick } = props;
  return (
    <div className="button-delete-container">
      <button className="button-delete" onClick={onClick}>
        <img src="./icon-cross.svg" alt="delete" />
      </button>
    </div>
  );
}
