import React, { Component } from "react"
import { Text, View } from "react-native"
import DeckSwiper from "./DeckSwiper"

export default class GameScene extends Component {
  render() {
    return (
      <View>
        <DeckSwiper />
      </View>
    )
  }
}
