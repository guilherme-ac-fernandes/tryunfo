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

  hasCardTrunfo = () => {
    const { cardTrunfo } = this.state;
    if (cardTrunfo) {
      this.setState({
        hasTrunfo: true,
      });
    } else {
      this.setState({ hasTrunfo: false });
    }
  }

  handleButtonStatus = () => {
    this.hasCardTrunfo();
    // Desestrutura valores do estado
    const { cardName, cardDescription, cardImage, cardRare } = this.state;
    const { cardAttr1, cardAttr2, cardAttr3, isSaveButtonDisabled } = this.state;
    // Transforma string para número
    const number1 = parseInt(cardAttr1, 10);
    const number2 = parseInt(cardAttr2, 10);
    const number3 = parseInt(cardAttr3, 10);
    // Soma dos valores
    const sumAttr = number1 + number2 + number3;
    // Valores constantes para comparação
    const maxNumber = 90;
    const maxSum = 210;
    const zero = 0;

    // Objeto contendo as verificações
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

    // Se todos os valores do objeto acima for true, libera o botão
    if (Object.values(validation).every((item) => item === true)) {
      this.setState({ isSaveButtonDisabled: false });
    } else {
      this.setState({ isSaveButtonDisabled: true });
    }
    return isSaveButtonDisabled;
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => this.handleButtonStatus(value));
    // Ao passar a função de verificação como segundo parâmetro, ela será exercutada após a alteração no setStage
  }

  onSaveButtonClick = () => {
    // Destrutura estado contendo o array backup das cartas criadas
    const { saveInfo, hasTrunfo } = this.state;
    // Espalha o estado em um objeto para ser armazenado no array acima
    const objectToSave = { ...this.state };
    saveInfo.push(objectToSave);
    // Reseta os valores dos inputs
    const objectBackup = { ...inicialStatus };
    objectBackup.hasTrunfo = hasTrunfo;
    this.setState(objectBackup);
  }

  deleteCard = () => {

  }

  render() {
    const { saveInfo } = this.state;
    return (
      <div>
        <h1>Tryunfo </h1>
        <Form
          { ...this.state }
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <Card { ...this.state } />
        <section>
          {saveInfo.map((item, index) => (
            <>
              <Card key={ index } { ...item } />
              <button
                data-testid="delete-button"
                onClick={ this.deleteCard }
              >
                Excluir
              </button>
            </>
          ))}
        </section>
      </div>
    );
  }
}

export default App;
