export const RECEIVE_DECKS = "RECEIVE_DECKS"
export const ADD_DECK = "ADD_DECK"
export const SAVE_SCROLL_POSITION = "SET_SCROLL_POSITION"

export function receiveDecks(decks) {
  return {
    type: RECEIVE_RECKS,
    decks
  }
}

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck
  }
}

export function saveScrollPosition(position) {
  return {
    type: SAVE_SCROLL_POSITION,
    position
  }
}
