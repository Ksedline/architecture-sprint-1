import React from "react";
import Places from "./Places";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>React App (Remote)</h1>
      <Router>
        <Places />
      </Router>
    </div>
  );
}

export default App;
