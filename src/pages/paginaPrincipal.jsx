import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProductCard from '../components/ProductCard';
import * as api from '../services/api';
import Category from '../components/Category';

export default class Principal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      productsArray: [],
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChoice = this.handleChoice.bind(this);
  }

  async handleSearch() {
    const { search } = this.state;
    const products = await api.getProductsByQuery(search);
    this.setState({ productsArray: products.results });
  }

  async handleChoice(categoryId) {
    const products = await api.getProductsByCategory(categoryId);
    this.setState({ productsArray: products.results });
  }

  onInputChange({ target }) {
    const { value } = target;
    this.setState({ search: value });
  }

  render() {
    const { productsArray } = this.state;
    const { handleAddToCart } = this.props;
    return (
      <div className="Topo-nav">
        <h4 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h4>
        <div className="search-input-cart">
          <Link
            ClassName="button-link"
            to="/shopping-cart"
            data-testid="shopping-cart-button"
          >
            &#128722;
            Carrinho de Compras
          </Link>

          <input
            className="pesquisa-product"
            type="text"
            data-testid="query-input"
            placeholder="Digite o produto desejado..."
            onChange={ this.onInputChange }
          />
          <button
            className="search-top-button"
            type="submit"
            data-testid="query-button"
            onClick={ this.handleSearch }
          >
            Pesquisar
          </button>
        </div>
        <Category handleChoice={ this.handleChoice } />
        {productsArray.length !== 0
          ? <ProductCard products={ productsArray } handleAddToCart={ handleAddToCart } />
          : <h2>Nenhum Produto Encontrado</h2>}
      </div>
    );
  }
}
Principal.propTypes = {
  handleAddToCart: PropTypes.func.isRequired,
};
