import React from "react";
import "./ButtonAdd.css";
import MoonLoader from "react-spinners/MoonLoader";
import { CSSProperties } from "react";
import IconAdd from "../IconAdd/IconAdd";

export default function ButtonAdd(props: any) {
  const { onClick, isEntryAdding, buttonDisabled } = props;

  const override: CSSProperties = {
    display: "block",
    borderColor: "red",
    position: "absolute",
    zIndex: "10",
  };
  const color = "yellow";

  return (
    <>
      <div className={"button-add-container"}>
        <button
          className={buttonDisabled ? "button-add disabled" : "button-add"}
          onClick={onClick}
          disabled={buttonDisabled}
        >
          <IconAdd />
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
