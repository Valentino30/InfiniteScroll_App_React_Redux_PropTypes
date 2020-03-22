import "./App.css";
import React from "react";
import NavBar from "./components/NavBar";
import UsersListApp from "./containers/UsersListApp";

function App() {
  return (
    <div className="App">
      <NavBar />
      <UsersListApp />
    </div>
  );
}

export default App;
