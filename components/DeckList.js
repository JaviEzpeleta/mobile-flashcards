import React, { Component } from "react"
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  Animated
} from "react-native"
import { H1, H2 } from "nachos-ui"
import { black, red } from "../utils/colors"
import styled from "styled-components/native"
import NoDecksScreen from "./NoDecksScreen"
import DeckInList from "./DeckInList"
import { connect } from "react-redux"
import { saveScrollPosition, setDecks } from "./../actions"
import { objectToArray } from "./../utils/utils"
import {
  fetchDecks,
  addDeck,
  clearAll,
  getLastScreenVisited
} from "../utils/api"

class DeckList extends Component {
  componentDidMount() {
    // clearAll()
    fetchDecks()
      .then(decks => {
        this.props.setDecks(decks)
        getLastScreenVisited().then(value => {
          if (value && value.page === "deckDetail") {
            this.props.navigation.navigate("DeckDetail", {
              deckIndex: value.id
            })
          }
          if (value && value.page === "GameScene") {
            this.props.navigation.navigate("Game", {
              deckKey: value.id
            })
          }
        })
      })
      .catch(e => {
        console.log(e)
      })
  }

  state = {
    isRefreshing: false,
    showUpOpacity: 0
  }

  animate = () => {
    Animated.timing(this.state.showUpOpacity, {
      toValue: 1,
      duration: 250
    }).start()
  }

  refresh = () => {
    this.setState({ isRefreshing: true })
    setTimeout(
      function() {
        this.hideLoading()
      }.bind(this),
      3000
    )
  }

  handleScroll = event => {
    this.props.saveScrollPosition(event.nativeEvent.contentOffset.y)
  }

  hideLoading = () => {
    this.setState({ isRefreshing: false })
  }

  sortDecksByChronologicalOrder(decks) {
    return decks.sort(function(a, b) {
      return a.created - b.created
    })
  }

  render() {
    const text = {
      margin: 15,
      marginBottom: 0,
      color: black,
      fontWeight: "700"
    }

    let { decks } = this.props
    const { isRefreshing } = this.state

    if (decks.length > 0) {
      decks = this.sortDecksByChronologicalOrder(decks)

      return (
        <FlatList
          onScroll={this.handleScroll}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={this.refresh}
              title="Refreshing..."
              tintColor="transparent"
              titleColor="transparent"
            />
          }
          data={decks}
          style={styles.mainList}
          renderItem={({ item, key }) => {
            return (
              <View>
                {item.key === 1 && <H1 style={text}>Your Decks</H1>}
                <DeckInList
                  navigation={this.props.navigation}
                  deckIndex={item.key}
                  name={item.name}
                  questions={item.questions.length}
                />
              </View>
            )
          }}
        />
      )
    } else {
      return <NoDecksScreen navigation={this.props.navigation} />
    }
  }
}
const styles = StyleSheet.create({
  mainList: {
    paddingBottom: 130,
    marginBottom: 0
  }
})

function mapStateToProps(state) {
  return {
    decks: objectToArray(state.decks)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setDecks: decks => dispatch(setDecks(decks)),
    saveScrollPosition: position => dispatch(saveScrollPosition(position))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)
