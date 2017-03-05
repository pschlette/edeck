// @flow
import React from 'react';
import DeckActions from 'constants/deckActions';
import type { DeckEvent } from 'flowTypes';

type deckHistoryProps = {
  history: Array<DeckEvent>
};

const renderDeckEvent = (de: DeckEvent) => {
  console.log(de.cardName);
  return (
    <div key={de.timestamp}>
      {de.user || 'Someone'} {de.random ? 'randomly' : '' }
      {de.action === DeckActions.ADD ? 'added' : 'removed'} {de.cardName}
    </div>
  )
};

export default class DeckHistory extends React.Component {
  props: deckHistoryProps

  render() {
    console.log(this.props.history);
    return (
      <div>
        <h2>History</h2>
        { this.props.history.map(renderDeckEvent) }
      </div>
    );
  }
}
