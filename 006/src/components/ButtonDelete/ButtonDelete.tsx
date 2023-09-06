import "./ButtonDelete.css";

export default function ButtonDelete() {
  const clickedLog = () => {
    console.log("Delete button click");
  };
  return (
    <div className="button-delete-container">
      <button className="button-delete" onClick={clickedLog}>
        <img src="icon-cross.svg" />
      </button>
    </div>
  );
}
