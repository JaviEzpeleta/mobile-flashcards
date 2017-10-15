import React, { Component } from "react"
import {
  Text,
  View,
  StyleSheet,
  Animated,
  TouchableOpacity
} from "react-native"
import { black, red } from "../utils/colors"

export default class DeckInList extends Component {
  state = {
    deckInListMarginBottom: new Animated.Value(200),
    fadeAnim: new Animated.Value(0), // Initial value for opacity: 0
    grow: new Animated.Value(1)
  }

  componentDidMount() {
    this.springDecks(this.props.deckIndex)
  }

  springDecks = deckIndex => {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 100 * deckIndex
    }).start()
    Animated.spring(this.state.deckInListMarginBottom, {
      toValue: 0,
      duration: 500
    }).start()
  }
  render() {
    let { fadeAnim, deckInListMarginBottom, grow } = this.state

    const cardTitle = {
      fontSize: 28,
      color: black,
      fontWeight: "800",
      marginBottom: 0,
      paddingBottom: 5
    }
    const questionsCount = {
      fontSize: 20,
      fontWeight: "200"
    }

    const { name, questions, deckIndex } = this.props

    return (
      <Animated.View
        style={[
          styles.card,
          {
            marginBottom: deckInListMarginBottom,
            transform: [{ scale: grow }],
            opacity: fadeAnim
          }
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("DeckDetail", {
              deckIndex: deckIndex
            })
          }}
        >
          <Text style={cardTitle}>{name}</Text>
          <Text style={questionsCount}>{questions} questions</Text>
        </TouchableOpacity>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    margin: 15,
    backgroundColor: "#fff",
    shadowOffset: { width: 0, height: 10 },
    shadowColor: "black",
    shadowRadius: 2,
    shadowOpacity: 0.2,
    padding: 15,
    paddingBottom: 25
  }
})
