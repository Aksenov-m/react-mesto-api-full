import React, { useRef, useEffect } from "react";
import Popup from "./Popup";

function EditAvatarPopup(props) {
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = "";
  }, [props.onClose]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <Popup
      name='avatar'
      title='Обновить аватар'
      buttonText='Сохранить'
      loadingButtonText='Сохранение...'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
    >
      <input
        id='popup__avatar'
        name='avatarlink'
        className='popup__input popup__input_string_avatar-link'
        type='url'
        placeholder='Ссылка на картинку'
        required
        autoComplete='off'
        ref={avatarRef}
      />
      <span className='popup__input-error popup__avatar-error'></span>
    </Popup>
  );
}

export default EditAvatarPopup;
