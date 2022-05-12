import React from "react";

// Функциональный компонент ImagePopup
function ImagePopup({ cardInfo, onClose }) {
  return (
    <div className={`popup popup_image_fullscreen ${cardInfo.link ? "popup_opened" : ""}`}>
      <div className='popup__container popup__container_image'>
        <button className='popup__close-button link' type='button' aria-label='closePopup' onClick={onClose}></button>
        <img className='popup__image' src={cardInfo.link} />
        <h3 className='popup__photo-title'>{cardInfo.name}</h3>
      </div>
    </div>
  );
}

export default ImagePopup;
