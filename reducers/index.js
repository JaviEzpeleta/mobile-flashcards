import { combineReducers } from "redux"
import { SAVE_SCROLL_POSITION, SET_DECKS, ADD_DECK } from "./../actions"
import { generateId } from "./../utils/utils"

function decks(
  state = {
    /*
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
    */
  },
  action
) {
  switch (action.type) {
    case SET_DECKS:
      return action.decks
    case ADD_DECK:
      let id = generateId()
      let newDeck = {
        key: id,
        name: action.deckName,
        author: "Javi"
      }
      let newState = state
      newState[id] = newDeck
      return newState
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
