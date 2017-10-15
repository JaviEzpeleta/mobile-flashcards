import React, { Component } from "react"
import { StyleSheet, View, StatusBar, Dimensions } from "react-native"
import styled from "styled-components/native"
import { Spinner } from "nachos-ui"
import DeckList from "./DeckList"
import { black, white, red } from "./../utils/colors"
import { Constants } from "expo"
import { connect } from "react-redux"
import * as API from "./../utils/api"
import { setDecks } from "./../actions"
import { Button, Text } from "native-base"
import Icon from "react-native-vector-icons/FontAwesome"

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

const HomeScreenStyledComponent = styled.View`flex: 1;`

const HomeFooterStyledComponent = styled.View`
  height: 60;
  background-color: ${white};
  align-items: flex-end;
  justify-content: center;
  flex-direction: row;
`
class HomeScreen extends Component {
  state = {
    listScrollPosition: 0
  }

  render() {
    const deleteIcon = (
      <Icon name="trash" size={22} color="#FFF" style={{ marginLeft: 20 }} />
    )
    const addIcon = (
      <Icon name="plus" size={20} color="#FFF" style={{ marginLeft: 20 }} />
    )

    const homeFooterButton = {
      marginTop: 8,
      marginRight: 20,
      marginLeft: 20
    }
    const { listScrollPosition } = this.props

    return (
      <HomeScreenStyledComponent>
        <MFStatusBar barStyle="dark-content" />

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
            style={homeFooterButton}
            warning
            onPress={() => {
              this.props.clearAll()
            }}
          >
            {deleteIcon}
            <Text>delete storage</Text>
          </Button>
          <Button
            style={homeFooterButton}
            success
            onPress={() => this.props.navigation.navigate("NewDeck", {})}
          >
            {addIcon}
            <Text>New Deck</Text>
          </Button>
        </HomeFooterStyledComponent>
      </HomeScreenStyledComponent>
    )
  }
}

function mapStateToProps(state) {
  return { listScrollPosition: state.scrollPosition }
}

function mapDispatchToProps(dispatch) {
  return {
    clearAll: () => {
      API.clearAll()
      API.fetchDecks()
        .then(decks => {
          dispatch(setDecks(decks))
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
