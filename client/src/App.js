import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store.js";
import { Route } from "react-router-dom";
import NavbarCom from "./components/NavbarCom";
import Home from "./container/Home.jsx";
import ToDo from "./container/ToDo.jsx";
import { loadUser } from "./actions/auth-actions";
import "./App.css";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <NavbarCom />
        <Route component={Home} path="/" exact />
        <Route component={ToDo} path="/todo" exact />
      </Provider>
    );
  }
}

export default App;
