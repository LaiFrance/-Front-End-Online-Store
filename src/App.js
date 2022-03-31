import React from 'react';
import './App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Principal from './pages/paginaPrincipal';
import ShoppingCart from './pages/shoppingCard';
import ProductDetails from './pages/ProductDetails';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      cartItemsID: [],
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  handleAddToCart({ target }) {
    const { id } = target;
    const { cartItemsID } = this.state;
    cartItemsID.push(id);
    const newArray = cartItemsID;
    this.setState({ cartItemsID: newArray });
  }

  render() {
    const { cartItemsID } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Principal handleAddToCart={ this.handleAddToCart } />
          </Route>
          <Route exact path="/shopping-cart">
            <ShoppingCart cartItemsID={ cartItemsID } />
          </Route>
          <Route
            exact
            path="/product-details/:id"
            render={ (props) => (<ProductDetails
              { ...props }
              handleAddToCart={ this.handleAddToCart }
            />) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
