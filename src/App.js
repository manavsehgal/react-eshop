import React, { Component } from 'react';
import {
  Grid,
  Navbar,
  Nav,
  NavItem,
  Jumbotron,
  Button } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar inverse fixedTop>
          <Grid>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">React Eshop</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <NavItem href="//github.com/manavsehgal/react-eshop">
                  Code
                </NavItem>
                <NavItem href="//leanpub.com/reacteshop">
                  Book
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          </Grid>
        </Navbar>
        <Jumbotron>
          <Grid>
            <h1>Easily Reusable Eshop in React</h1>
            <p>Eshop written in React, ES6, and Firebase.</p>
            <p><Button bsStyle="success" bsSize="large">
              Learn more
            </Button></p>
          </Grid>
        </Jumbotron>
      </div>
    );
  }
}

export default App;
