import React from "react";
import Card from "./Card";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import "../blocks/places/places.css";
import "../blocks/popup/popup.css";
import "../blocks/popup/_is-opened/popup_is-opened.css";

function Places({
  currentUser,
  onCardsListChangeEvent,
}) {
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(null);

  React.useEffect(() => {
    document.addEventListener(onCardsListChangeEvent.type, fetchCards);
    return () => {
      document.removeEventListener(onCardsListChangeEvent.type, fetchCards);
    };
  }, []);

  React.useEffect(() => {
    fetchCards();
  }, []);

  function fetchCards() {
    api
      .getCardList()
      .then((cardData) => {
        setCards(cardData);
      })
      .catch((err) => console.log(err));
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function closeAllPopups() {
    setSelectedCard(null);
  }

  return (
    <>
      <section className="places page__section">
        <ul className="places__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              currentUser={currentUser}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          ))}
        </ul>
      </section>
      <ImagePopup card={selectedCard} onClose={() => closeAllPopups(true)} />
    </>
  );
}

export default Places;
