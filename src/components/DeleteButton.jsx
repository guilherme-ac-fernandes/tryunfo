import React from 'react';
import PropTypes from 'prop-types';

class DeleteButton extends React.Component {
  render() {
    const { deleteCard } = this.props;
    return (
      <button data-testid="delete-button" onClick={ deleteCard }>
        Excluir
      </button>
    );
  }
}

DeleteButton.prototype = {
  deleteCard: PropTypes.func.isRequired,
};

export default DeleteButton;
