import React, { Component } from "react"
import { Text, View, StyleSheet, TextInput, Animated } from "react-native"
import { H4, Bubble } from "nachos-ui"
import { Button } from "native-base"
import styled from "styled-components/native"
import { black, white, blue } from "./../utils/colors"
import { connect } from "react-redux"
import * as API from "./../utils/api"
import { addQuestion } from "./../actions"

/*TODO: animate the «can't be empty» Bubble,
  when it comes...and when it goes too! */

class NewQuestionScreen extends Component {
  state = {
    question: "",
    answer: "",
    emptyFieldError: false
  }

  handleSubmit = () => {
    let { question, answer } = this.state

    question = question.trim()
    asnwer = answer.trim()

    if (question === "" || answer === "") {
      this.setState({ emptyFieldError: true })
    } else {
      this.props.createQuestion(question, answer, this.props.deckKey)
    }
  }

  handleChange = (field, value) => {
    if (field === "question") this.setState({ question: value })
    if (field === "answer") this.setState({ answer: value })
    this.setState({ emptyFieldError: false })
  }

  render() {
    const inputStyle = { marginTop: 15, marginLeft: 15, color: black }
    const { emptyFieldError, question, answer } = this.state

    return (
      <View>
        <H4 style={inputStyle}>
          Enter New QUESTION for deck {this.props.deckKey}:
        </H4>
        <TextInput
          multiline={true}
          numberOfLines={4}
          style={styles.textInput}
          placeholder="Question"
          value={question}
          onChangeText={question => this.handleChange("question", question)}
        />
        <H4 style={inputStyle}>Enter Answer:</H4>
        <TextInput
          multiline={true}
          numberOfLines={4}
          style={styles.textInput}
          placeholder="Question"
          value={answer}
          onChangeText={answer => this.handleChange("answer", answer)}
        />
        <NewDeckSubmitButtonStyledComponent>
          <Button onPress={() => this.handleSubmit()}>
            <Text>CREATE QUESTION</Text>
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
    padding: 8,
    fontSize: 18,
    height: 180
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
function mapStateToProps(state, { navigation }) {
  const { deckKey } = navigation.state.params

  return {
    deckKey: deckKey
  }
}

function mapDispatchToProps(dispatch, { navigation }) {
  return {
    createQuestion: (question, answer, deckId) => {
      API.addQuestion(question, answer, deckId)
        .then(() => {
          dispatch(addQuestion(question, answer, deckId))
          navigation.goBack()
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestionScreen)
