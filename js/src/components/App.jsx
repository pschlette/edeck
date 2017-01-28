// @flow
import React, { Component } from 'react';
import type { CardDetails, CardName, Deck } from 'flowTypes';
import { fetchKingdomCards, fetchDeck, addCardToDeck, removeCardFromDeck } from 'deckActions';

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

const DECK_REFRESH_INTERVAL_MS: number = 2000;

class App extends Component {
  state: appState = {
    cardDetails: null,
    deck: null,
  }

  componentWillMount() {
    this.getKingdomCards();
    this.getDeck();

    setInterval(this.getDeck, DECK_REFRESH_INTERVAL_MS);
  }

  getKingdomCards = () => {
    fetchKingdomCards().then((response) => {
      this.setState({ cardDetails: response.data });
    });
  }

  getDeck = () => {
    fetchDeck(this.props.deckId).then((response) => {
      this.updateDeckState(response.data);
    });
  }

  props: appProps;

  updateDeckState = (newDeckState: Deck) => {
    this.setState({ deck: newDeckState });
  }

  handleAddCard = (cardName: CardName) => {
    addCardToDeck(cardName, this.props.deckId).then(
      response => this.updateDeckState(response.data),
    );
  }

  handleRemoveCard = (cardName: CardName) => {
    removeCardFromDeck(cardName, this.props.deckId).then(
      response => this.updateDeckState(response.data),
    );
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
