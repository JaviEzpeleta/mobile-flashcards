import { combineReducers } from "redux"
import { SAVE_SCROLL_POSITION, SET_DECKS } from "./../actions"

function decks(
  state = {
    "1": {
      key: 1,
      name: "Altético de Madrid",
      author: "Javi"
    },
    "2": {
      key: 2,
      name: "Mi Futurro Perro",
      author: "Javi"
    },
    "3": {
      key: 3,
      name: "mad4Yu",
      author: "Javi"
    }
  },
  action
) {
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
