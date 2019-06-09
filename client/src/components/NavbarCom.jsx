import React, { Component } from "react";
import {
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavItem,
  NavLink,
  Nav
} from "reactstrap";

class NavbarCom extends Component {
  state = {
    isOpen: false
  };

  render() {
    return (
      <Navbar color="dark" dark expand="lg">
        <NavbarBrand>To Do List</NavbarBrand>
        <Container>
          <NavbarToggler
            className="mr-auto"
            onClick={() =>
              this.setState(prevState => ({
                isOpen: !prevState.isOpen
              }))
            }
          />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink>Items</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default NavbarCom;
