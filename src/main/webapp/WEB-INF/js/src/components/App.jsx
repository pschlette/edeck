// @flow
import React, { Component } from 'react';
import type { CardDetails, Deck } from 'flowTypes';
import { fetchKingdomCards } from 'deckActions';

import CardSelector from 'components/CardSelector';
import styles from './App.scss';

type appState = {
  cardDetails: ?Array<CardDetails>,
  deck: ?Deck
}

class App extends Component {
  state: appState = {
    cardDetails: null,
    deck: null,
  }

  componentWillMount() {
    fetchKingdomCards().then(response => {
      this.setState({ cardDetails: response.data });
    });
  }

  render() {
    return (
      <div className={styles.App}>
        <div className="row">
          <div className="col-8">
            <CardSelector
              allCardDetails={this.state.cardDetails || []}
              selectedCards={this.state.deck ? this.state.deck.cards : []}
            />
            <div>
              List of proposed cards goes here
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
