import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "./Messages.module.css";

function Message({ message, autoCloseTime }) {
  let arrMsg;
  if (message) {
    arrMsg = message.split(".");
  } else {
    arrMsg = null;
  }
  const notify = () =>
    toast(arrMsg[0], {
      position: "top-center",
      autoClose: autoCloseTime,
      hideProgressBar: false,
      closeButton: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  useEffect(() => {
    if (message) {
      notify();
      localStorage.removeItem("msg");
    }
  }, [message]);
  return <ToastContainer className={style.toast} />;
}
export default Message;
