const onError = (res) => {
  if (res.ok) {
    return res.json();
  }
  // если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.status}`);
};

export class Api {
  constructor(options) {
    // тело конструктора
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      }

    }).then(onError);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      }
    }).then(onError);
  }

  // Редактирование профиля
  setUserInfo(user) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        name: user.name,
        about: user.about,
      }),
    }).then(onError);
  }

  // Редактирование аватара
  editAvatar(userAvatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        avatar: userAvatar,
      }),
    }).then(onError);
  }

  // getAllData() {
  //   return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  // }
  // Добавление новой карточки
  createCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(onError);
  }

  // Удаление карточки
  deleteCard(data) {
    return fetch(`${this._url}/cards/${data._id}`, {
      method: "DELETE",
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      }
    }).then(onError);
  }

  // добавления лайка
  likeCard(data) {
    return fetch(`${this._url}/cards/${data._id}/likes`, {
      method: "PUT",
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      }
    }).then(onError);
  }

  // удаление лайка
  deleteLikeCard(data) {
    return fetch(`${this._url}/cards/${data._id}/likes`, {
      method: "DELETE",
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      }
    }).then(onError);
  }
  // обновлённые данные лайка
  changeLikeCardStatus(data, isLiked) {
    if (isLiked) {
      return this.likeCard(data);
    } else {
      return this.deleteLikeCard(data);
    }
  }
}

// создание экземпляра класса Api
const api = new Api({
  baseUrl: "https://api.mesto.aksenov.nomoredomains.xyz",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
