import React from "react";

// Функциональный компонент PopupWithForm
function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
      <div className='popup__container'>
        <button
          className='popup__close-button link'
          type='button'
          aria-label='closePopup'
          onClick={props.onClose}
        ></button>
        <label className='popup__title'>{props.title}</label>
        <form className={`popup__info popup__info_form_${props.name}`} name={props.name} onSubmit={props.onSubmit}>
          {props.children}
          <button type='submit' className='popup__button' disabled={props.isLoading}>
            {props.isLoading ? props.loadingButtonText : props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
