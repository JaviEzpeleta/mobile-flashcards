import { combineReducers } from "redux"
import { SAVE_SCROLL_POSITION } from "./../actions"

function decks(state = {}, action) {
  switch (action.type) {
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
