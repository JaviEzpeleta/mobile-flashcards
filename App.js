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
import DeckDetailScreen from "./components/DeckDetailScreen"

const MainNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
    }
  },
  DeckDetail: {
    screen: DeckDetailScreen
  },
  NewDeck: {
    screen: NewDeckScreen
    /*
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
    */
  }
})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}
