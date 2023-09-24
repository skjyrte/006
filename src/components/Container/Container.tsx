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
    const responseBody = await response.json();

    (async function () {
      await responseBody;
      if (responseStatus(responseBody)) {
        console.log(responseBody.success);
        console.log(responseBody.message);
        if (typeof responseBody.data === "object") {
          setToDos(responseBody.data);
        }
      } else {
        throw new Error("GET: error getting response");
      }
    })();
  }

  async function handleDeleteEntry(id: string) {
    const response = await fetch(`http://localhost:4000/todos/${id}`, {
      mode: "cors",
      method: "delete",
    });
    const responseBody = await response.json();
    console.log("responseBody");
    console.log(responseBody);

    (async function () {
      await responseBody;
      console.log(responseBody);
      console.log("responseStatus Delete");
      console.log(responseStatus(responseBody));
      if (responseStatus(responseBody)) {
        console.log(responseBody.success);
        console.log(responseBody.message);
        console.log(responseBody.data);
        if (typeof responseBody.data !== "undefined") {
          throw new Error("DELETE: data recieved after delete method called");
        }
      } else {
        throw new Error("DELETE: error getting response");
      }
    })();

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
      "data" in obj &&
      (typeof obj.data === "undefined" || typeof obj.data === "object")
    );
  };
  type validResponse = {
    success: boolean;
    message: string;
    //data: undefined | any[];
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
        <InputBar></InputBar>
        <div className="line-break-container"></div>
        <>{toDosList}</>
        <Footer></Footer>
      </div>
    </>
  );
}
