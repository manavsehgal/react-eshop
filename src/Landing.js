import React, { Component } from 'react';
import ProductSummary from './ProductSummary';
import { Grid, Row, Col } from 'react-bootstrap';
import productsData from './products.json';
import { reDatabase } from './reFirebase';
import './Landing.css';

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productsData: JSON.parse(JSON.stringify(productsData)),
      firebase: false
    }
  }
  componentDidMount() {
    const getProducts = (snap) => {
      this.setState({
        productsData: snap.val(),
        firebase: true
      });
    };

    // Swap ref().once with ref().on for realtime catalog updates
    // Getting data once if obviously more performant, as app is
    // not polling for changes

    // reDatabase.ref('products').on('value', getProducts);
    reDatabase.ref('products').once('value').then(getProducts);
  }
  render() {
    const products = this.state.productsData;
    const productFeatured = Object.keys(products).map(key => {
      return (products[key].featured
        ? <ProductSummary
              key={key}
              id={key}
              name={products[key].name}
              summary={products[key].summary}
              price={products[key].price}
              marketPrice={products[key].market_price}
              link={products[key].link}
              thumb={this.state.firebase ? products[key].thumb : null}
              category={products[key].category}
              referral={products[key].referral}
              display="splash"
            />
        : null
      );
    });
    const productCatalog = Object.keys(products).map(key => {
      return (!products[key].featured
        ? <Col xs={12} md={6} lg={3} key={key}>
            <ProductSummary
              id={key}
              name={products[key].name}
              summary={products[key].summary}
              price={products[key].price}
              marketPrice={products[key].market_price}
              link={products[key].link}
              thumb={this.state.firebase ? products[key].thumb : null}
              category={products[key].category}
              referral={products[key].referral}
              display="card"
            />
          </Col>
        : null
      );
    });
    return (
      <div>
        <div className="Landing__featured">
          {productFeatured}
        </div>
        <Grid>
          <Row>{productCatalog}</Row>
        </Grid>
      </div>
    );
  }
}
