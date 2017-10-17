import { AsyncStorage } from "react-native"
import { generateId, objectToArray } from "./utils"

const DECKS_STORAGE_KEY = "mobile-flashcards:decks"
const QUESTIONS_STORAGE_KEY = "mobile-flashcards:questions"
const LAST_SCREEN_VISITED_KEY = "mobile-flashcards:lastScreenVisitedKey"
const ONBOARDING_VISITED_KEY = "mobile-flashcards:onboardingVisitedKey"

export const clearAll = () => {
  AsyncStorage.clear()
    .then(() => {})
    .catch(e => {
      console.log(
        "Something went wrong while trying to clear all Storage data:"
      )
    })
}

export function fetchDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(decks => {
    return fetchQuestions().then(questions => {
      decks = JSON.parse(decks)
      let decksArray = objectToArray(decks)
      decksArray.map(function(deck) {
        let questionsArray = objectToArray(questions)
        let questionsForThisDeck = questionsArray.filter(question => {
          return question.deckId === deck.key
        })
        decks[deck.key].questions = questionsForThisDeck
      }, this)
      return decks
    })
  })
}

export function getUnboardingSeen() {
  return AsyncStorage.getItem(ONBOARDING_VISITED_KEY).then(seen => {
    return !!seen
  })
}

export function saveLastScreenVisited(value, id, points = 0, currentCard = 0) {
  return AsyncStorage.setItem(
    LAST_SCREEN_VISITED_KEY,
    JSON.stringify({
      page: value,
      id: id,
      points: points,
      currentCard: currentCard
    })
  )
}

export function saveOnboardingSeen() {
  return AsyncStorage.setItem(ONBOARDING_VISITED_KEY, JSON.stringify(true))
}

export function getLastScreenVisited() {
  return AsyncStorage.getItem(LAST_SCREEN_VISITED_KEY).then(item =>
    JSON.parse(item)
  )
}

export function fetchQuestions() {
  return AsyncStorage.getItem(QUESTIONS_STORAGE_KEY).then(questions =>
    JSON.parse(questions)
  )
}

export function addDeck(name) {
  let id = generateId()
  let newDeck = {
    name: name,
    key: id,
    created: new Date().getTime()
  }

  return fetchDecks().then(decks => {
    if (decks) {
      return AsyncStorage.mergeItem(
        DECKS_STORAGE_KEY,
        JSON.stringify({
          [id]: newDeck
        })
      )
    } else {
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

export function addQuestion(question, answer, deckId) {
  let id = generateId()
  let newQuestion = {
    question: question,
    answer: answer,
    deckId: deckId,
    created: new Date().getTime(),
    key: id
  }

  return fetchQuestions().then(questions => {
    if (questions) {
      return AsyncStorage.mergeItem(
        QUESTIONS_STORAGE_KEY,
        JSON.stringify({
          [id]: newQuestion
        })
      )
    } else {
      return AsyncStorage.setItem(
        QUESTIONS_STORAGE_KEY,
        JSON.stringify({
          [id]: newQuestion
        })
      )
    }
  })
}
