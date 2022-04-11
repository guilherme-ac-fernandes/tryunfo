import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

const inicialStatus = {
  cardName: '',
  cardDescription: '',
  cardAttr1: '0',
  cardAttr2: '0',
  cardAttr3: '0',
  cardImage: '',
  cardRare: 'normal',
  cardTrunfo: false,
  hasTrunfo: false,
  isSaveButtonDisabled: true,
  saveInfo: [],
};

class App extends React.Component {
  constructor() {
    super();
    this.state = (inicialStatus);
  }

  handleButtonStatus = () => {
    const { cardName, cardDescription, cardImage, cardRare } = this.state;
    const { cardAttr1, cardAttr2, cardAttr3, isSaveButtonDisabled } = this.state;
    const number1 = parseInt(cardAttr1, 10);
    const number2 = parseInt(cardAttr2, 10);
    const number3 = parseInt(cardAttr3, 10);
    const sumAttr = number1 + number2 + number3;
    const maxNumber = 90;
    const maxSum = 210;
    const zero = 0;

    const validation = {
      cardName: cardName.length > 0,
      cardDescription: cardDescription.length > 0,
      cardImage: cardImage.length > 0,
      cardRare: cardRare.length > 0,
      cardAttr1: cardAttr1 <= maxNumber,
      cardAttr2: cardAttr2 <= maxNumber,
      cardAttr3: cardAttr3 <= maxNumber,
      cardAttr1Zero: cardAttr1 >= zero,
      cardAttr2Zero: cardAttr2 >= zero,
      cardAttr3Zero: cardAttr3 >= zero,
      sumMax: sumAttr <= maxSum,
      sumMin: sumAttr >= zero,
    };

    // Verificação se tudo é valido
    if (Object.values(validation).every((item) => item === true)) {
      this.setState({
        isSaveButtonDisabled: false,
      });
    } else {
      this.setState({
        isSaveButtonDisabled: true,
      });
    }
    return isSaveButtonDisabled;
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => this.handleButtonStatus(value));
  }

  onSaveButtonClick = () => {
    const { saveInfo } = this.state;
    const object = { ...this.state };
    saveInfo.push(object);
    this.setState(inicialStatus);
  }

  render() {
    return (
      <div>
        <h1>Tryunfo </h1>
        <Form
          { ...this.state }
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <Card { ...this.state } />
      </div>
    );
  }
}

export default App;
