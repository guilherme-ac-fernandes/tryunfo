import React from 'react';

class Form extends React.Component {
  render() {
    return (
      <form>
        <label htmlFor="name-input">
          Nome da Carta:
          <input
            name="name"
            type="text"
            id="name-input"
            data-testid="name-input"
          />
        </label>

        <label htmlFor="description-input">
          Descrição da Carta:
          <textarea
            name="description"
            id="description-input"
            data-testid="description-input"
          />
        </label>

        <label htmlFor="attr1-input">
          Primeiro Atributo:
          <input
            name="attr1"
            type="number"
            id="attr1-input"
            data-testid="attr1-input"
          />
        </label>

        <label htmlFor="attr2-input">
          Segundo Atributo:
          <input
            name="attr2"
            type="number"
            id="attr2-input"
            data-testid="attr2-input"
          />
        </label>

        <label htmlFor="attr3-input">
          Terceiro Atributo:
          <input
            name="attr3"
            type="number"
            id="attr3-input"
            data-testid="attr3-input"
          />
        </label>

        <label htmlFor="image-input">
          Caminho para Imagem:
          <input
            name="image"
            type="text"
            id="image-input"
            data-testid="image-input"
          />
        </label>

        <label htmlFor="rare-input">
          Raridade:
          <select
            name="rare"
            id="rare-input"
            data-testid="rare-input"
          >
            <option value="normal">Normal</option>
            <option value="raro">Raro</option>
            <option value="muito raro">Muito Raro</option>
          </select>
        </label>

        <label htmlFor="trunfo-input">
          Super Trunfo
          <input
            name="trunfo"
            type="checkbox"
            id="trunfo-input"
            data-testid="trunfo-input"
          />
        </label>

        <input
          type="button"
          value="Salvar"
          data-testid="save-button"
        />
      </form>
    );
  }
}

export default Form;