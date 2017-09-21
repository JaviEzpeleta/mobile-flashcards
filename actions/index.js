export const SET_DECKS = "SET_DECKS"
export const SAVE_SCROLL_POSITION = "SET_SCROLL_POSITION"

export function setDecks(decks) {
  return {
    type: SET_DECKS,
    decks
  }
}

export function saveScrollPosition(position) {
  return {
    type: SAVE_SCROLL_POSITION,
    position
  }
}
