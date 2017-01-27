import React from 'react';
import _sortBy from 'lodash/sortBy';
import type { CardDetails, CardName } from 'flowTypes';

type cardSelectorProps = {
  allCardDetails: Array<CardDetails>,
  selectedCards: Array<CardName>,
  onAddCard: (addedCard: CardName) => void
};

type cardSelectorState = {
  selectedCard: ?CardName
};

class CardSelector extends React.Component {
  props: cardSelectorProps
  state: cardSelectorState = {
    selectedCard: null,
  }

  handleAddButtonClick = () => {
    const { selectedCard } = this.state;
    if (selectedCard) this.props.onAddCard(selectedCard);
  }

  handleChangeSelectedCard = e => {
    this.setState({ selectedCard: e.target.value });
  }

  render() {
    const { allCardDetails, selectedCards } = this.props;
    const { selectedCard } = this.state;

    const availableCardDetails = allCardDetails.filter(cd => !selectedCards.includes(cd.name));
    const visibleCardDetails = _sortBy(availableCardDetails, cd => cd.name);

    return (
      <div className="row">
        <div className="col-10">
          <select
            className="form-control"
            value={selectedCard || ''}
            onChange={this.handleChangeSelectedCard}
          >
            {
              visibleCardDetails.map(cd => {
                return (
                  <option
                    key={cd.name}
                    value={cd.name}
                  >
                    {cd.name}
                  </option>
                );
              })
            }
          </select>
        </div>
        <div className="col-2">
          <button
            disabled={!selectedCard}
            className="btn btn-primary"
            onClick={this.handleAddButtonClick}
          >
            Add
          </button>
        </div>
      </div>
    );
  }
}

export default CardSelector;
