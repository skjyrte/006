import Entry from "../Entry/Entry";
import InputBar from "../InputBar/InputBar";
import Footer from "../Footer/Footer";
import IconButton from "../ButtonTheme/ButtonTheme";
import ButtonRefresh from "../ButtonRefresh/ButtonRefresh";
import { useEffect, useState, useRef, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useInView } from "react-intersection-observer";
import "./Container.css";
import createAxiosInstance from "../../api/createAxiosInstance/createAxiosInstance";
import axios from "axios";

import Skeleton from "../Skeleton/Skeleton";

const axiosInstance = createAxiosInstance();
const elementsPerPage = 2;

export default function Container() {
  const [toDos, setToDos] = useState<any[]>([]);
  const [filterState, setFilterState] = useState<string>("All");
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loader, setLoader] = useState<Nullable<String>>(null);
  const [reloadMarker, setReloadMarker] = useState(1);
  const [error, setError] = useState("");
  const parentElement = useRef(null);
  const ref = useRef(null);
  const { ref: inViewRef, inView } = useInView({
    root: parentElement.current,
    threshold: 0.5,
  });

  enum LoadingState {
    ADD_ENTRY = "add_entry",
    GET_DATA = "get_data",
  }

  type Nullable<T> = T | null;

  const refController = useRef(new AbortController());

  useEffect(() => {
    refController.current = new AbortController();
    console.log("FIRST LOAD");
    handleRequest(
      axiosInstance.get,
      {
        url: "/todos",
        config: {
          params: { page: pageNumber, filter: filterState },
          signal: refController.current.signal,
        },
      },
      (data) => {
        // @ts-ignore
        setToDos(data.data.currentData);
        // @ts-ignore
        setHasMore(elementsPerPage * pageNumber < data.data.documentCount);
        /*         toast.success("Loaded successfully.", {
          position: toast.POSITION.TOP_RIGHT,
        }); */
      },
      (error: unknown) => {
        /*         setToDos([]); */
        toast.error("No connection to database. Click here to reload", {
          position: "top-center",
          autoClose: false,
          hideProgressBar: false,
          draggable: false,
          progress: undefined,
          onClick: () => {
            setPageNumber(1);
            setReloadMarker((prevValue) => prevValue + 1);
            toast.clearWaitingQueue();
            toast.dismiss();
            return;
          },
        });
      }
    );

    return () => refController.current.abort();
  }, [filterState, reloadMarker]);

  useEffect(() => {
    if (inView) {
      setPageNumber((page) => page + 1);
    }
  }, [ref.current, inView]);

  useEffect(() => {
    if (pageNumber > 1 && hasMore) {
      handleRequest(
        axiosInstance.get,
        {
          url: "/todos",
          config: {
            params: {
              page: pageNumber,
              filter: filterState,
            },
            signal: refController.current.signal,
          },
        },
        (data) => {
          // @ts-ignore
          setToDos((currentTodos) => [
            ...currentTodos,
            // @ts-ignore
            ...data.data.currentData,
          ]);
          // @ts-ignore
          setHasMore(elementsPerPage * pageNumber < data.data.documentCount);
          /*           toast.success("Loaded new Entries successfully.", {
            position: toast.POSITION.TOP_RIGHT,
          }); */
        },
        (error: unknown) => {
          /*          setToDos([]); */
          toast.error("No connection to database. Click here to reload", {
            position: "top-center",
            autoClose: false,
            hideProgressBar: false,
            draggable: false,
            progress: undefined,
            onClick: () => {
              setPageNumber(1);
              setReloadMarker((prevValue) => prevValue + 1);
              toast.clearWaitingQueue();
              toast.dismiss();
              return;
            },
          });
        }
      );
    }
  }, [pageNumber]);

  const handleRequest = async (
    // @ts-ignore
    requestPromise,
    requestConfig: { url: string; data?: {}; config?: {} },
    successCallback?: (data: unknown) => void,
    failureCallback?: (error: unknown) => void
  ) => {
    try {
      const requestParams = [
        requestConfig.url,
        requestConfig.data,
        requestConfig.config,
      ].filter(Boolean);
      const response = await requestPromise(...requestParams);

      if (successCallback) {
        successCallback(response.data);
      }
    } catch (err) {
      if (axios.isCancel(err)) return;

      if (failureCallback) {
        failureCallback(err);
        return;
      }
      toast.error("We have a problem", {
        position: "top-center",
      });
    } finally {
      setLoader(null);
    }
  };

  const setRefs = useCallback(
    (node: any) => {
      ref.current = node;
      inViewRef(node);
    },
    [inViewRef]
  );

  const toDosList: any = toDos.map((toDo, index) => (
    <Entry
      key={toDo._id}
      todo={toDo}
      onSave={handleSaveEditedEntry}
      onDelete={handleDeleteEntry}
      ref={index === toDos.length - 1 ? setRefs : undefined}
      inView={inView}
    />
  ));

  const enriesPlaceholders: any = (i: number) => Array(i).fill(<Skeleton />);

  async function handleAddEntry(task: string) {
    await handleRequest(
      axiosInstance.post,
      { url: "/todos", data: { task } },
      (data) => {
        // @ts-ignore
        setToDos((toDos) => [...toDos, data.data]);
        toast.success("Added successfully", {
          position: "top-right",
        });
      }
    );
  }

  async function handleDeleteEntry(id: string) {
    await handleRequest(axiosInstance.delete, { url: `/todos/${id}` }, () => {
      // @ts-ignore
      setToDos((toDos) =>
        toDos.filter((todo: any) => {
          return todo._id !== id;
        })
      );
      toast.success("Deleted successfully.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    });
  }

  async function handleSaveEditedEntry(
    id: string,
    edited: { task?: string; completed?: boolean }
  ) {
    await handleRequest(
      axiosInstance.patch,
      { url: `/todos/${id}`, data: edited },
      (data) => {
        // @ts-ignore
        setToDos((toDos) => {
          return toDos.map((todo) => {
            if (todo._id !== id) {
              return todo;
            } else {
              // @ts-ignore
              return data.data;
            }
          });
        });

        toast.success("Edited successfully.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    );
  }

  function handleShowState(showState: string) {
    if (showState !== filterState) {
      setToDos([]);
      setPageNumber(1);
      setFilterState(showState);
    }
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
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        limit={3}
      />
      <div className="outer-box">
        <header className="main-header">
          <ButtonRefresh onClick={() => console.log(toDos)}></ButtonRefresh>
          <IconButton />
        </header>

        <InputBar onClickAddEntry={handleAddEntry} loading={false} />
        <div className="todos-container" ref={parentElement}>
          <>
            {toDosList?.length !== 0 ? (
              toDosList
            ) : (
              <div className="no-entry">No entry to show</div>
            )}
            <div className="is-loading">{enriesPlaceholders(3)}</div>
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
