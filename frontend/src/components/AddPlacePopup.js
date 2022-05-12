import React, { useState, useEffect } from "react";
import Popup from "./Popup";

function AddPlacePopup(props) {
  const [nameCard, setName] = useState("");
  const [linkCard, setlink] = useState("");

  useEffect(() => {
    setName("");
    setlink("");
  }, [props.onClose]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangelink(e) {
    setlink(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace({
      name: nameCard,
      link: linkCard,
    });
  }

  return (
    <Popup
      name='add'
      title='Новое место'
      buttonText='Создать'
      loadingButtonText='Создать'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
    >
      <input
        id='popup__image'
        name='imageName'
        className='popup__input popup__input_string_title'
        type='text'
        placeholder='Название'
        required
        autoComplete='off'
        minLength='2'
        maxLength='30'
        onChange={handleChangeName}
        value={nameCard}
      />
      <span className='popup__input-error popup__image-error'></span>
      <input
        id='popup__link'
        name='imagelink'
        className='popup__input popup__input_string_link'
        type='url'
        placeholder='Ссылка на картинку'
        required
        autoComplete='off'
        onChange={handleChangelink}
        value={linkCard}
      />
      <span className='popup__input-error popup__link-error'></span>
    </Popup>
  );
}

export default AddPlacePopup;
