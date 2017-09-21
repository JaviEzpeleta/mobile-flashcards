import { AsyncStorage } from "react-native"
import { generateId } from "./utils"

const DECKS_STORAGE_KEY = "mobile-flashcards:decks"

export const clearAll = () => {
  AsyncStorage.clear()
    .then(() => {
      console.log("ALL AsyncStorage data cleared!")
    })
    .catch(e => {
      console.log(
        "Something went wrong while trying to clear all Storage data:"
      )
      console.log(e)
    })
}

export function fetchDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(decks =>
    JSON.parse(decks)
  )
}

export function addDeck(name) {
  let id = generateId()
  let newDeck = {
    name: name,
    key: id
  }

  return fetchDecks().then(decks => {
    if (decks) {
      console.log("CASE 1")

      return AsyncStorage.mergeItem(
        DECKS_STORAGE_KEY,
        JSON.stringify({
          [id]: newDeck
        })
      )
    } else {
      console.log("CASE 2")
      return AsyncStorage.setItem(
        DECKS_STORAGE_KEY,
        JSON.stringify({
          [id]: newDeck
        })
      )
    }
  })
}

export function removeDeck(key) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(results => {
    const decks = JSON.parse(results)
    decks[key] = undefined
    delete decks[key]
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
  })
}
