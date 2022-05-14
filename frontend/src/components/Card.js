import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.info.owner === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `card__trash link ${isOwn ? "card__trash_visible" : ""}`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.info.likes.some((i) => i === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `card__like-icon ${isLiked ? "card__like-icon_active" : ""}`;

  function handleClick() {
    props.onCardClick(props.info);
  }

  function handleLikeClick() {
    props.onCardLike(props.info);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.info);
  }

  return (
    <article className='card cards__item'>
      <button
        className={cardDeleteButtonClassName}
        type='button'
        aria-label='deleteCard'
        onClick={handleDeleteClick}
      ></button>
      <img className='card__image' src={props.info.link} alt={props.info.name} onClick={handleClick} />
      <div className='card__flex'>
        <h2 className='card__title'>{props.info.name}</h2>
        <div className='card__likes'>
          <button
            className={cardLikeButtonClassName}
            type='button'
            aria-label='like'
            onClick={handleLikeClick}
          ></button>
          <p className='card__like-counter'>{props.info.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
