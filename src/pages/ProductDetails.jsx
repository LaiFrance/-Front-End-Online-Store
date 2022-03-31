import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsById } from '../services/api';
import Rating from '../components/Rating';

export default class ProductDetails extends Component {
  constructor() {
    super();

    this.state = {
      title: '',
      thumbnail: '',
      price: '',
    };
  }

  componentDidMount() {
    this.getProductsById();
  }

  async getProductsById() {
    const { match: { params: { id } } } = this.props;
    const { title, thumbnail, price } = await getProductsById(id);
    this.setState({ title, thumbnail, price });
  }

  render() {
    const { title, thumbnail, price } = this.state;
    const { handleAddToCart, match: { params: { id } } } = this.props;
    return (
      <div className="product-details">
        <div data-testid="product-detail-name">
          <h3>{title}</h3>
          <h3>{price}</h3>
          <img src={ thumbnail } alt={ title } />
        </div>

        <Link
          to="/shopping-cart"
          data-testid="shopping-cart-button"
        >
          Carrinho de Compras
        </Link>

        <button
          className="button-details"
          type="button"
          onClick={ handleAddToCart }
          id={ id }
          data-testid="product-detail-add-to-cart"
        >
          Adicionar ao carrinho
        </button>
        <Rating />
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string,
      thumbnail: propTypes.string,
      title: propTypes.string,
      price: propTypes.number,
    }),
  }).isRequired,
  handleAddToCart: propTypes.func.isRequired,
};
