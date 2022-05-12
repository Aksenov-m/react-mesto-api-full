import success from "../images/success.svg";
import fail from "../images/fail.svg";

function InfoTooltip(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
      <div className='popup__container'>
        <button
          className='popup__close-button link'
          type='button'
          aria-label='closePopup'
          onClick={props.onClose}
        ></button>
        <img className='popup__image-info' src={`${props.isRegister ? success : fail}`} alt='' />
        <p className='popup__text'>{`${
          props.isRegister ? "Вы успешно зарегистрировались!" : "Что-то пошло не так!Попробуйте ещё раз."
        }`}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
