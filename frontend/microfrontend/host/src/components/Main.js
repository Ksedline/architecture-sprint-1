import React from "react";
import Places from "./Places";
import Profile from "./Profile";

function Main({
  currentUser,
  setCurrentUser,
  onCloseAllPopupsEvent,
  onCardsListChangeEvent,
}) {
  return (
    <main className="content">
      <Profile
        setCurrentUser={setCurrentUser}
        currentUser={currentUser}
        onCloseAllPopupsEvent={onCloseAllPopupsEvent}
        onCardsListChangeEvent={onCardsListChangeEvent}
      />
      <Places
        currentUser={currentUser}
        onCardsListChangeEvent={onCardsListChangeEvent}
        onCloseAllPopupsEvent={onCloseAllPopupsEvent}
      />
    </main>
  );
}

export default Main;
