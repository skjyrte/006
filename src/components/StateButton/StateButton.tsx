import "./StateButton.css";

export default function StateButton({ buttonType }: { buttonType: string }) {
  const chandleClick = () => {
    console.log(`clicked on: ${buttonType}`);
  };
  return (
    <button onClick={chandleClick} type="button" className="state-button">
      {buttonType}
    </button>
  );
}
