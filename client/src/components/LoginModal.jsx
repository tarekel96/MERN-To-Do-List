import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class LoginModal extends React.Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      username: "",
      password: ""
    };
  }

  // componentDidMount() {
  //   const loginInfo = {
  //     username: this.state.username,
  //     password: this.state.password
  //   };
  //   fetch("/users/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(loginInfo)
  //   })
  //     .then(res => res.json())
  //     .then(data => localStorage.setItem("token", data.token))
  //     .catch(err => {
  //       throw err;
  //     });
  // }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const loginInfo = {
      username: this.state.username,
      password: this.state.password
    };
    fetch("/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginInfo)
    })
      .then(res => res.json())
      .then(data => localStorage.setItem("token", data.token))
      .catch(alert("Incorrect username/email entry or password"));
    this.toggle();
  };

  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>
          Login
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <form onSubmit={this.handleSubmit}>
            <ModalHeader
              //     className="d-block text-center"
              toggle={this.toggle}
            >
              User Login
            </ModalHeader>

            <ModalBody>
              <div className={"mx-auto d-block text-center"}>
                <div>
                  <label>Username or email:</label>
                  <input
                    className="w-100"
                    onChange={this.handleChange}
                    type="text"
                    value={this.state.username}
                    name="username"
                  />
                </div>
                <div>
                  <label>Password:</label>
                  <input
                    className="w-100"
                    onChange={this.handleChange}
                    type="text"
                    value={this.state.password}
                    name="password"
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <input
                className={"btn btn-secondary"}
                type="submit"
                value="Submit"
                onClick={this.handleSubmit}
              />

              <Button color="secondary" onClick={this.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      </div>
    );
  }
}

export default LoginModal;
