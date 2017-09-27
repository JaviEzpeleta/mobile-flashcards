import React, { Component } from "react"
import {
  Text,
  View,
  StyleSheet,
  Animated,
  TouchableOpacity
} from "react-native"
import { black, red } from "../utils/colors"
import { H2 } from "nachos-ui"

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

  animate = () => {
    /* disabled for now.. not working as I would expect...
    Animated.timing(this.state.grow, {
      toValue: 100,
      duration: 250
    }).start()
    */
  }
  render() {
    let { fadeAnim, deckInListMarginBottom, grow } = this.state

    const cardTitle = {
      color: black,
      fontWeight: "700"
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
            this.animate()
            this.props.navigation.navigate("DeckDetail", {
              deckIndex: deckIndex
            })
          }}
        >
          <H2 style={cardTitle}>{name}</H2>
          <Text>{questions} questions</Text>
        </TouchableOpacity>
      </Animated.View>
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
