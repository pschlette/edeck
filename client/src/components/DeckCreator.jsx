// @flow
import React from 'react';

type deckCreatorProps = {
  onCreateDeck: (randomCardsCount: number) => void
};

type deckCreatorState = {
  randomCardsCount: string
}

export default class DeckCreator extends React.Component {
  state: deckCreatorState = {
    randomCardsCount: '0',
  }
  props: deckCreatorProps

  handleRandomCardsCountChange = (event: any) => {
    this.setState({ randomCardsCount: event.target.value });
  }

  handleCreateDeck = () => {
    const parsedCount = parseInt(this.state.randomCardsCount, 10);
    const randomCardsCount = isNaN(parsedCount) ? 0 : parsedCount;
    this.props.onCreateDeck(randomCardsCount);
  }

  render() {
    return (
      <div className="row">
        <div className="form-inline">
          <div className="form-group mr-sm-4">
            <label htmlFor="randoCount" className="mr-sm-2">
              How many randos?
            </label>
            <input
              id="randoCount"
              className="form-control"
              type="number"
              min="0"
              max="50"
              size="2"
              value={this.state.randomCardsCount}
              onChange={this.handleRandomCardsCountChange}
            />
          </div>
          <div className="form-group">
            <button
              onClick={this.handleCreateDeck}
              className="btn btn-primary"
            >
              Create deck
            </button>
          </div>
        </div>
      </div>
    );
  }
}
