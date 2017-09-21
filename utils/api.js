import { AsyncStorage } from "react-native"

export function fetchDecks() {
  return AsyncStorage.getItem("decks")
}

export function addDeck({ name }) {
  let uuid = "123"
  let decks = fetchDecks()
  decks.mergeItem({ key: uuid, name: name })
  return AsyncStorage.setItem("decks", decks)
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
