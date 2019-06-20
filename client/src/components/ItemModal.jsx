import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { addItem } from "../actions/item-actions";
import { toggleModal } from "../actions/modal-actions";

class ItemModal extends React.Component {
  toggle = () => {
    this.props.toggleModal();
  };

  handleSubmit = e => {
    e.preventDefault();
    // addItem()
  };

  render() {
    return (
      <div>
        {/* {console.log(this.props.modal.modal)} */}
        <Button
          color="danger"
          onClick={this.toggle}
          className={"mt-3 mx-auto d-block"}
        >
          Add a To Do
        </Button>
        <Modal isOpen={this.props.modal.modal} toggle={this.toggle}>
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
                <input type="text" name="new-item" />
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
  item: state.item,
  modal: state.modal
});

export default connect(
  mapStateToProps,
  { addItem, toggleModal }
)(ItemModal);
