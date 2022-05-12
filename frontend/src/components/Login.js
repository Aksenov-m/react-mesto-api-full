import React, { useState } from "react";
import AuthForm from "./AuthForm";

// Функциональный компонент Login
function Login({ handleLogin }) {
  const [userData, setUserState] = useState({
    password: "",
    email: "",
  });

  const { password, email } = userData;

  function handleChange(e) {
    const { name, value } = e.target;
    setUserState({
      ...userData,
      [name]: value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!password || !email) {
      return;
    }
    handleLogin(password, email);
  }

  return (
    <main className='page__content'>
      <AuthForm onSubmit={handleSubmit} name='signup' title='Вход' buttonText='Войти'>
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
    </main>
  );
}

export default Login;
