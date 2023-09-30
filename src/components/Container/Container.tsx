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
  const [input, setInput] = useState<string>("");

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
          completed={toDo.completed}
          onSave={handleSaveEditedEntry}
          onDelete={handleDeleteEntry}
        />
      );
    });
  }

  async function handleGetEntries() {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/todos`, {
        mode: "cors",
      });
      const responseBody = await response.json();
      console.log("response body:");
      console.log(responseBody);

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
      setToDos([]);
      console.error(e);
    }
  }

  function handleTextChange(e: any) {
    setInput(e.target.value);
  }

  async function handleAddEntry() {
    try {
      if (input === "") {
        throw new Error("Todo cannot be empy");
      }
      const response = await fetch(`${process.env.REACT_APP_API_URL}/todos/`, {
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
      setInput("");
    } catch (e) {
      console.error(e);
    }
    await handleGetEntries();
  }

  async function handleDeleteEntry(id: string) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/todos/${id}`,
        {
          mode: "cors",
          method: "delete",
        }
      );
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

  async function handleSaveEditedEntry(
    id: string,
    editedTodo: string | undefined = undefined,
    editedCompleted: boolean | undefined = undefined
  ) {
    console.log("editedCompleted");
    console.log(editedCompleted);
    try {
      if (editedTodo === "") {
        throw new Error("Todo cannot be empy");
      }
      console.log(
        `id ${id} editedTodo: ${editedTodo} editedCompleted: ${editedCompleted}`
      );
      let sentObj;

      if (editedTodo !== undefined && editedCompleted === undefined) {
        sentObj = { task: editedTodo };
      } else if (editedTodo === undefined && editedCompleted !== undefined) {
        sentObj = { completed: editedCompleted };
      } else {
        throw new Error("POST: error with input data");
      }

      const response: any = await fetch(
        `${process.env.REACT_APP_API_URL}/todos/${id}`,
        {
          mode: "cors",
          method: "put",
          body: JSON.stringify(sentObj),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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
          inputValue={input}
        ></InputBar>
        <div className="line-break-container"></div>
        <>{toDosList}</>
        <Footer></Footer>
      </div>
    </>
  );
}
