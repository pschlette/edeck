import React from 'react';

type deckCreatorProps = {
  onCreateDeck: () => void
};

export default class DeckCreator extends React.Component {
  props: deckCreatorProps

  render() {
    return (
      <div className="row">
        <div className="col">
          <button
            onClick={this.props.onCreateDeck}
            className="btn btn-primary"
          >
            Create deck
          </button>
        </div>
      </div>
    );
  }
}
