import React, { Component } from "react";
import { ListGroup, ListGroupItem, Container, Button } from "reactstrap";
import uuid from "uuid";

class List extends Component {
  state = {
    items: [
      {
        name: "Do laundry",
        id: 1
      },
      {
        name: "Take out the trash",
        id: 2
      },
      {
        name: "Clean the garage",
        id: 3
      }
    ]
  };

  render() {
    return (
      <Container>
        <ListGroup>
          {this.state.items.map(({ name, id }) => (
            <ListGroupItem key={id}>
              {name}
              <Button
                className="remove-btn float-right"
                size="sm"
                color="danger"
                onClick={() => {
                  this.setState(prevState => ({
                    items: prevState.items.filter(item => item.id !== id)
                  }));
                }}
              >
                &times;
              </Button>
            </ListGroupItem>
          ))}
          <Button
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
          </Button>
        </ListGroup>
      </Container>
    );
  }
}

export default List;
