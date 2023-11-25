import { useEffect, useState, useRef, useCallback, ReactNode, FC } from "react";
import { useInView } from "react-intersection-observer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

/* custom components */
import { default as createAxiosInstance } from "api/createAxiosInstance/createAxiosInstance";
import { default as Entry } from "components/Entry";
import { default as InputBar } from "components/InputBar";
import { default as Footer } from "components/Footer";
import { default as EntryPlaceholder } from "components/EntryPlaceholder";
import { IconButton } from "components/Buttons";
import { IconSun } from "components/Icons";
import "./Container.css";

const axiosInstance = createAxiosInstance();
const elementsPerPage = 2;

enum LoadingState {
  ADD_ENTRY = "add_entry",
  GET_DATA = "get_data",
}

type Nullable<T> = T | null;

const Container: FC = () => {
  const [toDos, setToDos] = useState<any[]>([]);
  const [filterState, setFilterState] = useState<string>("All");
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loader, setLoader] = useState<Nullable<String>>(null);
  const [reloadMarker, setReloadMarker] = useState(1);
  const [error, setError] = useState("");
  const [activeToDosCount, setActiveTodosCount] = useState<number>(0);
  const ref = useRef(null);
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.5,
  });

  const refController = useRef(new AbortController());

  useEffect(() => {
    setToDos([]);
    setLoader(null);
    inViewRef(null);

    refController.current = new AbortController();
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
        // @ts-ignore
        setActiveTodosCount(data.data.activeDocumentsCount);
      },
      (error: unknown) => {
        setToDos([]);
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
      },
      LoadingState.GET_DATA
    );

    return () => {
      refController.current.abort();
    };
  }, [filterState, reloadMarker]);

  useEffect(() => {
    if (inView && loader === null) {
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
          const removeDuplicates = [...data.data.currentData].filter(
            (recievedKey) => {
              return !toDos.find((oldKey) => {
                return oldKey._id === recievedKey._id;
              });
            }
          );
          // @ts-ignore
          setToDos((currentTodos) => [
            ...currentTodos,
            // @ts-ignore
            ...removeDuplicates,
          ]);
          // @ts-ignore
          setHasMore(elementsPerPage * pageNumber < data.data.documentCount);
          // @ts-ignore
          setActiveTodosCount(data.data.activeDocumentsCount);
        },
        (error: unknown) => {
          setToDos([]);
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
        },
        LoadingState.GET_DATA
      );
    }
  }, [pageNumber]);

  const handleRequest = async (
    // @ts-ignore
    requestPromise,
    requestConfig: { url: string; data?: {}; config?: {} },
    successCallback?: (data: unknown) => void,
    failureCallback?: (error: unknown) => void,
    loaderType?: string
  ) => {
    try {
      if (loaderType) {
        setLoader(loaderType);
      }

      const requestParams = [
        requestConfig.url,
        requestConfig.data,
        requestConfig.config,
      ].filter(Boolean);
      const response = await requestPromise(...requestParams);

      if (successCallback) {
        successCallback(response.data);
      }
      setLoader(null);
    } catch (err) {
      if (axios.isCancel(err)) {
        return;
      } else {
        console.log(err);
        setLoader(null);
      }

      if (failureCallback) {
        failureCallback(err);
      }
      toast.error("We have a problem", {
        position: "top-center",
      });
    }
  };

  const setRefs = useCallback(
    (node: any) => {
      ref.current = node;
      inViewRef(node);
    },
    [inViewRef]
  );

  const toDosList: any = toDos.map((toDo, index) => {
    return (
      <Entry
        key={toDo._id}
        todo={toDo}
        onSave={handleSaveEditedEntry}
        onDelete={handleDeleteEntry}
        ref={index === toDos.length - 1 ? setRefs : undefined}
      />
    );
  });

  const entriesPlaceholders: any = (i: number) => {
    Array(i).fill(<EntryPlaceholder />); // dlaczego tutaj nie działa Array(i).map(() => <EntryPlaceholder />) ???
  };

  async function handleAddEntry(task: string) {
    await handleRequest(
      axiosInstance.post,
      { url: "/todos", data: { task } },
      (data) => {
        // @ts-ignore
        setToDos((toDos) => [...toDos, data.data.getCreatedTodo]);
        toast.success("Added successfully", {
          position: "top-right",
        });
        // @ts-ignore
        setActiveTodosCount(data.data.activeDocumentsCount);
      },
      undefined,
      LoadingState.ADD_ENTRY
    );
  }

  async function handleDeleteEntry(id: string) {
    await handleRequest(
      axiosInstance.delete,
      { url: `/todos/${id}` },
      (data) => {
        // @ts-ignore
        setToDos((toDos) =>
          toDos.filter((todo: any) => {
            return todo._id !== id;
          })
        );
        toast.success("Deleted successfully.", {
          position: toast.POSITION.TOP_RIGHT,
        });
        // @ts-ignore
        setActiveTodosCount(data.data.activeDocumentsCount);
      }
    );
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
              return data.data.getModifiedTodo;
            }
          });
        });

        toast.success("Edited successfully.", {
          position: toast.POSITION.TOP_RIGHT,
        });
        // @ts-ignore
        setActiveTodosCount(data.data.activeDocumentsCount);
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

  async function handleDeleteCompleted() {
    const completedTodos = toDos.filter((todo: any) => todo.completed !== true);
    try {
      await handleDeleteEntry("");
      setToDos([...completedTodos]);
    } catch {
      setToDos([]);
    }
  }

  let entryContent: ReactNode;

  if (toDosList.length === 0 && !loader) {
    entryContent = <div className="no-entry">No entry to show</div>;
  } else if (loader === LoadingState.GET_DATA) {
    entryContent = (
      <>
        {toDosList}
        <div className="is-loading">
          {entriesPlaceholders(toDosList.length === 0 ? 3 : 1)}
        </div>
      </>
    );
  } else {
    entryContent = toDosList;
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
        <div className="main-header">{String(loader)}</div>
        <div className="main-header">{String(inView)}</div>
        <header className="main-header">
          TODO
          {<IconButton IconComponent={IconSun} isLoading={false} />}
        </header>

        <InputBar
          onClickAddEntry={handleAddEntry}
          loading={loader === LoadingState.ADD_ENTRY ? true : false}
        />
        <div className="todos-container">{entryContent}</div>
        <Footer
          onClick={handleShowState}
          activeTodosCount={activeToDosCount}
          onDeleteCompleted={handleDeleteCompleted}
          filterState={filterState}
        />
      </div>
    </>
  );
};

export default Container;
