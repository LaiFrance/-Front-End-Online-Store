import React, { Component } from 'react';
import propTypes from 'prop-types';
import * as api from '../services/api';

class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: [],
    };
    this.apiCategory = this.apiCategory.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.apiCategory();
  }

  async handleClick({ target }) {
    const { handleChoice } = this.props;
    const { id } = target;
    await api.getProductsByCategory(id);
    await handleChoice(id);
  }

  async apiCategory() {
    const apiGetCategories = await api.getCategories();
    this.setState({ category: apiGetCategories });
  }

  render() {
    const { category } = this.state;
    return (
      <div>
        <form className="Side-nav">
          <h3 className="categorias">CATEGORIAS:</h3>
          {category.map(({ id, name }) => (
            <div className="input-label" key={ id }>
              <input
                id={ id }
                type="radio"
                value={ name }
                onChange={ this.handleClick }
                name="category"
                data-testid="category"
              />
              <label htmlFor="category">
                {name}
              </label>
            </div>
          ))}
        </form>

      </div>
    );
  }
}

Category.propTypes = {
  handleChoice: propTypes.func.isRequired,
};

export default Category;
