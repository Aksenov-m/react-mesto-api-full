import React from "react";
import logo from "../images/header-logo.svg";
import { Route, Link, useHistory, Switch } from "react-router-dom";

function Header(props) {
  let { email } = props.userData;
  const history = useHistory();

  function signOut() {
    props.signOut();
    history.push("/sign-in");
  }

  return (
    <header className='header section page__header'>
      <img className='header__logo' src={logo} alt='Логотип места России.' />
      <div className='header__info'>
        <Switch>
          <Route exact path='/'>
            <p className='header__text'>{email}</p>
          </Route>
          <Route path='/sign-up'>
            <Link className='header__text link' to='/sign-in'>
              Войти
            </Link>
          </Route>
          <Route path='/sign-in'>
            <Link className='header__text link' to='/sign-up'>
              Регистрация
            </Link>
          </Route>
        </Switch>
        <Route exact path='/'>
          <Link className='header__button link' onClick={signOut} to='/sign-in'>
            Выйти
          </Link>
        </Route>
      </div>
    </header>
  );
}

export default Header;
