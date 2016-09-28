import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col, Well, Thumbnail, Button, Glyphicon, Badge }
  from 'react-bootstrap';

export default class ProductSummary extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    thumb: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    display: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    marketPrice: PropTypes.number,
    referral: PropTypes.bool,
    link: PropTypes.string
  }
  static defaultProps = {
    marketPrice: 0,
    link: '',
    referral: false
  }
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props);

    this.state = { inCart: 0, checkoutTally: 0 }
    this.getProduct = this.getProduct.bind(this);
    this.productDetail = this.productDetail.bind(this);
    this.checkout = this.checkout.bind(this);
    this.viewCart = this.viewCart.bind(this);
  }
  slugify(text) {
    return text.toString().toLowerCase().trim()
    // Replace & with 'and'
    .replace(/&/g, '-and-')
     // Replace spaces, non-word characters and dashes with a single dash (-)
    .replace(/[\s\W-]+/g, '-')
  }
  // Product detail button event handler
  productDetail() {
    if (this.props.referral) {
      window.open(this.props.link);
    } else {
      const slug =
        `${this.slugify(this.props.name)}--${this.props.id}`;
      this.context.router.push(`detail/${slug}`);
    }
  }
  // Get Product button event handler
  getProduct() {
    if (this.props.referral) {
      window.open(this.props.link);
    } else {
      this.setState({
        inCart: this.state.inCart + 1,
        checkoutTally: Math.round((
          this.state.checkoutTally +
          this.props.price) * 100) / 100
      });
    }
  }
  viewCart() {
    alert("View Cart");
  }
  checkout() {
    alert("Checkout");
  }
  render() {
    // Different icon depending on Referral or Direct distribution
    const callToActionIcon = this.props.referral
      ? <Glyphicon glyph="globe" />
      : <Glyphicon glyph="shopping-cart" />;

    // Display inCart quantity if not zero, otherwise display icon
    const callToActionContent = this.state.inCart
      ? <Badge>{this.state.inCart}</Badge>
      : callToActionIcon;

    // Different color depending on Referral or Direct distribution
    const callToActionStyle = this.props.referral
      ? 'primary' : 'success';

    // Render this for Button bsSize
    let buttonSize = '';

    switch(this.props.display) {
        case 'splash': buttonSize = 'large'; break;
        case 'card': buttonSize = 'small'; break;
        // Handle future display targets
        default: buttonSize = 'small';
    }

    // Render this for Get Product button
    const getProductButton =
      <Button
        onClick={this.getProduct}
        bsStyle={callToActionStyle}
        bsSize={buttonSize}>
        {this.props.referral ? 'Visit ' : 'Add '}
        {callToActionContent}
      </Button>

    // Render this for Product detail button
    let productDetailButton =
      <Button
        onClick={this.productDetail}
        bsStyle="default"
        bsSize={buttonSize}>
        Detail <Glyphicon glyph="info-sign" />
      </Button>;

    // Render this for Checkout button
    let checkoutButton =
      <span>
        <Button
          onClick={this.checkout}
          bsStyle="warning"
          bsSize={buttonSize}>
          Buy <Badge>${this.state.checkoutTally}</Badge>
        </Button>
        &nbsp;
        <Button
          onClick={this.viewCart}
          bsStyle="default"
          bsSize={buttonSize}>
          <Glyphicon glyph="shopping-cart" />
        </Button>
      </span>

    // No product detail required for referral products
    productDetailButton = this.props.referral
      ? null
      : productDetailButton;

    // Render Checkout button conditionally
    productDetailButton = this.state.checkoutTally > 0
      ? checkoutButton
      : productDetailButton;

    // Render this for call-to-action buttons
    const buttons = <p>{getProductButton} {productDetailButton}</p>;

    // Render this for product thumb
    let productThumb =
      <Thumbnail
        href="#"
        onClick={this.productDetail}
        src={this.props.thumb}
        alt={this.props.name} />;

    // Render this for product summary - splash or card (default) style
    let renderProductSummary = '';

    if (this.props.display === 'splash') {
      renderProductSummary =
        <Grid>
          <Row>
            <Col xs={12} md={3}>
              {productThumb}
            </Col>
            <Col xs={12} md={9}>
              <h1>{this.props.name} <small>{this.props.category}</small></h1>
              <h3>{this.props.summary}</h3>
              <h3 className="ReactEshop__price">
                <span className="ReactEshop__price"> ${this.props.price}</span>
                &nbsp;
                {this.props.marketPrice
                  ? <span className="ReactEshop__market-price">
                      ${this.props.marketPrice}
                    </span>
                  : null}
              </h3>
              {buttons}
            </Col>
          </Row>
        </Grid>;
    };
    if (this.props.display === 'card') {
      renderProductSummary =
        <Well>
          {productThumb}
          <h2>{this.props.name} <small>{this.props.category}</small></h2>
          <h4>
            Price:
            <span className="ReactEshop__price"> ${this.props.price}</span>
            &nbsp;
            {this.props.marketPrice
              ? <span className="ReactEshop__market-price">
                  ${this.props.marketPrice}
                </span>
              : null}
          </h4>
          <p>{this.props.summary}</p>
          {buttons}
        </Well>;
    };
    return (renderProductSummary);
  }
}
