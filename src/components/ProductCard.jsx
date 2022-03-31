import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ProductCard extends React.Component {
  render() {
    const { products, handleAddToCart } = this.props;
    return (
      <div className="products-list">
        {products.map((product) => (
          <div className="product-detaisls" key={ product.id } data-testid="product">
            <img src={ product.thumbnail } alt="imagem do produto" />
            <h4>{`${product.title}`}</h4>
            <span className="price">{`R$ ${product.price}`}</span>
            <Link
              to={ `/product-details/${product.id}` }
              data-testid="product-detail-link"
            >
              Detalhes

            </Link>

            <button
              className="button-add"
              type="button"
              data-testid="product-add-to-cart"
              onClick={ handleAddToCart }
              id={ product.id }
            >
              Adicionar ao carrinho
            </button>
          </div>
        ))}
      </div>
    );
  }
}

ProductCard.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
  })).isRequired,
  handleAddToCart: PropTypes.func.isRequired,
};
