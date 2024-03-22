import { useEffect } from "react";
import { toast } from "react-toastify";

const useDisclaimerToast = () => {
  let location = window.location.hostname;

  useEffect(() => {
    if (location === "todo-app-client-vrgo.onrender.com") {
      toast.warn(
        "DISCLAIMER: 1. This is a live preview of todo app. 2. Todos visible here will be persisted in database unless deleted by user. 3. Entry content is not moderated.",
        {
          position: "bottom-center",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  }, []);
};

export default useDisclaimerToast;
