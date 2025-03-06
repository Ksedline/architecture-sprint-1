import React from 'react';

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup-places popup_type_image ${card ? 'popup-places_is-opened' : ''}`}>
      <div className="popup-places__content popup__content_content_image">
        <button type="button" className="popup-places__close" onClick={onClose}></button>
        <img alt={card ? card.name : ''} src={card ? card.link : ''} className="popup-places__image" />
        <p className="popup-places__caption">{card ? card.name : ''}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
