import Entry from "../Entry/Entry";
import InputBar from "../InputBar/InputBar";
import Footer from "../Footer/Footer";
import IconButton from "../ButtonTheme/ButtonTheme";
import ButtonRefresh from "../ButtonRefresh/ButtonRefresh";
import { useEffect, useState, useRef, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios, { isCancel, AxiosError } from "axios";
import { useInView } from "react-intersection-observer";
import "./Container.css";

export default function Container() {
  const [toDos, setToDos] = useState<any[]>([]);
  const [input, setInput] = useState<string>("");
  const [filterState, setFilterState] = useState<string>("All");
  const [nowEdited, setNowEdited] = useState<string>("");
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);

  const controller = new AbortController();
  const signal = controller.signal;

  const parentElement = useRef(null);
  const ref = useRef();
  const { ref: inViewRef, inView } = useInView({
    root: parentElement.current,
    threshold: 0.5,
  });

  useEffect(() => {
    (async () => {
      await handleLoadMore();
    })();
  }, [filterState]);

  const setRefs = useCallback(
    (node: any) => {
      if (loading) return;
      // Ref's from useRef needs to have the node assigned to `current`
      ref.current = node;
      console.log(node);
      // Callback refs, like the one from `useInView`, is a function that takes the node as an argument
      inViewRef(node);
    },
    [inViewRef, loading]
  );

  useEffect(() => {
    if (inView === true /*  && loading === false */) {
      (async () => {
        if (hasMore === true) {
          await handleLoadMore();
        }
      })();
    }
  }, [inView, ref.current]);

  async function handleLoadMore() {
    const result = await handleGetEntries();

    await (() => {
      setToDos((prevState) => [...prevState, ...result]);
      setHasMore(result.length > 0);
      if (result.length > 0) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }
    })();
    console.log(pageNumber);
    console.log("done");
  }

  let toDosList: any;

  //here we need to stop the rendering of todos if todo fetch is pending
  /*   if (typeof toDos === "object" && "length" in toDos) {
    const filteredToDos = toDos.filter((todo) => {
      return true;
    }); */

  toDosList = toDos.map((toDo, index) => {
    return (
      <Entry
        key={toDo._id}
        id={toDo._id}
        toDo={toDo.task}
        completed={toDo.completed}
        onSave={handleSaveEditedEntry}
        onDelete={handleDeleteEntry}
        nowEdited={nowEdited}
        handleToggleEdit={handleToggleEdit}
        shutTheEdit={shutTheEdit}
        ref={index === toDos.length - 1 ? setRefs : undefined}
        inView={inView}
      />
    );
  });

  function handleToggleEdit(id: string) {
    if (nowEdited === id) {
      setNowEdited("");
    } else {
      setNowEdited(id);
    }
  }

  function shutTheEdit() {
    setNowEdited("");
  }

  async function handleGetEntries() {
    setLoading(true);
    shutTheEdit();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/todos/?page=${pageNumber}&filter=${filterState}`,

        {
          signal,
          mode: "cors",
          method: "GET",
        }
      );
      const responseBody = await response.json();

      if (responseStatus(responseBody)) {
        if (
          typeof responseBody.data === "object" &&
          responseBody.success === true
        ) {
          return responseBody.data.currentData;
        } else {
          throw new Error(responseBody.message);
        }
      } else {
        throw new Error("GET: error getting response");
      }
    } catch (e: any) {
      toast.error("Unable to get the entries.", {
        position: toast.POSITION.TOP_CENTER,
      });
      return [];
    } finally {
      setLoading(false);
    }
  }

  function handleTextChange(e: any) {
    setInput(e.target.value);
  }

  async function handleAddEntry() {
    shutTheEdit();
    try {
      if (input === "") {
        throw new Error("Todo cannot be empy");
      }
      const response = await fetch(`${process.env.REACT_APP_API_URL}/todos/`, {
        mode: "cors",
        method: "POST",
        body: JSON.stringify({ task: input }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseBody = await response.json();

      if (responseStatus(responseBody)) {
        if (
          typeof responseBody.data === "object" &&
          responseBody.success === true
        ) {
          //pushing todo to an array, prevent batching
          setToDos((toDos) => [...toDos, responseBody.data]);
          toast.success("Added successfully.", {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          throw new Error(responseBody.message);
        }
      } else {
        throw new Error("POST: error getting response");
      }
      setInput("");
    } catch (e: any) {
      toast.error("Unable to add the entry.", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.error(e);
    }
  }

  async function handleDeleteEntry(id: string) {
    shutTheEdit();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/todos/${id}`,
        {
          mode: "cors",
          method: "DELETE",
        }
      );
      const responseBody = await response.json();

      if (responseStatus(responseBody)) {
        if (
          typeof responseBody.data !== "object" && //DELETE route do not return response
          responseBody.success === true
        ) {
          //removing todo out of an array, prevent batching
          setToDos((toDos) =>
            toDos.filter((todo: any) => {
              return todo._id !== id;
            })
          );
        } else {
          throw new Error(responseBody.message);
        }
      } else {
        throw new Error("DELETE: error getting response");
      }
    } catch (e: any) {
      toast.error("Unable to delete the entry.", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.error(e);
    }
  }

  async function handleSaveEditedEntry(
    id: string,
    editedTodo: string | undefined = undefined,
    editedCompleted: boolean | undefined = undefined
  ) {
    try {
      if (editedTodo === "") {
        throw new Error("Todo cannot be empy");
      }

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
          method: "PATCH",
          body: JSON.stringify(sentObj),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseBody = await response.json();
      if (responseStatus(responseBody)) {
        if (
          typeof responseBody.data === "object" &&
          responseBody.success === true
        ) {
          //replacing todo in an array, prevent batching
          setToDos((toDos) => {
            return toDos.map((todo) => {
              if (todo._id !== id) {
                return todo;
              } else {
                return responseBody.data;
              }
            });
          });
        } else {
          throw new Error(responseBody.message);
        }
      } else {
        throw new Error("PATCH: error getting response");
      }
    } catch (e) {
      toast.error("Unable to save the edit.", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.error(e);
    }
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
    data: any; // ? TO FIX LATER!!!
  };

  function handleShowState(showState: string) {
    controller.abort();
    shutTheEdit();
    setFilterState((prevState) => {
      if (prevState !== showState) {
        setToDos([]);
        setPageNumber(1);
      }
      return showState;
    });
  }

  function countActiveToDos(toDos: any) {
    return toDos.filter((todo: any) => todo.completed === false).length;
  }

  function handleDeleteCompleted() {
    const completedTodos = toDos.filter((todo: any) => todo.completed === true);
    completedTodos.forEach((todo: any) => {
      handleDeleteEntry(todo._id);
    });
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        limit={0}
      />
      ;
      <div className="outer-box">
        <header className="main-header">
          <ButtonRefresh onClick={() => console.log(toDos)}></ButtonRefresh>
          <span></span>
          <IconButton></IconButton>
        </header>

        <InputBar
          onChange={handleTextChange}
          onClick={handleAddEntry}
          inputValue={input}
        ></InputBar>
        <div className="todos-container" ref={parentElement}>
          <>
            {typeof toDosList === "object" && "length" in toDosList ? (
              toDosList.length !== 0 ? (
                toDosList
              ) : (
                <div className="no-entry">No entry to show</div>
              )
            ) : (
              <div className="no-entry">ERROR OR LOADING?</div>
            )}
          </>
        </div>
        <Footer
          onClick={handleShowState}
          countActiveToDos={countActiveToDos(toDos)}
          onDeleteCompleted={handleDeleteCompleted}
          filterState={filterState}
        />
      </div>
    </>
  );
}
