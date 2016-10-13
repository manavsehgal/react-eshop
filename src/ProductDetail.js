import React, { Component, PropTypes } from 'react';
import './ProductDetail.css';
import { Grid, Row, Col, Thumbnail, Glyphicon, Badge, Button }
  from 'react-bootstrap';
import bookThumb from './book-mock.jpg';
import gigThumb from './gig-mock.jpg';
import productsData from './products.json';
const products = JSON.parse(JSON.stringify(productsData));
import { reDatabase } from './reFirebase';

export default class ProductDetail extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props);
    this.state = { inCart: 0, checkoutTally: 0, product: null};
    this.getProduct = this.getProduct.bind(this);
  }
  componentWillMount() {
    const slug = this.props.params.slug;
    const id = slug.substring(slug.indexOf('--') + 2);
    this.setState({ product: products[id] });
  }
  componentDidMount() {
    const getProducts = (snap) => {
      const productsFirebase = snap.val();
      const slug = this.props.params.slug;
      const id = slug.substring(slug.indexOf('--') + 2);
      this.setState({
        product: productsFirebase[id],
        firebase: true
      });
    };
    reDatabase.ref('products').once('value').then(getProducts);
  }
  // Get product button event handler
  getProduct() {
    this.setState({
      inCart: this.state.inCart + 1,
      checkoutTally: Math.round((
        this.state.checkoutTally +
        this.state.product.price) * 100) / 100
    });
  }
  // View cart button event handler
  viewCart() {
    alert("View Cart");
  }
  // Checkout button event handler
  checkout() {
    alert("Checkout");
  }
  render() {
    let detail =
      <Grid>
        <h2>We could not find that product.</h2>
        <h3>Try searching or using the top navigation
          to find what you are looking for.</h3>
      </Grid>;

    if (this.state.product) {
      const mockThumb =
        this.state.product.category === 'Book' ? bookThumb : gigThumb;
      const productThumb =
        <Thumbnail
          href="#"
          src={this.state.product.thumb
            ? this.state.product.thumb : mockThumb}
          alt={this.state.product.name} />

      const price =
        <div className="ProductDetail__price">
          Price:&nbsp;
          <span className="ReactEshop__price">
            ${this.state.product.price}
          </span>
          {this.state.product.market_price
            ? <span className="ProductDetail__about-price">
                &nbsp;reduced from ${this.state.product.market_price}
              </span>
            : null}
        </div>;

      const bookDetail =
        <div className="ProductDetail__book-detail">
          <span>
            <Glyphicon glyph="book" />
            <b> Pages:</b> {this.state.product.pages}
          </span>
          <span>
            &nbsp;| <Glyphicon glyph="user" />&nbsp;
            <b>Reader Level:</b>&nbsp;
            {this.state.product.reader_level}
          </span>
        </div>;

      const gigDetail =
        <div className="ProductDetail__gig-detail">
          <span>
            <b>Duration:</b>&nbsp;
            {this.state.product.duration}
          </span>
          <span>
            &nbsp;| <b>Deliverable:</b>&nbsp;
            {this.state.product.deliverable}
          </span>
        </div>;

      // Display inCart quantity if not zero, otherwise display icon
      const callToActionContent = this.state.inCart
        ? <Badge>{this.state.inCart}</Badge>
        : <Glyphicon glyph="shopping-cart" />;

      // Display get product button
      const getProductButton =
        <Button
          onClick={this.getProduct}
          bsStyle="success"
          bsSize="large">
          Add to cart {callToActionContent}
        </Button>;

      // Display checkout button conditionally
      let checkoutButton = this.state.checkoutTally
        ? <span>
            <Button
              onClick={this.checkout}
              bsStyle="warning"
              bsSize="large">
              Buy <Badge>${this.state.checkoutTally}</Badge>
            </Button>
            &nbsp;
            <Button
              onClick={this.viewCart}
              bsStyle="default"
              bsSize="large">
              <Glyphicon glyph="shopping-cart" />
            </Button>
          </span>
        : null;

      // Display product detail
      detail =
        <Grid>
          <Row>
            <Col xs={12} md={4}>
              {productThumb}
            </Col>
            <Col xs={12} md={8}>
              <h1>
                {this.state.product.name}
                <small> {this.state.product.category}</small>
              </h1>
              {price}
              <p className="ProductDetail__summary">
                {this.state.product.summary}
              </p>
              {this.state.product.category ===
                'Book' ? bookDetail : null}
              {this.state.product.category ===
                'Gig' ? gigDetail : null}
              {getProductButton}
              &nbsp;
              {checkoutButton}
              <p className="ProductDetail__description">
                {this.state.product.description}
              </p>
            </Col>
          </Row>
        </Grid>;
    }

    return(
      <div>
        <div className="ReactEshop__nav-spacer" />
        {detail}
      </div>
    );
  }
}
