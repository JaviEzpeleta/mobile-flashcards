import React, { Component } from "react"
import { Text, View, StyleSheet } from "react-native"
import { black, red } from "../utils/colors"
import { H1, H2 } from "nachos-ui"

export default class DeckInList extends Component {
  render() {
    const cardTitle = {
      color: black,
      fontWeight: "700"
    }

    const { name, questions } = this.props

    return (
      <View style={styles.card}>
        <H2 style={cardTitle}>{name}</H2>
        <Text>{questions} questions</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    margin: 15,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    shadowRadius: 5,
    shadowOpacity: 0.4,
    padding: 15,
    paddingBottom: 25
  }
})
