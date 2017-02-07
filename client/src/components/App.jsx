import React from 'react';
import DeckEditor from 'components/DeckEditor';
import DeckCreator from 'components/DeckCreator';

type appState = {
  deckId: string
};

const extractDeckIdFromUrl = (): ?string => {
  const rawDeckId = window.location.pathname.split('/').pop();
  // I know, "technically" this is redundant bc empty string is false
  return (rawDeckId === '' || !rawDeckId) ? null : rawDeckId;
};

export default class App extends React.Component {
  state: appState = {
    deckId: extractDeckIdFromUrl(),
  }

  handleCreateDeck = () => {
    console.log('User wants to create a deck');
  }

  render() {
    const { deckId } = this.state;
    return (
      <div className="container">
        {
          deckId
          ? <DeckEditor deckId={deckId} />
          : <DeckCreator onCreateDeck={this.handleCreateDeck} />
        }
      </div>
    );
  }
}
