import React, { Component } from "react"
import { View, StyleSheet, TextInput, Animated } from "react-native"
import { Bubble } from "nachos-ui"
import styled from "styled-components/native"
import { black, white, blue } from "./../utils/colors"
import { connect } from "react-redux"
import * as API from "./../utils/api"
import { setDecks } from "./../actions"
import { H1, Button, Text } from "native-base"

/*TODO: animate the «can't be empty» Bubble,
  when it comes...and when it goes too! */

class NewDeckScreen extends Component {
  state = {
    newName: "",
    emptyFieldError: false
  }

  handleSubmit = () => {
    newName = this.state.newName.trim()
    if (newName === "") {
      this.setState({ emptyFieldError: true })
    } else {
      this.props.createDeck(newName)
    }
  }

  handleChange = newName => {
    this.setState({ newName })
    this.setState({ emptyFieldError: false })
  }

  render() {
    const marginStyle = { margin: 15 }
    const inputStyle = { marginTop: 15, marginLeft: 15, color: black }
    const { emptyFieldError } = this.state
    return (
      <View>
        <H1 style={marginStyle}>Enter New Deck Name:</H1>
        <TextInput
          autoFocus
          style={styles.textInput}
          placeholder="New Deck Name"
          value={this.state.newName}
          onChangeText={newName => this.handleChange(newName)}
        />
        <NewDeckSubmitButtonStyledComponent>
          <Button style={marginStyle} onPress={() => this.handleSubmit()}>
            <Text>CREATE DECK</Text>
          </Button>
          {emptyFieldError && (
            <Animated.View>
              <Bubble
                arrowPosition="top"
                color="#d60808"
                style={{ marginRight: 15 }}
              >
                Name can't be empty!
              </Bubble>
            </Animated.View>
          )}
        </NewDeckSubmitButtonStyledComponent>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textInput: {
    marginLeft: 15,
    marginRight: 15,
    color: black,
    backgroundColor: white,
    padding: 8
  },
  errorMessage: {
    backgroundColor: "red",
    marginRight: 15,
    padding: 6,
    width: 140
  }
})
const NewDeckSubmitButtonStyledComponent = styled.View`
  height: 90;
  align-items: flex-end;
  flex-direction: row;
  justify-content: space-between;
`

function mapDispatchToProps(dispatch, { navigation }) {
  return {
    createDeck: deckName => {
      API.addDeck(deckName)
        .then(() => {
          API.fetchDecks()
            .then(decks => {
              dispatch(setDecks(decks))
              navigation.goBack()
            })
            .catch(e => {
              console.log(e)
            })
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}

export default connect(false, mapDispatchToProps)(NewDeckScreen)
