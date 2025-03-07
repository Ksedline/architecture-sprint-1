import React from "react";
import { Route, useHistory, Switch } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import api from "../utils/api";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [currentUser, setCurrentUser] = React.useState({});
  const history = useHistory();

  const onCloseAllPopupsEvent = new Event("onCloseAllPopups", {
    composed: true,
  });
  const onCardsListChangeEvent = new Event("onCardsListChange", {
    composed: true,
  });

  // Запрос к API за информацией о пользователе выполняется единожды, при монтировании.
  React.useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.log(err));
  }, []);

  // при монтировании App описан эффект, проверяющий наличие токена и его валидности
  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setEmail(res.data.email);
          setIsLoggedIn(true);
          history.push("/");
        })
        .catch((err) => {
          localStorage.removeItem("jwt");
          console.log(err);
        });
    }
  }, [history]);

  function onSignOut() {
    // при вызове обработчика onSignOut происходит удаление jwt
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    // После успешного вызова обработчика onSignOut происходит редирект на /signin
    history.push("/signin");
  }

  return (
    <div className="page__content">
      <Header email={email} onSignOut={onSignOut} />
      <Switch>
        <ProtectedRoute
          exact
          path="/"
          component={Main}
          loggedIn={isLoggedIn}
          onCardsListChangeEvent={onCardsListChangeEvent}
          onCloseAllPopupsEvent={onCloseAllPopupsEvent}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
        <Route path="/signup">
          <Register
            history={history}
            onCloseAllPopupsEvent={onCloseAllPopupsEvent}
          />
        </Route>
        <Route path="/signin">
          <Login
            history={history}
            setIsLoggedIn={setIsLoggedIn}
            onCloseAllPopupsEvent={onCloseAllPopupsEvent}
          />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
