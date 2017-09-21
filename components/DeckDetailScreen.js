import React, { Component } from "react"
import { Text, View } from "react-native"
import { connect } from "react-redux"

class DeckDetailScreen extends Component {
  render() {
    console.log("IN DECK DETAIL")
    console.log(this.props)

    const { deck } = this.props

    return (
      <View>
        <Text> DeckDetailScreen!!! [ {deck.name} ]</Text>
      </View>
    )
  }
}

function mapStateToProps(state, { navigation }) {
  const { deckIndex } = navigation.state.params

  return {
    deckIndex,
    deck: state.decks[deckIndex]
  }
}

export default connect(mapStateToProps)(DeckDetailScreen)
