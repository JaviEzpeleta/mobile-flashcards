import React, { Component } from "react"
import {
  Text,
  View,
  StyleSheet,
  Animated,
  TouchableOpacity
} from "react-native"
import { black, red } from "../utils/colors"
import { H1, H2 } from "nachos-ui"

export default class DeckInList extends Component {
  state = {
    fadeAnim: new Animated.Value(1) // Initial value for opacity: 0
  }

  componentDidMount() {}

  animate = () => {
    console.log("animating!")
    Animated.timing(
      // Animate over time
      this.state.fadeAnim, // The animated value to drive
      {
        toValue: 0, // Animate to opacity: 1 (opaque)
        duration: 1000 // Make it take a while
      }
    ).start()
  }
  render() {
    let { fadeAnim } = this.state

    const cardTitle = {
      color: black,
      fontWeight: "700"
    }

    const { name, questions } = this.props

    return (
      <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
        <TouchableOpacity onPress={() => this.animate()}>
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
