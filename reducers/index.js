import { combineReducers } from "redux"
import { SAVE_SCROLL_POSITION, SET_DECKS } from "./../actions"

function decks(state = {}, action) {
  switch (action.type) {
    case SET_DECKS:
      return action.decks
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
