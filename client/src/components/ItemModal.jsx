import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { addItem } from "../actions/item-actions";

class ItemModal extends React.Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      name: ""
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
    const { name } = this.state;
    const newItem = {
      name
    };
    this.props.addItem(newItem);
    this.toggle();
  };

  render() {
    return (
      <div>
        <Button
          color="danger"
          onClick={this.toggle}
          className={"mt-3 mx-auto d-block"}
        >
          Add a To Do
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <form onSubmit={this.handleSubmit}>
            <ModalHeader
              style={{
                textAlign: "center !important"
              }}
              toggle={this.toggle}
            >
              Enter New To Do
            </ModalHeader>

            <ModalBody>
              <div className={"d-flex justify-content-center"}>
                <label
                  style={{
                    paddingRight: "1rem"
                  }}
                >
                  New To Do:
                </label>
                <input
                  onChange={this.handleChange}
                  type="text"
                  value={this.state.name}
                  name="name"
                />
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

const mapStateToProps = state => ({
  item: state.item
});

export default connect(
  mapStateToProps,
  { addItem }
)(ItemModal);
