import React from "react";
import NavbarCom from "./components/NavbarCom";
import List from "./components/List";
import { Provider } from "react-redux";
import store from "./store.js";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <NavbarCom />
        <List />
      </div>
    </Provider>
  );
}

export default App;
