import React from "react"
import { StyleSheet, Text, View, StatusBar, Dimensions } from "react-native"
import styled from "styled-components/native"
import { Button, Spinner } from "nachos-ui"
import reducer from "./reducers"
import { createStore } from "redux"
import { Provider } from "react-redux"
import { blue, black, white } from "./utils/colors"
import { Constants } from "expo"
import { connect } from "react-redux"
import HomeScreen from "./components/HomeScreen"
import { TabNavigator, StackNavigator } from "react-navigation"
import NewDeckScreen from "./components/NewDeckScreen"
import NewQuestionScreen from "./components/NewQuestionScreen"
import DeckDetailScreen from "./components/DeckDetailScreen"
import GameScene from "./components/GameScene"
import Flashcard from "./components/Flashcard"

const Left = goBack => (
  <TouchableHighlight onPress={goBack}>
    <Text> THIS SI JAVI</Text>
  </TouchableHighlight>
)

const MainNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
    }
  },
  DeckDetail: {
    screen: DeckDetailScreen,
    navigationOptions: {
      header: null
    }
  },
  NewQuestion: {
    screen: NewQuestionScreen
  },
  NewDeck: {
    screen: NewDeckScreen
  },
  Game: {
    screen: GameScene,
    navigationOptions: {
      header: null
    }
  }
})

export default class App extends React.Component {
  render() {
    const showFlashCard = false

    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          {showFlashCard && (
            <Flashcard
              question="LELELELELELE  UASD SADFU YSDUF YSDUF SDF ?"
              answer="LD SIDJ IDFG IHDSFG IHDFG "
              goNext={() => {
                return false
              }}
            />
          )}
          {!showFlashCard && <MainNavigator />}
        </View>
      </Provider>
    )
  }
}
