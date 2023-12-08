import { useEffect, useState, useRef, useCallback, ReactNode, FC } from "react";
import { useInView } from "react-intersection-observer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { AxiosResponse } from "axios";
import { AxiosRequestConfig } from "axios";
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
  const ref = useRef<Nullable<HTMLDivElement>>(null);
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.5,
  });

  const refController = useRef(new AbortController());

  type Todo = {
    _id: string;
    task: string;
    completed: boolean;
    __v: number;
  };

  type GetData = {
    currentData: Todo[];
    documentCount: number;
    activeDocumentsCount: number;
  };

  type PostData = {
    documentCount: number;
    activeDocumentsCount: number;
    getCreatedTodo: Todo;
  };

  type SendPostData = {
    task: string;
  };

  type SendPatchData = {
    task?: string;
    completed?: boolean;
  };

  type DeleteData = {
    documentCount: number;
    activeDocumentsCount: number;
  };

  type PatchData = {
    activeDocumentsCount: number;
    getModifiedTodo: Todo;
  };

  type Data<T> = {
    data: T;
  };

  type APIResponse<TData> = {
    data: TData;
    success: string;
    message: string;
  };

  useEffect(() => {
    setToDos([]);
    setLoader(null);
    inViewRef(null);

    refController.current = new AbortController();
    handleRequest<Data<GetData>>(
      axiosInstance.get<APIResponse<Data<GetData>>>,
      {
        url: "/todos",
        config: {
          params: { page: pageNumber, filter: filterState },
          signal: refController.current.signal,
        },
      },
      (data) => {
        setToDos(data.data.currentData);

        setHasMore(elementsPerPage * pageNumber < data.data.documentCount);

        setActiveTodosCount(data.data.activeDocumentsCount);
      },
      (error) => {
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
    console.log(pageNumber);
    if (pageNumber > 1 && hasMore) {
      handleRequest<Data<GetData>>(
        axiosInstance.get<APIResponse<Data<GetData>>>,
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
          const removeDuplicates = [...data.data.currentData].filter(
            (recievedKey) => {
              return !toDos.find((oldKey) => {
                return oldKey._id === recievedKey._id;
              });
            }
          );
          console.log("GOING");

          setToDos((currentTodos) => [...currentTodos, ...removeDuplicates]);

          setHasMore(elementsPerPage * pageNumber < data.data.documentCount);

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

  //(method) Axios.get    <T = any, R = AxiosResponse<T, any>, D = any>(url: string, config?: AxiosRequestConfig<D> | undefined): Promise<R>
  //(method) Axios.get    <T = any, R = AxiosResponse<T, any>, D = any>(url: string, config?: AxiosRequestConfig<D> | undefined): Promise<R>
  //(method) Axios.delete <T = any, R = AxiosResponse<T, any>, D = any>(url: string, config?: AxiosRequestConfig<D> | undefined): Promise<R>

  //(method) Axios.post   <T = any, R = AxiosResponse<T, any>, D = any>(url: string, data?: D | undefined, config?: AxiosRequestConfig<D> | undefined): Promise<R>
  //(method) Axios.patch  <T = any, R = AxiosResponse<T, any>, D = any>(url: string, data?: D | undefined, config?: AxiosRequestConfig<D> | undefined): Promise<R>

  /*   [url: string, config?: AxiosRequestConfig<D>]
[(url: string, data?: D | undefined, config?: AxiosRequestConfig<D> | undefined)] */

  const handleRequest = async <T, D = any>(
    requestPromise: (
      url: string,
      data?: D,
      config?: AxiosRequestConfig<D>
    ) => Promise<AxiosResponse<APIResponse<T>>>,
    requestConfig: { url: string; data?: D; config?: AxiosRequestConfig<D> },
    successCallback?: (data: T) => void,
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

      /*       const response = await requestPromise(
        requestConfig.url,
        requestConfig.data,
        requestConfig.config
      ); */

      //@ts-ignore
      const response = await requestPromise(...requestParams);

      if (successCallback) {
        //@ts-ignore
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
        inView={inView}
      />
    );
  });

  const entriesPlaceholders: any = (i: number) => {
    Array(i).fill(<EntryPlaceholder />); // dlaczego tutaj nie działa Array(i).map(() => <EntryPlaceholder />) ???
  };

  async function handleAddEntry(task: string) {
    await handleRequest<Data<PostData>, SendPostData>(
      axiosInstance.post<
        APIResponse<Data<PostData>>,
        AxiosResponse<APIResponse<Data<PostData>>>,
        SendPostData
      >,
      { url: "/todos", data: { task } },
      (data) => {
        setToDos((toDos) => [...toDos, data.data.getCreatedTodo]);
        toast.success("Added successfully", {
          position: "top-right",
        });

        setActiveTodosCount(data.data.activeDocumentsCount);
      },
      undefined,
      LoadingState.ADD_ENTRY
    );
  }

  async function handleDeleteEntry(id: string) {
    await handleRequest<Data<DeleteData>>(
      axiosInstance.delete<APIResponse<Data<DeleteData>>>,
      { url: `/todos/${id}` },
      (data) => {
        setToDos((toDos) =>
          toDos.filter((todo: any) => {
            return todo._id !== id;
          })
        );
        toast.success("Deleted successfully.", {
          position: toast.POSITION.TOP_RIGHT,
        });

        setActiveTodosCount(data.data.activeDocumentsCount);
      }
    );
  }

  async function handleSaveEditedEntry(
    id: string,
    edited: { task?: string; completed?: boolean }
  ) {
    await handleRequest<Data<PatchData>, SendPatchData>(
      axiosInstance.patch,
      { url: `/todos/${id}`, data: edited },
      (data) => {
        setToDos((toDos) => {
          return toDos.map((todo) => {
            if (todo._id !== id) {
              return todo;
            } else {
              return data.data.getModifiedTodo;
            }
          });
        });

        toast.success("Edited successfully.", {
          position: toast.POSITION.TOP_RIGHT,
        });

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
