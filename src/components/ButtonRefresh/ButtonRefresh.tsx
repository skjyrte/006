import "./ButtonRefresh.css";

export default function ButtonRefresh(props: any) {
  const { onClick } = props;
  return (
    <>
      <button className="button-refresh" onClick={onClick}>
        TODO
      </button>
    </>
  );
}
