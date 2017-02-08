// @flow
import type { DeckAction } from 'constants/deckActions';

export type CardName = string;

export type CardDetails = {
  name: CardName,
  cost: string,
  cardType: string,
  description: string,
  set: string
};

export type DeckEvent = {
  user: string,
  action: DeckAction,
  card: CardName,
  random: boolean,
};

export type Deck = {
  id: string,
  cards: Array<CardName>,
  history: Array<DeckEvent>
};
