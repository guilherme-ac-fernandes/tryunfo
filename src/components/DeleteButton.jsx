import React from 'react';
import PropTypes from 'prop-types';

class DeleteButton extends React.Component {
  render() {
    const { deleteCard } = this.props;
    return (
      <button
        type="button"
        data-testid="delete-button"
        onClick={ () => deleteCard(index) }
      >
        Excluir
      </button>

    );
  }
}

DeleteButton.propTypes = {
  deleteCard: PropTypes.func.isRequired,
};

export default DeleteButton;
