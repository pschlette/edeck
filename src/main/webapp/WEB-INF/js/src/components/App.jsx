// @flow
import React, { Component } from 'react';
import type { CardDetails, Deck } from 'flowTypes';
import styles from './App.scss';

type appState = {
  cards: ?Array<CardDetails>,
  deck: ?Deck
}

class App extends Component {
  state = {
    cards: null,
    deck: null,
  }

  componentWillMount() {

  }

  render() {
    return (
      <div className={styles.App}>
        React apppp?
      </div>
    );
  }
}

export default App;
