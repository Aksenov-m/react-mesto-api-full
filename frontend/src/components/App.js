import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import api from "../../src/utils/api";
import * as mestoAuth from "../../src/utils/mestoAuth.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Route, Switch, useHistory } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import PageNotFound from "./PageNotFound";
import ProtectedRoute from "./ProtectedRoute"; // импортируем HOC

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  // Стейт, отвечающий за данные текущего пользователя
  const [currentUser, setСurrentUser] = useState({ name: "Жак-Ив Кусто", about: "Исследователь океана", avatar: " " });
  // Стейт, отвечающий за индикацию отправки запроса для кнопки модальных окон
  const [isLoading, setIsLoading] = useState(false);
  // Стейт, который информирует пользователя об успешной (или не очень) регистрации
  const [isRegister, setIsRegister] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    password: "",
    email: "",
  });

  const history = useHistory();
  useEffect(() => tokenCheck(), []);
  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn]);

  function handleRegister(password, email) {
    return mestoAuth
      .register(password, email)
      .then((res) => {
        if (res.data) {
          history.push("/sign-in");
          setIsRegister(true);
          setInfoTooltipPopupOpen(true);
        } else {
          setInfoTooltipPopupOpen(true);
          setIsRegister(false);
        }
      })
      .catch((res) => console.log(res.message));
  }

  function handleLogin(password, email) {
    return mestoAuth
      .authorize(password, email)
      .then((res) => {
        if (!res) {
          setInfoTooltipPopupOpen(true);
          setIsRegister(false);
          throw new Error("Что-то пошло не так!");
        }
        if (res.token) {
          const userData = { password, email };
          localStorage.setItem("jwt", res.token);
          setUserData(userData);
          setLoggedIn(true);
          history.push("/");
        }
      })
      .catch((res) => console.log(res.message));
  }

  const tokenCheck = () => {
    if (localStorage.getItem("jwt")) {
      let jwt = localStorage.getItem("jwt");
      mestoAuth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            // здесь можем получить данные пользователя!
            const userData = {
              email: res.data.email,
            };
            setUserData(userData);
            setLoggedIn(true);
            history.push("/");
          }
        })
        .catch((res) => console.log(res.message));
    }
  };

  function signOut() {
    localStorage.removeItem("jwt", "password", "email");
    setUserData({ password: "", email: "" });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard.data : c)));
      })
      .catch((err) => alert(err));
  }

  function handleCardDelete(card) {
    // Отправляем запрос в API и получаем обновлённые данные без удалённой карточки
    api
      .deleteCard(card)
      .then(() => {
        setCards((state) => state.filter((cardDelete) => cardDelete._id !== card._id));
      })
      .catch((err) => alert(err));
  }

  useEffect(() => {
    if (loggedIn) {
      api
        .getInitialCards()
        .then((cards) => {
          setCards(cards.data);
        })
        .catch((err) => alert(err));
      api
        .getUserInfo()
        .then((user) => {
          setСurrentUser(user.data);
        })
        .catch((err) => alert(err));
    }
  }, [loggedIn]);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setAddPlacePopupOpen(false);
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({});
    setInfoTooltipPopupOpen(false);
  }

  function handleCardClick(data) {
    setSelectedCard(data);
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .setUserInfo(data)
      .then((newData) => {
        setСurrentUser(newData.data);
        closeAllPopups();
      })
      .catch((err) => alert(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .editAvatar(data.avatar)
      .then((newData) => {
        setСurrentUser(newData.data);
        closeAllPopups();
      })
      .catch((err) => alert(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .createCard(data)
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => alert(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className='App'>
      <CurrentUserContext.Provider value={currentUser}>
        <div className='page__container'>
          <Header userData={userData} signOut={signOut} />
          <Switch>
            <Route path='/sign-in'>
              <Login handleLogin={handleLogin} />
            </Route>
            <Route path='/sign-up'>
              <Register handleRegister={handleRegister} />
            </Route>
            <ProtectedRoute
              path='/'
              loggedIn={loggedIn}
              component={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
            <Route path='*'>
              <PageNotFound />
            </Route>
          </Switch>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
          <AddPlacePopup
            onClose={closeAllPopups}
            isOpen={isAddPlacePopupOpen}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />
          <ImagePopup onClose={closeAllPopups} cardInfo={selectedCard} />
          <InfoTooltip
            name='infotooltip'
            onClose={closeAllPopups}
            isOpen={isInfoTooltipPopupOpen}
            isRegister={isRegister}
          ></InfoTooltip>
        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
