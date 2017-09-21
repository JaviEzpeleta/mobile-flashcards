import React, { Component } from "react"
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  RefreshControl,
  Animated
} from "react-native"
import { H1, H2 } from "nachos-ui"
import { black, red } from "../utils/colors"
import styled from "styled-components/native"
import DeckInList from "./DeckInList"
import { connect } from "react-redux"
import { saveScrollPosition } from "./../actions"

class DeckList extends Component {
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

  render() {
    const text = {
      margin: 15,
      marginBottom: 0,
      color: black,
      fontWeight: "700"
    }

    const myDecks = [
      { key: 1, name: "React Native", questions: 8 },
      { key: 2, name: "Atlético de Madrid", questions: 12 },
      { key: 3, name: "jQuery", questions: 28 },
      { key: 4, name: "CSS Modules", questions: 30 },
      { key: 5, name: "Javascript", questions: 10 },
      { key: 6, name: "JavEzp", questions: 10 },
      { key: 7, name: "mad4yu", questions: 10 }
    ]

    const { isRefreshing } = this.state

    return (
      <FlatList
        onScroll={this.handleScroll}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.refresh}
            title="Refreshing..."
            tintColor="transparent"
            titleColor="transparent"
          />
        }
        data={myDecks}
        style={styles.mainList}
        renderItem={({ item, key }) => (
          <View>
            {item.key === 1 && <H1 style={text}>Your Decks</H1>}
            <DeckInList
              deckIndex={item.key}
              name={item.name}
              questions={item.questions}
            />
          </View>
        )}
      />
    )
  }
}
const styles = StyleSheet.create({
  mainList: {
    paddingBottom: 130,
    marginBottom: 0
  }
})

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    saveScrollPosition: position => dispatch(saveScrollPosition(position))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)
