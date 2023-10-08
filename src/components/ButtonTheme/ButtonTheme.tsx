import "./ButtonTheme.css";

export default function IconButton() {
  const clickedLog = () => {
    console.log("Button theme");
  };
  return (
    // <div className="icon-button-container">
    <button className="icon-button" onClick={clickedLog}>
      <img
        className="icon-button"
        src="./icon-sun.svg"
        alt="day/night theme"
      ></img>
    </button>
    // </div>
  );
}
