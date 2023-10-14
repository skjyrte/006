import React from "react";
import "./ButtonAdd.css";
import MoonLoader from "react-spinners/MoonLoader";
import { CSSProperties } from "react";

export default function ButtonAdd(props: any) {
  const { onClick, isEntryAdding } = props;

  const override: CSSProperties = {
    display: "block",
    borderColor: "red",
    position: "absolute",
    /*     transform: "translate(-50%, -50%)", */
    zIndex: "10",
  };
  const color = "yellow";

  return (
    <>
      <div className="button-add-container">
        <button className="button-add" onClick={onClick}>
          <img className="button-add" src="./icon-add.svg" alt="icon add"></img>
        </button>
        <MoonLoader
          color={color}
          cssOverride={override}
          loading={isEntryAdding}
          size={40}
          aria-label="Loading Spinner"
          data-testid="loader"
        ></MoonLoader>
      </div>
    </>
  );
}
