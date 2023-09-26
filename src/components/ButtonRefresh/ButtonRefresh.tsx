import "./ButtonRefresh.css";

export default function ButtonRefresh(props: any) {
  const { onClick } = props;
  return (
    <>
      <button className="button-refresh" onClick={onClick}>
        <img
          className="button-refresh"
          src="./icon-reload.svg"
          alt="icon reload"
        ></img>
      </button>
    </>
  );
}
