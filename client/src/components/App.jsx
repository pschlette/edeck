// @flow
import React from 'react';
import DeckEditor from 'components/DeckEditor';
import DeckCreator from 'components/DeckCreator';

import { createDeck, fetchKingdomCards } from 'deckActions';

import type { CardDetails } from 'flowTypes';

type appState = {
  deckId: ?string,
  cardDetails: ?Array<CardDetails>,
};

const extractDeckIdFromUrl = (): ?string => {
  const rawDeckId = window.location.pathname.split('/').pop();
  // I know, "technically" this is redundant bc empty string is false
  return (rawDeckId === '' || !rawDeckId) ? null : rawDeckId;
};

export default class App extends React.Component {
  state: appState = {
    deckId: extractDeckIdFromUrl(),
    cardDetails: null,
  }

  componentWillMount() {
    fetchKingdomCards().then((response) => {
      this.setState({ cardDetails: response.data });
    });
  }

  handleCreateDeck = () => {
    createDeck().then((response) => {
      const deckId: string = response.data.id;
      // Add the newly created deck's ID to the page's url so the user can share it
      history.pushState(null, '', `/${deckId}`);
      this.setState({ deckId });
    });
  }

  render() {
    const { deckId, cardDetails } = this.state;

    return (
      <div className="container">
        {
          deckId
          ? (
            <DeckEditor
              deckId={deckId}
              cardDetails={cardDetails}
            />
          )
          : <DeckCreator onCreateDeck={this.handleCreateDeck} />
        }
      </div>
    );
  }
}
