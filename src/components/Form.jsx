import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
  render() {
    const string = 'Você já tem um Super Trunfo em seu baralho';
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick } = this.props;

    return (
      <form className="card-form">
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
            className="input-description"
          />
        </label>

        <label htmlFor="attr1-input">
          Attr01:
          <input
            className="form-attr"
            name="cardAttr1"
            type="number"
            id="attr1-input"
            data-testid="attr1-input"
            value={ cardAttr1 }
            onChange={ onInputChange }
          />
        </label>

        <label htmlFor="attr2-input">
          Attr02:
          <input
            className="form-attr"
            name="cardAttr2"
            type="number"
            id="attr2-input"
            data-testid="attr2-input"
            value={ cardAttr2 }
            onChange={ onInputChange }
          />
        </label>

        <label htmlFor="attr3-input">
          Attr03:
          <input
            className="form-attr"
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
            className="form-select"
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
        <aside>
          {hasTrunfo ? (
            <p data-testid="trunfo-input">{ string }</p>
          ) : (
            <label htmlFor="trunfo-input" className="super-truynfo-label">
              <span>Super Trunfo</span>
              <input
                name="cardTrunfo"
                type="checkbox"
                id="trunfo-input"
                data-testid="trunfo-input"
                checked={ cardTrunfo }
                onChange={ onInputChange }
              />
            </label>)}
        </aside>

        <input
          type="button"
          value="Salvar"
          data-testid="save-button"
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
          className="forms-button"
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
