import React from 'react';
import PropTypes from 'prop-types';
import * as api from '../services/api';

export default class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      loading: false,
    };

    this.getProducts = this.getProducts.bind(this);
    this.renderCart = this.renderCart.bind(this);
    this.quantityCheck = this.quantityCheck.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  async getProducts() {
    const { cartItemsID } = this.props;
    const { products } = this.state;
    cartItemsID.forEach(async (id) => {
      this.setState({ loading: true });
      const product = await api.getProductsById(id);
      products.push(product);
      this.setState({ loading: false });
    });
  }

  quantityCheck(id) {
    const { cartItemsID } = this.props;
    const newArray = cartItemsID.filter((itemID) => itemID === id);
    return newArray.length;
  }

  renderCart() {
    const { products } = this.state;

    return products.length > 0 ? (
      products.map((item) => (
        <div className="product-cart-list" key={ item.id }>
          <img src={ item.thumbnail } alt="imagem do produto" />
          <h4 data-testid="shopping-cart-product-name">{`${item.title}`}</h4>
          <h4 data-testid="shopping-cart-product-quantity">
            {this.quantityCheck(item.id)}
          </h4>
        </div>
      ))
    ) : (
      <h4 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h4>
    );
  }

  render() {
    console.log('Execute 2');
    const { loading } = this.state;
    return (
      <div>
        { loading
          ? <h1>Carregando...</h1>
          : this.renderCart()}
      </div>
    );
  }
}
ShoppingCart.propTypes = {
  cartItemsID: PropTypes.arrayOf(PropTypes.string).isRequired,
};
