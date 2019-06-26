import React from "react";
import { Provider } from "react-redux";
import store from "./store.js";
import { Route } from "react-router-dom";
import NavbarCom from "./components/NavbarCom";
import Home from "./container/Home.jsx";
import ToDo from "./container/ToDo.jsx";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <NavbarCom />
      <Route component={Home} path="/" exact />
      <Route component={ToDo} path="/todo" exact />
    </Provider>
  );
}

export default App;
