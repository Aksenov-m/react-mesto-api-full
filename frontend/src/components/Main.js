import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useParams } from "react-router-dom"; // импортируем хук

// Функциональный компонент Main
function Main(props) {
  // let { id } = useParams();
  // id = currentUser._id;

  const currentUser = useContext(CurrentUserContext);
  return (
    <main className='content page__content'>
      <section className='profile section content__section'>
        <div className='profile__content'>
          <div className='profile__avatar'>
            <img
              className='profile__avatar-icon link'
              src={currentUser.avatar}
              alt='Аватар.'
              onClick={props.onEditAvatar}
            />
          </div>
          <div className='profile__info'>
            <h1 className='profile__name'>{currentUser.name}</h1>
            <p className='profile__job'>{currentUser.about}</p>
          </div>
          <button
            className='profile__edit-button link'
            type='button'
            aria-label='popupEdit'
            onClick={props.onEditProfile}
          ></button>
        </div>
        <button
          className='profile__add-button link'
          type='button'
          aria-label='addCard'
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className='cards section content__section' aria-label='Карточки мест'>
        {props.cards.map((cardInfo) => (
          <Card
            key={cardInfo._id}
            info={cardInfo}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
