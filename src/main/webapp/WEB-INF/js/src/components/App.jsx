// @flow
import React, { Component } from 'react';
import type { CardDetails, CardName, Deck } from 'flowTypes';
import { fetchKingdomCards, fetchDeck } from 'deckActions';

import CardSelector from 'components/CardSelector';
import ProposedCards from 'components/ProposedCards';
import styles from './App.scss';

type appProps = {
  deckId: string
};

type appState = {
  cardDetails: ?Array<CardDetails>,
  deck: ?Deck
}

class App extends Component {
  props: appProps;

  state: appState = {
    cardDetails: null,
    deck: null,
  }

  getKingdomCards = () => {
    fetchKingdomCards().then(response => {
      this.setState({ cardDetails: response.data });
    });
  }

  getDeck = () => {
    fetchDeck(this.props.deckId).then(response => {
      this.setState({ deck: response.data });
    });
  }

  componentWillMount() {
    this.getKingdomCards();
    this.getDeck();
  }

  handleAddCard(cardName: CardName) {
    console.log(`request to add card '${cardName}'`);
  }

  handleRemoveCard(cardName: CardName) {
    console.log(`request to remove card '${cardName}'`);
  }

  render() {
    return (
      <div className={styles.App}>
        <div className="row">
          <div className="col-8">
            {
              this.state.cardDetails ? (
                <CardSelector
                  allCardDetails={this.state.cardDetails}
                  selectedCards={this.state.deck ? this.state.deck.cards : []}
                  onAddCard={this.handleAddCard}
                />
              ) : null
            }
            {
              this.state.deck ? (
                <ProposedCards
                  selectedCards={this.state.deck.cards}
                  onRemoveCard={this.handleRemoveCard}
                />
              ) : null
            }
          </div>
          <div className="col-4">
            Card inspector goes here
          </div>
        </div>
      </div>
    );
  }
}

export default App;
