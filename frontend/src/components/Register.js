import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import AuthForm from "./AuthForm";

// Функциональный компонент Register
function Register({ handleRegister }) {
  const [registerData, setRegisterData] = useState({
    password: "",
    email: "",
  });
  const { password, email } = registerData;

  function handleChange(e) {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(password, email);
  }

  return (
    <main className='page__content'>
      <AuthForm onSubmit={handleSubmit} name='signup' title='Регистрация' buttonText='Зарегистрироваться'>
        <input
          id='email'
          name='email'
          className='authform__input popup__input_string_email'
          type='text'
          placeholder='Email'
          required
          autoComplete='off'
          minLength='2'
          maxLength='40'
          value={email}
          onChange={handleChange}
        />
        <span className='popup__input-error popup__email-error'></span>
        <input
          id='password'
          name='password'
          className='authform__input popup__input_string_password'
          type='text'
          placeholder='Пароль'
          required
          autoComplete='off'
          minLength='2'
          maxLength='200'
          value={password}
          onChange={handleChange}
        />
        <span className='popup__input-error popup__password-error'></span>
      </AuthForm>
      <Link className='button_type_to-in link' to='/sign-in'>
        Уже зарегистрированы? Войти
      </Link>
    </main>
  );
}

export default withRouter(Register);
