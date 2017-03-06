// @flow
import React from 'react';
import DeckActions from 'constants/deckActions';
import type { DeckEvent } from 'flowTypes';
import styles from './DeckHistory.scss';

type deckHistoryProps = {
  history: Array<DeckEvent>
};

const renderDeckEvent = (de: DeckEvent) => {
  const user = de.user || '???';
  const verbed = de.action === DeckActions.ADD ? 'added' : 'removed';
  const glueText = ` ${de.random ? 'randomly' : ''} ${verbed} by `;
  const itemClass = de.action === DeckActions.ADD ? styles.addItem : styles.removeItem;
  return (
    <li className={itemClass} key={de.timestamp}>
      <span className={styles.cardName}>{de.cardName}&nbsp;</span>
      <span>{glueText}</span>
      <span className={styles.user}>&nbsp;{user}</span>
    </li>
  );
};

export default class DeckHistory extends React.Component {
  props: deckHistoryProps

  render() {
    return (
      <div className={styles.deckHistory}>
        <ul className="list-group">
          { this.props.history.reverse().map(renderDeckEvent) }
        </ul>
      </div>
    );
  }
}
