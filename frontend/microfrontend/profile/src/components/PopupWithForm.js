import React from 'react';

function PopupWithForm({
  title,
  name,
  isOpen,
  buttonText = 'Сохранить',
  onSubmit,
  onClose,
  children,
}) {
  return (
    <div className={`popup-profile popup_type_${name} ${isOpen ? 'popup-profile_is-opened' : ''}`}>
      <div className="popup-profile__content">
        <form className="popup-profile__form" name={name} noValidate onSubmit={onSubmit}>
          <button type="button" className="popup-profile__close" onClick={onClose}></button>
          <h3 className="popup-profile__title">{title}</h3>
          {children}
          <button type="submit" className="button popup-profile__button">{buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
