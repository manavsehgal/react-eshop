import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col, Well,
  Thumbnail, Button, Glyphicon, Badge }
  from 'react-bootstrap';
import './ProductSummary.css';

export default class ProductSummary extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    thumb: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    display: PropTypes.string.isRequired,
    referral: PropTypes.bool,
    link: PropTypes.string
  }
  static defaultProps = {
    link: '',
    referral: false
  }
  constructor(props) {
    super(props);
    this.state = { inCart: 0 }
    this.getProduct = this.getProduct.bind(this);
    this.productDetail = this.productDetail.bind(this);
  }
  // Product detail button event handler
  productDetail() {
    if (this.props.referral) {
      window.open(this.props.link);
    } else {
      alert(`Mock product detail for ${this.props.name}`);
    }
  }
  // Get Product button event handler
  getProduct() {
    if (this.props.referral) {
      window.open(this.props.link);
    } else {
      this.setState({ inCart: this.state.inCart + 1 });
    }
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
    const callToActionStyle =
      this.props.referral ? 'primary' : 'success';

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
        {this.props.referral ? 'Visit site ' : 'Add to cart '}
        {callToActionContent}
      </Button>

    // Render this for Product detail button
    let productDetailButton =
      <Button
        onClick={this.productDetail}
        bsStyle="default"
        bsSize={buttonSize}>
        <Glyphicon glyph="info-sign" />
      </Button>;

    // No product detail required for referral products
    productDetailButton = this.props.referral
      ? null
      : productDetailButton;

    // Render this for call-to-action buttons
    const buttons = <p>{getProductButton} {productDetailButton}</p>;

    // Render this for product thumb
    let productThumb =
      <Thumbnail
        href="#"
        onClick={this.productDetail}
        src={this.props.thumb}
        alt="{this.props.name}" />;

    // What to render as product summary - splash or card (default) style
    let renderProductSummary = '';

    if (this.props.display === 'splash') {
      renderProductSummary =
        <Grid>
          <Row>
            <Col xs={12} md={6}>
              {productThumb}
            </Col>
            <Col xs={12} md={6}>
              <h1>{this.props.name} <small>{this.props.category}</small></h1>
              <p>{this.props.description}</p>
              <h2 className="ProductSummary__price">
                ${this.props.price}
              </h2>
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
          <h4 className="ProductSummary__price">
            Price: ${this.props.price}
          </h4>
          <p>{this.props.description}</p>
          {buttons}
        </Well>;
    };
    return (renderProductSummary);
  }
}
