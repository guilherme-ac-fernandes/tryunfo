import React from 'react';

class Card extends React.Component {
  render() {
    const { cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3, cardImage, cardRare, cardTrunfo } = this.props;
    return (
      <section>
        <h3 data-testid="name-card">{ cardName }</h3>
        <img data-testid="image-card" src={ cardImage } alt={ cardName } />
        <p data-testid="description-card">{ cardDescription }</p>
        <p data-testid="attr1-card">{ cardAttr1 }</p>
        <p data-testid="attr2-card">{ cardAttr2 }</p>
        <p data-testid="attr3-card">{ cardAttr3 }</p>
        <h4 data-testid="rare-card">{ cardRare }</h4>
        { cardTrunfo ? <p data-testid="trunfo-card">Super Trunfo</p> : '' }
      </section>
    );
  }
}

export default Card;
