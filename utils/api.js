import { AsyncStorage } from "react-native"
import { generateId } from "./utils"

export function fetchDecks() {
  return AsyncStorage.getItem("decks")
}

export function addDeck({ name }) {
  let id = generateId()
  fetchDecks()
    .then(decks => {
      console.log(id)
      if (decks == null) {
        console.log("case 1")
        let decks = []
        decks[id] = { key: id, name: name, author: "Javi" }
        return AsyncStorage.setItem("decks", JSON.stringify(decks))
      } else {
        decks = JSON.parse(decks)
        console.log("case 2")
        console.log("decks that I have")
        console.log(decks)
      }
    })
    .catch(e => {
      console.log(e)
      console.log("catched here!")
    })
}
/*
export function removeEntry(key) {
  return AsyncStorage.getItem(CALENDAR_STORAGE_KEY).then(results => {
    const data = JSON.parse(results)
    data[key] = undefined
    delete data[key]
    AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
  })
}
*/
