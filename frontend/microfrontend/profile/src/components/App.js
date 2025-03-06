import React from "react";
import Profile from "./Profile";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>React App (Remote)</h1>
      <Router>
        <Profile />
      </Router>
    </div>
  );
}

export default App;
