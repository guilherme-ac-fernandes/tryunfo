import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import './App.css';
import DeleteButton from './components/DeleteButton';

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
  filterName: '',
  filterRare: 'todas',
  filterTrunfo: false,
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
    inicialStatus.hasTrunfo = hasTrunfo;
    this.setState(inicialStatus);
  }

  deleteCard = (index) => {
    const { saveInfo } = this.state;

    // Armazena informação se esse card era Super Trunfo
    const validation = saveInfo[index].hasTrunfo;

    // Remove informação do array mediante ao index
    saveInfo.splice(index, 1);

    // Renderização do display card salvas alterando o array do estado
    this.setState({
      ...inicialStatus,
      saveInfo: [...saveInfo],
    });

    // Modificação do estado de Super Trunfo se validation for True
    if (validation) {
      this.setState((old) => ({
        ...old,
        hasTrunfo: false,
      }));
    }
  }

  render() {
    const { saveInfo, filterName, filterRare, filterTrunfo } = this.state;
    const nameFilter = saveInfo.filter((item) => {
      if (filterName === '') return true;
      return item.cardName.includes(filterName);
    });
    const rareFilter = nameFilter.filter((item) => {
      if (filterRare === 'todas') return true;
      return item.cardRare === filterRare;
    });
    const trunfoFilter = rareFilter.filter(({ cardTrunfo }) => {
      if (filterTrunfo === false) return true;
      return cardTrunfo === true;
    });
    return (
      <main className="main-container">
        <h1>Tryunfo </h1>
        <section className="create-card-container">
          <Form
            { ...this.state }
            onInputChange={ this.onInputChange }
            onSaveButtonClick={ this.onSaveButtonClick }
          />
          <Card { ...this.state } />
        </section>
        <section className="card-saved-container">
          {/* Seção que contém os filtros */}
          <div>
            <input
              type="text"
              name="filterName"
              data-testid="name-filter"
              value={ filterName }
              onChange={ this.onInputChange }
            />
            <select
              name="filterRare"
              data-testid="rare-filter"
              value={ filterRare }
              onChange={ this.onInputChange }
            >
              <option value="todas">Todas</option>
              <option value="normal">Normal</option>
              <option value="raro">Raro</option>
              <option value="muito raro">Muito Raro</option>
            </select>

            <label htmlFor="trunfo-filter">
              Super Trunfo
              <input
                name="filterTrunfo"
                type="checkbox"
                id="trunfo-filter"
                data-testid="trunfo-filter"
                checked={ filterTrunfo }
                onChange={ this.onInputChange }
              />
            </label>

          </div>

          <section className="card-created-container">
            {trunfoFilter.map((item, index) => (
              <div key={ `container-key-${index}` }>
                <Card key={ `key-${index}` } { ...item } />
                {/* <input
                type="button"
                value="Excluir"
                data-testid="delete-button"
                onClick={ () => this.deleteCard(index) }
                // Utilização do index como callback para encontrar qual card realizada com o auxílio do instrutor Summer Euller Braz
              /> */}
                <DeleteButton deleteCard={ () => this.deleteCard(index) } />
              </div>
            ))}
          </section>
        </section>

      </main>
    );
  }
}

export default App;
