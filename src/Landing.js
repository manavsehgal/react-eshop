import React, { Component } from 'react';
import ProductSummary from './ProductSummary';
import { Grid, Row, Col } from 'react-bootstrap';
import bookThumb from './book-mock.jpg';
import gigThumb from './gig-mock.jpg';
import productsData from './products.json';
import './Landing.css';

const products = JSON.parse(JSON.stringify(productsData));

export default class Landing extends Component {
  render() {
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
              thumb={products[key].category === 'Book' ? bookThumb : gigThumb}
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
              thumb={products[key].category === 'Book' ? bookThumb : gigThumb}
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
