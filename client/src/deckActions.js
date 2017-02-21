// @flow
import axios from 'axios';
import type { AxiosPromise } from 'axios';
import type { CardDetails, Deck, CardName } from 'flowTypes';

declare var WEBPACK_API_BASE: string;

const API_BASE = WEBPACK_API_BASE;
const buildApiUrl = relativePath => `${API_BASE}/${relativePath}`;

export const createDeck = (): AxiosPromise<Deck> => {
  return axios.post(buildApiUrl('decks'));
};

export const fetchKingdomCards = (): AxiosPromise<Array<CardDetails>> => {
  return axios.get(buildApiUrl('cards'));
};

export const fetchDeck = (deckId: string): AxiosPromise<Deck> => {
  return axios.get(buildApiUrl(`decks/${deckId}.json`));
};

export const addCardToDeck = (cardName: CardName, deckId: string): AxiosPromise<Deck> => {
  return axios.post(buildApiUrl(`decks/${deckId}/add`), { cardName, user: 'unknown' });
};

export const removeCardFromDeck = (cardName: CardName, deckId: string): AxiosPromise<Deck> => {
  return axios.post(buildApiUrl(`decks/${deckId}/remove`), { cardName, user: 'unknown' });
};
