import React, { Component } from "react";
import LogOut from "../components/LogOut.jsx";
import LoginModal from "../components/LoginModal.jsx";
import SignupModal from "../components/SignupModal";

class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <LogOut />
        <div className="d-flex justify-content-center mt-3">
          <SignupModal />
          <span
            style={{
              visibility: "hidden"
            }}
          >
            {"S   P  A  C  E"}
          </span>
          <LoginModal />
        </div>
      </div>
    );
  }
}

export default Home;
