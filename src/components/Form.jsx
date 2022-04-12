import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
  render() {
    const string = 'Você já tem um Super Trunfo em seu baralho';
    const { cardName, cardDescription } = this.props;
    const { cardAttr1, cardAttr2, cardAttr3 } = this.props;
    const { cardImage, cardRare, cardTrunfo } = this.props;
    const { hasTrunfo } = this.props;
    const { isSaveButtonDisabled, onInputChange, onSaveButtonClick } = this.props;

    return (
      <form>
        <label htmlFor="name-input">
          Nome da Carta:
          <input
            name="cardName"
            type="text"
            id="name-input"
            data-testid="name-input"
            value={ cardName }
            onChange={ onInputChange }
          />
        </label>

        <label htmlFor="description-input">
          Descrição da Carta:
          <textarea
            name="cardDescription"
            id="description-input"
            data-testid="description-input"
            value={ cardDescription }
            onChange={ onInputChange }
          />
        </label>

        <label htmlFor="attr1-input">
          Primeiro Atributo:
          <input
            name="cardAttr1"
            type="number"
            id="attr1-input"
            data-testid="attr1-input"
            value={ cardAttr1 }
            onChange={ onInputChange }
          />
        </label>

        <label htmlFor="attr2-input">
          Segundo Atributo:
          <input
            name="cardAttr2"
            type="number"
            id="attr2-input"
            data-testid="attr2-input"
            value={ cardAttr2 }
            onChange={ onInputChange }
          />
        </label>

        <label htmlFor="attr3-input">
          Terceiro Atributo:
          <input
            name="cardAttr3"
            type="number"
            id="attr3-input"
            data-testid="attr3-input"
            value={ cardAttr3 }
            onChange={ onInputChange }
          />
        </label>

        <label htmlFor="image-input">
          Caminho para Imagem:
          <input
            name="cardImage"
            type="text"
            id="image-input"
            data-testid="image-input"
            value={ cardImage }
            onChange={ onInputChange }
          />
        </label>

        <label htmlFor="rare-input">
          Raridade:
          <select
            name="cardRare"
            id="rare-input"
            data-testid="rare-input"
            value={ cardRare }
            onChange={ onInputChange }
          >
            <option value="normal">Normal</option>
            <option value="raro">Raro</option>
            <option value="muito raro">Muito Raro</option>
          </select>
        </label>

        {/* Correção da formatação da Renderização Condicional proveniente da dúvida respondida no slack da Trybe pelo instrutor Ícaro Harry da turma 11 (link: https://trybecourse.slack.com/archives/C01LCSLCZ8D/p1620168128455200) */}
        {hasTrunfo ? (
          <p data-testid="trunfo-input">{ string }</p>
        ) : (
          <label htmlFor="trunfo-input">
            Super Trunfo
            <input
              name="cardTrunfo"
              type="checkbox"
              id="trunfo-input"
              data-testid="trunfo-input"
              checked={ cardTrunfo }
              onChange={ onInputChange }
            />
          </label>)}

        <input
          type="button"
          value="Salvar"
          data-testid="save-button"
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
        />
      </form>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
};

export default Form;
