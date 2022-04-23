import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import './App.css';

// Objeto contendo o status inicial dos estados
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
    // Inicialização do estado presente na constante acima
    this.state = (inicialStatus);
  }

  // Função que altera a situação do estado hasTrunfo que controle o checkbox do Super Trunfo
  hasCardTrunfo = () => {
    const { cardTrunfo } = this.state;
    if (cardTrunfo) this.setState({ hasTrunfo: true });
  }

  // Função que realiza todas as verificações dos input, caso todos sejam true o botão Salvar é habilitado
  handleButtonStatus = () => {
    // Toda vez que as verificações forem realizadas, a verificação do checkbox também será realizada
    this.hasCardTrunfo();

    // Desestrutura valores do estado
    const { cardName, cardDescription, cardImage, cardRare } = this.state;
    const { cardAttr1, cardAttr2, cardAttr3, isSaveButtonDisabled } = this.state;

    // Transforma string para número
    const number1 = parseInt(cardAttr1, 10);
    const number2 = parseInt(cardAttr2, 10);
    const number3 = parseInt(cardAttr3, 10);

    // Soma dos valores e valores constantes para comparação
    const sumAttr = number1 + number2 + number3;
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

    // Se todos os valores do objeto acima forem true, o botão será habilitado
    if (Object.values(validation).every((item) => item === true)) {
      this.setState({ isSaveButtonDisabled: false });
    } else {
      this.setState({ isSaveButtonDisabled: true });
    }

    // Retorna um booleano => se falso habilita, caso contrário, permanece desabilitado
    return isSaveButtonDisabled;
  }

  // Função que recebe os valores do input e atualiza no estado
  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState((old) => ({
      ...old, // espalha todos os valores presentes no antigo estado, depois atualiza
      [name]: value,
    }), () => this.handleButtonStatus(value));
    // Ao passar a função de verificação como segundo parâmetro, ela será exercutada após a alteração no setStage
  }

  // Função que salva as informações do card criado no array presente no estado
  // Observação: Anteriormente a resolução minha utilizada o método Arra.push de forma incorreto resultado no erro de múltiplos elementos como o mesmo id ou texto, a solução correta deste caso é apenas pela utilização do setStage (Resolução proveniente após a ajuda do instrutor Moisés Santana)
  onSaveButtonClick = () => {
    // Reseta os valores dos inputs
    this.setState((old) => ({
      ...inicialStatus, // espalha as informações do estado inicial
      hasTrunfo: old.hasTrunfo, // altera o estado do hasTrunfo para o anterior
      saveInfo: [...old.saveInfo, old], // junta as informações de todos os cards criados com o novo card no estado (presente dentro de old)
    }));
  }

  // Função que apaga um card criado
  deleteCard = (index) => {
    const { saveInfo } = this.state;
    // Armazena informação se esse card era Super Trunfo
    const validation = saveInfo[index].hasTrunfo;
    // Remove informação do array mediante ao index
    saveInfo.splice(index, 1);
    // Renderização do display card salvas alterando o array do estado
    this.setState({
      ...inicialStatus, // espalha as informações do estado inicial
      saveInfo: [...saveInfo], // retorna os cards já com o card removido
    });
    // Modificação do estado de Super Trunfo se validation for true
    if (validation) this.setState({ hasTrunfo: false });
  }

  render() {
    // Desestruturação dos estados necessários
    const { saveInfo, filterName, filterRare, filterTrunfo } = this.state;

    // Filtragem dos dados referente ao nome passado no input
    const nameFilter = saveInfo.filter((item) => {
      if (filterName === '') return true; // Default case - se não tiver nada no input
      return item.cardName.includes(filterName);
    });

    // Filtragem dos dados referente a raridade
    const rareFilter = nameFilter.filter((item) => {
      if (filterRare === 'todas') return true; // Default case - se tiver marcados "todas"
      return item.cardRare === filterRare;
    });

    // Filtragem dos dados referente a presente de Super Trunfo
    const trunfoFilter = rareFilter.filter(({ cardTrunfo }) => {
      if (filterTrunfo === false) return true;
      return cardTrunfo === true;
    });

    return (
      <main className="main-container">
        {/* <h1>Tryunfo</h1> */}
        <div>

          <section className="create-card-container">
            <div className="create-card-div">
              <h3>Adicionar nova carta</h3>
              <Form
                { ...this.state }
                onInputChange={ this.onInputChange }
                onSaveButtonClick={ this.onSaveButtonClick }
              />
            </div>

            <div className="visualization-div">
              <h3 className="title">Pré-visualização</h3>
              <Card { ...this.state } />
            </div>

          </section>

        </div>

        <section className="card-saved-container">
          {/* Seção que contém os filtros */}
          <div className="saved-form">
            <h3 className="all-card-title">Todas as cartas</h3>
            <h4 className="all-card-filter-title">Filtros de Busca</h4>
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
            <main>
              {trunfoFilter.map((item, index) => (
                <div key={ `container-key-${index}` } className="div-card-created">
                  <Card key={ `key-${index}` } { ...item } />
                  <input
                    type="button"
                    value="Excluir"
                    data-testid="delete-button"
                    onClick={ () => this.deleteCard(index) }
                  />
                </div>
              ))}
            </main>

          </section>
        </section>
      </main>
    );
  }
}

export default App;
