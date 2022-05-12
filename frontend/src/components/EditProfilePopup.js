import React, { useState, useEffect, useContext } from "react";
import Popup from "./Popup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <Popup
      name='edit'
      title='Редактировать профиль'
      buttonText='Сохранить'
      loadingButtonText='Сохранение...'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
    >
      <input
        id='popup__name'
        name='userName'
        className='popup__input popup__input_string_name'
        type='text'
        placeholder='Имя'
        required
        autoComplete='off'
        minLength='2'
        maxLength='40'
        onChange={handleChangeName}
        value={name}
      />
      <span className='popup__input-error popup__name-error'></span>
      <input
        id='popup__job'
        name='userJob'
        className='popup__input popup__input_string_job'
        type='text'
        placeholder='О себе'
        required
        autoComplete='off'
        minLength='2'
        maxLength='200'
        value={description}
        onChange={handleChangeDescription}
      />
      <span className='popup__input-error popup__job-error'></span>
    </Popup>
  );
}

export default EditProfilePopup;
