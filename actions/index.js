export const SET_DECKS = "SET_DECKS"
export const ADD_QUESTION = "ADD_QUESTION"
export const SAVE_SCROLL_POSITION = "SET_SCROLL_POSITION"

export function setDecks(decks) {
  return {
    type: SET_DECKS,
    decks
  }
}
export function addQuestion(question, answer, deckId) {
  return {
    type: ADD_QUESTION,
    question,
    answer,
    deckId
  }
}
export function saveScrollPosition(position) {
  return {
    type: SAVE_SCROLL_POSITION,
    position
  }
}
