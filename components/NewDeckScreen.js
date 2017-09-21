import React, { Component } from "react"
import { Text, View, StyleSheet, TextInput, Animated } from "react-native"
import { H4, Button, Bubble } from "nachos-ui"
import styled from "styled-components/native"
import { black, white, blue } from "./../utils/colors"

/*TODO: animate the «can't be empty» Bubble,
  when it comes...and when it goes too! */

export default class NewDeckScreen extends Component {
  state = {
    newName: "",
    emptyFieldError: false
  }

  handleSubmit = () => {
    newName = this.state.newName.trim()
    if (newName === "") {
      this.setState({ emptyFieldError: true })
    }
  }

  handleChange = newName => {
    this.setState({ newName })
    this.setState({ emptyFieldError: false })
  }

  render() {
    const newDeckButton = {
      width: 240,
      margin: 15,
      alignItems: "center",
      justifyContent: "center",
      height: 30,
      backgroundColor: blue,
      borderRadius: 6
    }
    const buttonStyle = { color: black, fontSize: 14 }
    const inputStyle = { marginTop: 15, marginLeft: 15, color: black }
    const { emptyFieldError } = this.state
    return (
      <View>
        <H4 style={inputStyle}>Enter New Deck Name:</H4>
        <TextInput
          style={styles.textInput}
          placeholder="New Deck Name"
          value={this.state.newName}
          onChangeText={newName => this.handleChange(newName)}
        />
        <NewDeckSubmitButtonStyledComponent>
          <Button
            textStyle={buttonStyle}
            style={newDeckButton}
            onPress={() => this.handleSubmit()}
          >
            CREATE DECK
          </Button>
          {emptyFieldError && (
            <Animated.View>
              <Bubble
                style={{ marginTop: 55, marginRight: 38 }}
                arrowPosition="top"
                color="#ff9c00"
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
  alignItems: flex-end;
  justifyContent: flex-start;
`
