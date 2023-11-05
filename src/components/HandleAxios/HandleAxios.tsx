import { useEffect, useState, useRef, useMemo } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios, { isCancel, AxiosError } from "axios";

export default function HandleAxios(
  filterProps: any,
  ref: any,
  shutTheEdit: any,
  inView: any
) {
  const [toDos, setToDos] = useState<any[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);

  let cancel: any;

  async function handleGetEntries() {
    setLoading(true);
    shutTheEdit();

    const options = {
      method: "GET",
      mode: "cors",
      url: `${process.env.REACT_APP_API_URL}/todos/`,
      params: { page: pageNumber, filter: filterProps },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
      headers: { "Content-Type": "application/json" },
    };

    try {
      const response = await axios.request(options);
      const responseBody = await response.data;
      console.log(responseBody);

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

  useEffect(() => {
    setToDos([]);
    setPageNumber(1);
    setHasMore(false);
    setLoading(false);
    if (cancel !== undefined) {
      return () => cancel();
    }
  }, [filterProps]);

  useEffect(() => {
    if (pageNumber === 1) {
      (async () => {
        await handleLoadMore();
      })();
    }
    if (inView === false && cancel !== undefined) {
      return () => cancel();
    }
    if (inView === true && hasMore === true && loading === false) {
      (async () => {
        await handleLoadMore();
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

  /*   setPreviousFilter(filterProps); */

  return toDos;
}
