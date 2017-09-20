import React, { Component } from "react"
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  RefreshControl
} from "react-native"
import { H1, H2 } from "nachos-ui"
import { black, red } from "../utils/colors"
import styled from "styled-components/native"
import DeckInList from "./DeckInList"

export default class Main extends Component {
  state = {
    isRefreshing: false
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
            <DeckInList name={item.key} questions={item.questions} />
          </View>
        )}
      />
    )
  }
}
const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 30,
    margin: 2,
    borderColor: "#2a4944",
    borderWidth: 1,
    backgroundColor: "#d2f7f1"
  },
  container: {
    backgroundColor: "transparent",
    paddingLeft: 20,
    paddingRight: 20
  },
  viewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    flex: 1
  },
  iconText: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15
  },
  goalName: {
    textAlign: "center",
    marginTop: 40,
    marginBottom: 10,
    fontSize: 20
  },
  mainList: {
    paddingBottom: 130,
    marginBottom: 0
  }
})
