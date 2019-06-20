import React, { Component } from "react";
import { ListGroup, ListGroupItem, Container, Button } from "reactstrap";
import { getItems, deleteItem } from "../actions/item-actions.js";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import ItemModal from "./ItemModal";

class List extends Component {
  componentDidMount() {
    // console.log(this.props);
    this.props.getItems();
  }

  handleDelete = id => {
    this.props.deleteItem(id);
  };

  render() {
    const { items } = this.props.item;

    return (
      <Container>
        <ListGroup>
          {items.map(({ name, id }) => (
            <ListGroupItem key={id}>
              {name}
              <Button
                className="remove-btn float-right"
                size="sm"
                color="danger"
                onClick={
                  this.handleDelete.bind(this, id)
                  // this.setState(prevState => ({
                  //   items: prevState.items.filter(item => item.id !== id)
                  // }));
                }
              >
                &times;
              </Button>
            </ListGroupItem>
          ))}
          {/* <Button
          onClick={() => {
          }}
          onClick={() => {
            const newItem = prompt("What is the new to do item?");
            newItem
              ? this.setState(prevState => ({
                  items: [...prevState.items, { name: newItem, id: uuid() }]
                }))
              : console.log("No item was typed in");
          }}
          >
            Add a To Do
          </Button> */}
        </ListGroup>
        <ItemModal className={""} />
      </Container>
    );
  }
}

List.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  deleteItems: PropTypes.func
};

const mapStateToProps = state => ({
  item: state.item
});

export default connect(
  mapStateToProps,
  { getItems, deleteItem }
)(List);
