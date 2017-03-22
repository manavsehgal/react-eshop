import React, { Component } from 'react';
import { Grid, Form, FormControl, Navbar, Glyphicon,
  Nav, NavItem, Well, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import './Navigation.css';
import reFirebase from './reFirebase';

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = { logout: false };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }
  componentDidMount() {
    reFirebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.setState({ logout: true });
      } else {
        // No user is signed in.
        this.setState({ logout: false });
      }
    });
  }
  login() {
    const provider = new reFirebase.auth.GoogleAuthProvider();

    reFirebase.auth().signInWithPopup(provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log("User signin " + user + " with token " + token );
      // ...
      // User is signed in.
      this.setState({ logout: true });
    }).catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
      console.log("Err " + errorCode + " msg " + errorMessage
        + " email " + email + " cred " + credential);
    });
  }
  logout() {
    reFirebase.auth().signOut().then(() => {
      this.setState({ logout: false });
    }, function(error) {
      // An error happened.
    });
  }
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
              {this.state.logout
                ? <NavItem onClick={this.logout} href="">
                    Logout <Glyphicon glyph="log-out" /></NavItem>
                : <NavItem onClick={this.login} href="">
                    Login <Glyphicon glyph="transfer" /></NavItem>}
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
                    {this.state.logout
                    ? <Button onClick={this.logout} bsStyle="default">
                        Logout <Glyphicon glyph="log-out" /></Button>
                    : <Button onClick={this.login} bsStyle="primary">
                        Google Login <Glyphicon glyph="transfer" /></Button>}
                  </span>
                  &nbsp;&nbsp;
                  {this.state.logout
                    ? <span>
                        Welcome back
                        &nbsp;
                        <strong>{reFirebase.auth().currentUser.email}</strong>
                      </span>
                    : <span>Please login to add products to your cart</span>}
                </div>
              </Col>
            </Row>
          </Grid>
        </Well>
      </div>
    );
  }
}
