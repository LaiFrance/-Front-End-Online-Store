import React, { Component } from 'react';

export default class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rate1: 1,
      rate2: 2,
      rate3: 3,
      rate4: 4,
      rate5: 5,
      data: [],
      email: '',
      textContent: '',
      rating: '',
    };
  }

  componentDidMount() {
    this.pegarAvaliacoes();
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const { value } = target;
    this.setState({
      [name]: value,
    });
  };

  guardaDados = () => {
    const { data, email, textContent, rating } = this.state;
    const evaluationObj = { email, textContent, rating };
    this.setState({
      data: [...data, evaluationObj],
    }, this.armazenaAvaliacoes);
  }

  armazenaAvaliacoes = () => {
    const { data } = this.state;
    const converteString = JSON.stringify(data);
    localStorage.setItem('key', converteString);
  }

  pegarAvaliacoes = () => {
    const evaluations = localStorage.getItem('key');
    if (evaluations !== null) {
      const { data } = this.state;
      const evaluationArray = JSON.parse(evaluations);
      this.setState({
        data: [...data, ...evaluationArray],
      });
    }
  }

  render() {
    const { rate1, rate2, rate3, rate4, rate5, data } = this.state;
    return (
      <div>
        <label htmlFor="input-email">
          <input
            type="text"
            data-testid="product-detail-email"
            name="email"
            placeholder="E-mail"
            id="input-email"
            onChange={ this.onInputChange }
          />
        </label>
        <div className="rating-container">
          <input
            type="radio"
            className="rating"
            name="rating"
            value="1"
            data-testid={ `${rate1}-rating` }
            onChange={ this.onInputChange }
          />
          1
          <input
            type="radio"
            className="rating"
            name="rating"
            value="2"
            data-testid={ `${rate2}-rating` }
            onChange={ this.onInputChange }
          />
          2
          <input
            type="radio"
            className="rating"
            name="rating"
            value="3"
            data-testid={ `${rate3}-rating` }
            onChange={ this.onInputChange }
          />
          3
          <input
            type="radio"
            className="rating"
            name="rating"
            value="4"
            data-testid={ `${rate4}-rating` }
            onChange={ this.onInputChange }
          />
          4
          <input
            type="radio"
            className="rating"
            name="rating"
            value="5"
            data-testid={ `${rate5}-rating` }
            onChange={ this.onInputChange }
          />
          5
        </div>
        <div />
        <div className="text-container">
          <label
            htmlFor="textarea"
            className="textarea"
          >
            <textarea
              data-testid="product-detail-evaluation"
              cols="30"
              rows="5"
              name="textContent"
              maxLength="100"
              placeholder="Escreva uma descrição da sua avaliação"
              onChange={ this.onInputChange }
            />
          </label>
          <button
            className="button-detail"
            type="button"
            data-testid="submit-review-btn"
            onClick={ this.guardaDados }
          >
            Enviar
          </button>
        </div>
        {data
          .map((evaluation) => (
            <div key={ evaluation.email }>
              <p>
                {evaluation.email}
              </p>
              <p>
                {evaluation.textContent}
              </p>
              <p>
                {evaluation.rating}
              </p>
            </div>))}
      </div>
    );
  }
}
