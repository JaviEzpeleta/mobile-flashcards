import React, { Component } from "react"
import { StyleSheet, Text, View, StatusBar, Dimensions } from "react-native"
import styled from "styled-components/native"
import { Button, Spinner } from "nachos-ui"
import Main from "./Main"
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

const WholeApp = styled.View`
  flex: 1;
  backgroundColor: ${blue};
`

const WholeApp2 = styled.View`
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
      <WholeApp>
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
        <Main />
        <WholeApp2>
          <Button textStyle={{ color: black }} style={newDeckButton}>
            + New Deck
          </Button>
        </WholeApp2>
      </WholeApp>
    )
  }
}

function mapStateToProps(state) {
  return { listScrollPosition: state.scrollPosition }
}

export default connect(mapStateToProps)(HomeScreen)
