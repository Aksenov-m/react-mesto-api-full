import React from "react";

// Функциональный компонент PopupWithForm
function AuthForm(props) {
  return (
    <div className='authform'>
      <label className='authform__title'>{props.title}</label>
      <form className={`popup__info popup__info_form_${props.name}`} name={props.name} onSubmit={props.onSubmit}>
        {props.children}
        <button type='submit' className='button link'>
          {props.buttonText}
        </button>
      </form>
    </div>
  );
}

export default AuthForm;
