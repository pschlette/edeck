// @flow
import React from 'react';
import type { CardName } from 'flowTypes';

type proposedCardsProps = {
  selectedCards: Array<CardName>,
  onRemoveCard: (cardName: CardName) => void
};

class ProposedCards extends React.Component {
  props: proposedCardsProps

  handleRemoveCard = (cardName: CardName) => {
    this.props.onRemoveCard(cardName);
  }

  render() {
    const { selectedCards } = this.props;
    return (
      <div className="row">
        <div className="col-12">
          <table className="table table-striped table-hover table-sm">
            <thead>
              <tr>
                <th>Card</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {
                selectedCards.map(card => (
                  <tr key={card}>
                    <td>{card}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => this.handleRemoveCard(card)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ProposedCards;
