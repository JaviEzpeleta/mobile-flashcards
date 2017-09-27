import { combineReducers } from "redux"
import { SAVE_SCROLL_POSITION, SET_DECKS, ADD_QUESTION } from "./../actions"

function decks(state = {}, action) {
  switch (action.type) {
    case SET_DECKS:
      return action.decks
    case ADD_QUESTION:
      const newComment = {
        question: action.question,
        answer: action.answer,
        deckId: action.deckId
      }

      console.log("in de moment")
      console.log(state[action.deckId].questions)

      return {
        ...state,
        [action.deckId]: {
          ...state[action.deckId],
          comments: state[action.deckId].questions.push(newComment)
        }
      }

    default:
      return state
  }
}
function scrollPosition(state = 0, action) {
  switch (action.type) {
    case SAVE_SCROLL_POSITION:
      return action.position
    default:
      return state
  }
}
export default combineReducers({ decks, scrollPosition })
