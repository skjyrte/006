import "./Container.css";
import Entry from "../Entry/Entry";
import InputBar from "../InputBar/InputBar";
import Footer from "../Footer/Footer";
import IconButton from "../ButtonIcon/IconButton";
import ButtonRefresh from "../ButtonRefresh/ButtonRefresh";
import { useEffect } from "react";
import { useState } from "react";

export default function Container() {
  const [toDos, setToDos] = useState<any[]>([]);
  const [input, setInput] = useState<string>("777");

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
    try {
      const response = await fetch("http://localhost:4000/todos", {
        mode: "cors",
      });
      const responseBody = await response.json();

      if (responseStatus(responseBody)) {
        if (
          typeof responseBody.data === "object" &&
          responseBody.success === true
        ) {
          setToDos(responseBody.data);
        } else {
          throw new Error(responseBody.message);
        }
      } else {
        throw new Error("GET: error getting response");
      }
    } catch (e) {
      console.error(e);
    }
  }

  function handleTextChange(e: any) {
    setInput(e.target.value);
    console.log(e.target.value);
  }

  async function handleAddEntry() {
    try {
      if (input === "") {
        throw new Error("Todo cannot be empy");
      }
      console.log("input:");
      console.log(input);
      const response = await fetch(`http://localhost:4000/todos/`, {
        mode: "cors",
        method: "post",
        body: JSON.stringify({ task: input }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseBody = await response.json();

      if (responseStatus(responseBody)) {
        if (
          typeof responseBody.data !== "undefined" ||
          responseBody.success !== true
        ) {
          throw new Error(responseBody.message);
        }
      } else {
        throw new Error("POST: error getting response");
      }
    } catch (e) {
      console.error(e);
    }
    await handleGetEntries();
  }

  async function handleDeleteEntry(id: string) {
    try {
      const response = await fetch(`http://localhost:4000/todos/${id}`, {
        mode: "cors",
        method: "delete",
      });
      const responseBody = await response.json();

      if (responseStatus(responseBody)) {
        if (
          typeof responseBody.data !== "undefined" ||
          responseBody.success !== true
        ) {
          throw new Error(responseBody.message);
        }
      } else {
        throw new Error("DELETE: error getting response");
      }
    } catch (e) {
      console.error(e);
    }

    await handleGetEntries();
  }
  /* 
  async function handleEditEntry(id: string) {
    try {
      if (input === "") {
        throw new Error("Todo cannot be empy");
      }

      const response = await fetch(`http://localhost:4000/todos/${id}`, {
        mode: "cors",
        method: "put",
        body: JSON.stringify({ task: input }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseBody = await response.json();

      if (responseStatus(responseBody)) {
        if (
          typeof responseBody.data !== "undefined" ||
          responseBody.success !== true
        ) {
          throw new Error(responseBody.message);
        }
      } else {
        throw new Error("POST: error getting response");
      }
    } catch (e) {
      console.error(e);
    }
    await handleGetEntries();
  } */

  const responseStatus = (obj: any): obj is validResponse => {
    return (
      typeof obj === "object" &&
      obj !== null &&
      "success" in obj &&
      typeof obj.success === "boolean" &&
      "message" in obj &&
      typeof obj.message === "string" &&
      (("data" in obj && typeof obj.data === "object") || !("data" in obj))
    );
  };
  type validResponse = {
    success: boolean;
    message: string;
    data?: unknown[];
  };

  return (
    <>
      <div className="outer-box">
        <header className="main-header">
          <h1>TODO</h1>
          <ButtonRefresh onClick={handleGetEntries}></ButtonRefresh>
          <span></span>
          <IconButton></IconButton>
        </header>
        <InputBar
          onChange={handleTextChange}
          onClick={handleAddEntry}
        ></InputBar>
        <div className="line-break-container"></div>
        <>{toDosList}</>
        <Footer></Footer>
      </div>
    </>
  );
}
