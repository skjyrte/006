import "./Container.css";
import Entry from "../Entry/Entry";
import InputBar from "../InputBar/InputBar";
import Footer from "../Footer/Footer";
import IconButton from "../IconButton/IconButton";
import { useEffect } from "react";
import { useState } from "react";

export default function Container() {
  const [toDos, setToDos] = useState<any[]>([]);

  useEffect(() => {
    handleGetEntries();
  }, []);

  let toDosList: any;

  if (toDos.length !== 0) {
    toDosList = toDos.map((toDo) => {
      return (
        <Entry
          key={toDo._id}
          id={toDo._id}
          toDo={toDo.task}
          onClick={handleDeleteEntry}
        />
      );
    });
  }

  async function handleGetEntries() {
    setToDos([]);
    const response = await fetch("http://localhost:4000/todos", {
      mode: "cors",
    });
    const zmienna = await response.json();
    setToDos(zmienna.toDos);
  }

  async function handleDeleteEntry(id: string) {
    const response = await fetch(`http://localhost:4000/todos/${id}`, {
      mode: "cors",
      method: "delete",
    });
    const updateEntries = await handleGetEntries();
  }

  return (
    <>
      <div className="outer-box">
        <header className="main-header">
          <h1>TODO</h1>
          <span></span>
          <IconButton></IconButton>
        </header>
        <InputBar></InputBar>
        <div className="line-break-container"></div>
        <>{toDosList}</>
        <Footer></Footer>
      </div>
    </>
  );
}

/* 

const respObj = {
  toDos: [
    {
      _id: "64fcb1042f258d9163d3181a",
      task: "editedtodo",
      completed: false,
      __v: 0,
    },

*/
