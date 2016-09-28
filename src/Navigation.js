import React, { Component } from 'react';
import { Grid, Form, FormControl, Navbar, Nav, NavItem, Well, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import './Navigation.css';

export default class Navigation extends Component {
  render() {
    return (
      <div className="Navigation__container">
        <Navbar inverse fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">React Eshop</Link>
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
        </Navbar>
        <div className="ReactEshop__nav-spacer" />
        <Well>
          <Grid>
            <Row>
              <Col xs={12} md={6}>
                <div className="Navigation__search-spacer" />
                <Form>
                  <FormControl type="text" placeholder="Search products" />
                </Form>
              </Col>
              <Col xs={12} md={6}>
                <div className="Navigation__promo">
                  <span>
                    <strong>Get React Eshop</strong> for your business
                  </span>
                  &nbsp;
                  <span>
                    <Button bsStyle="success">
                      Ask us now
                    </Button>
                  </span>
                </div>
              </Col>
            </Row>
          </Grid>
        </Well>
      </div>
    );
  }
}
