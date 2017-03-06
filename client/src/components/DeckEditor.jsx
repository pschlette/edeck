// @flow
import React, { Component } from 'react';
import type { CardDetails, CardName, Deck } from 'flowTypes';
import { fetchDeck, addCardToDeck, removeCardFromDeck } from 'deckActions';

import CardSelector from 'components/CardSelector';
import NicknameSetter from 'components/NicknameSetter';
import ProposedCards from 'components/ProposedCards';
import DeckHistory from 'components/DeckHistory';

type deckEditorProps = {
  deckId: string,
  cardDetails: ?Array<CardDetails>,
};

type deckEditorState = {
  deck: ?Deck,
  nickname: ?string
};

const DECK_REFRESH_INTERVAL_MS: number = 2000;

class DeckEditor extends Component {
  state: deckEditorState = {
    deck: null,
    nickname: window.localStorage.edeckNickname || null,
  }

  componentWillMount() {
    this.getDeck();
    setInterval(this.getDeck, DECK_REFRESH_INTERVAL_MS);
  }

  getDeck = () => {
    fetchDeck(this.props.deckId).then((response) => {
      this.updateDeckState(response.data);
    });
  }

  props: deckEditorProps

  updateDeckState = (newDeckState: Deck) => {
    this.setState({ deck: newDeckState });
  }

  handleAddCard = (cardName: CardName) => {
    addCardToDeck(cardName, this.props.deckId, this.state.nickname).then(
      response => this.updateDeckState(response.data),
    );
  }

  handleRemoveCard = (cardName: CardName) => {
    removeCardFromDeck(cardName, this.props.deckId, this.state.nickname).then(
      response => this.updateDeckState(response.data),
    );
  }

  handleSaveNickname = (newNickname: ?string) => {
    window.localStorage.edeckNickname = newNickname || '';
    this.setState({ nickname: newNickname });
  }

  render() {
    const { cardDetails } = this.props;
    const { deck, nickname } = this.state;

    return (
      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col-6">
              {
                cardDetails ? (
                  <CardSelector
                    allCardDetails={cardDetails}
                    selectedCards={deck ? deck.cards : []}
                    onAddCard={this.handleAddCard}
                  />
                ) : null
              }
            </div>
            <div className="col-4">
              <NicknameSetter
                currentNickname={nickname}
                onSaveNickname={this.handleSaveNickname}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              {
                deck ? (
                  <ProposedCards
                    selectedCards={deck.cards}
                    onRemoveCard={this.handleRemoveCard}
                  />
                ) : null
              }
            </div>
            <div className="col-4">
              <DeckHistory history={deck ? deck.history : []} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DeckEditor;
