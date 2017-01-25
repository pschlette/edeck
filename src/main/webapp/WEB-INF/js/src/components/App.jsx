// @flow
import React, { Component } from 'react';
import type { CardDetails, CardName, Deck } from 'flowTypes';
import { fetchKingdomCards, fetchDeck } from 'deckActions';

import CardSelector from 'components/CardSelector';
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

  componentWillMount() {
    fetchKingdomCards().then(response => {
      this.setState({ cardDetails: response.data });
    });

    fetchDeck(this.props.deckId).then(response => {
      this.setState({ deck: response.data });
    });
  }

  handleAddCard(cardName: CardName) {
    console.log(`request to add card '${cardName}'`);
  }

  render() {
    return (
      <div className={styles.App}>
        <div className="row">
          <div className="col-8">
            <CardSelector
              allCardDetails={this.state.cardDetails || []}
              selectedCards={this.state.deck ? this.state.deck.cards : []}
              onAddCard={this.handleAddCard}
            />
            <div className="row">
              <div className="col-12">
                List of proposed cards for {this.props.deckId} goes here
              </div>
            </div>
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
