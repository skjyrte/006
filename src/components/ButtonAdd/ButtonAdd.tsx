import React from "react";
import "./ButtonAdd.css";

export default function ButtonAdd(props: any) {
  const { onClick } = props;
  return (
    <>
      <div className="button-delete-container">
        <button className="button-add" onClick={onClick}>
          <img className="button-add" src="/icon-add.svg" alt="icon add"></img>
        </button>
      </div>
    </>
  );
}
