import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function Popup(props) {
  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        props.onClose();
      }
    }
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [props.isOpen]);

  useEffect(() => {
    function handleClickClose(evt) {
      if (evt.target.classList.contains("popup_opened")) {
        props.onClose();
      }
    }
    document.addEventListener("click", handleClickClose);
    return () => document.removeEventListener("click", handleClickClose);
  }, [props.isOpen]);

  return <PopupWithForm {...props}></PopupWithForm>;
}

export default Popup;
