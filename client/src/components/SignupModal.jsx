import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class SignupModal extends React.Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      email: "",
      username: "",
      password: ""
    };
  }

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
    const signupInfo = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password
    };
    fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(signupInfo)
    })
      .then(res => res.json())
      .then(user => user)
      .catch(err => {
        throw err;
      });
    this.toggle();
  };

  render() {
    return (
      <div>
        <Button
          color="danger"
          onClick={this.toggle}
          //   className={"mt-3 mx-auto d-block"}
        >
          Signup
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <form onSubmit={this.handleSubmit}>
            <ModalHeader toggle={this.toggle}>User Signup</ModalHeader>

            <ModalBody>
              <div className={"mx-auto d-block text-center"}>
                <div>
                  <label>Email</label>
                  <input
                    className="w-100"
                    onChange={this.handleChange}
                    type="text"
                    value={this.state.email}
                    name="email"
                  />
                </div>
                <div>
                  <label>Username</label>
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

export default SignupModal;
