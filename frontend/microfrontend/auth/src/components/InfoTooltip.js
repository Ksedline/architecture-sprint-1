import React from "react";
import SuccessIcon from "../images/success-icon.svg";
import ErrorIcon from "../images/error-icon.svg";

function InfoTooltip({ isOpen, onClose, status }) {
  const icon = status === "success" ? SuccessIcon : ErrorIcon;
  const text =
    status === "success"
      ? "Вы успешно зарегистрировались"
      : "Что-то пошло не так! Попробуйте ещё раз.";
  return (
    <div className={`popup-auth ${isOpen && "popup-auth_is-opened"}`}>
      <div className="popup-auth__content">
        <form className="popup-auth__form" noValidate>
          <button type="button" className="popup-auth__close" onClick={onClose} />
          <div>
            <img className="popup-auth__icon" src={icon} alt="" />
            <p className="popup-auth__status-message">{text}</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InfoTooltip;
