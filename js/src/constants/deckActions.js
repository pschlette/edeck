const deckActions = {
  ADD: 'add',
  REMOVE: 'remove',
};

type DeckAction = $Keys<typeof deckActions>;

export default deckActions;
