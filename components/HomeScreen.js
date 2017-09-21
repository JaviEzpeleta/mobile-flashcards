import React, { Component } from "react"
import { StyleSheet, Text, View, StatusBar, Dimensions } from "react-native"
import styled from "styled-components/native"
import { Button, Spinner } from "nachos-ui"
import DeckList from "./DeckList"
import { blue, black, white } from "./../utils/colors"
import { Constants } from "expo"
import { connect } from "react-redux"

function MFStatusBar({ backgroundColor, ...props }) {
  return (
    <View
      style={{
        backgroundColor,
        height: Constants.statusBarHeight
      }}
    >
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const HomeScreenStyledComponent = styled.View`
  flex: 1;
  backgroundColor: ${blue};
`

const HomeFooterStyledComponent = styled.View`
  height: 40;
  backgroundColor: ${white};
  alignItems: flex-end;
  justifyContent: center;
`
class HomeScreen extends Component {
  state = {
    listScrollPosition: 0
  }

  render() {
    const newDeckButton = {
      width: 160,
      margin: 5,
      alignItems: "center",
      justifyContent: "center",
      height: 30,
      backgroundColor: blue,
      borderRadius: 6
    }

    const { listScrollPosition } = this.props

    return (
      <HomeScreenStyledComponent>
        <MFStatusBar backgroundColor={blue} barStyle="dark-content" />

        <View
          style={{
            position: "absolute",
            width: Dimensions.get("window").width,
            height: 100,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {listScrollPosition < 0 && <Spinner />}
        </View>
        <DeckList navigation={this.props.navigation} />
        <HomeFooterStyledComponent>
          <Button
            textStyle={{ color: black }}
            style={newDeckButton}
            onPress={() => this.props.navigation.navigate("NewDeck", {})}
          >
            + New Deck
          </Button>
        </HomeFooterStyledComponent>
      </HomeScreenStyledComponent>
    )
  }
}

function mapStateToProps(state) {
  return { listScrollPosition: state.scrollPosition }
}

export default connect(mapStateToProps)(HomeScreen)

//             onPress={() => this.props.navigation.navigate("NewDeckScreen")}
