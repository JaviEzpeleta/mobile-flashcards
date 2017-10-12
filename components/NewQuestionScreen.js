import React, { Component } from "react"
import { StyleSheet, TextInput, Animated, ScrollView } from "react-native"
import { H4, Bubble } from "nachos-ui"
import { Container, View, Button, Text } from "native-base"
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
      <Container>
        <ScrollView scrollEnabled={false} contentContainerStyle={styles.main}>
          <H4 style={inputStyle}>Enter New QUESTION:</H4>
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={styles.textInput}
            placeholder="Enter New Question"
            value={question}
            onChangeText={question => this.handleChange("question", question)}
          />
          <H4 style={inputStyle}>Enter Answer:</H4>
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={styles.textInput}
            placeholder="Enter the text for the corret answer"
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
                  style={{
                    marginTop: 5,
                    marginRight: 38,
                    paddingTop: 2
                  }}
                  arrowPosition="top"
                  color="#f44b42"
                >
                  Please enter the question and the answer!
                </Bubble>
              </Animated.View>
            )}
          </NewDeckSubmitButtonStyledComponent>
        </ScrollView>
      </Container>
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
    height: 160
  }
})
const NewDeckSubmitButtonStyledComponent = styled.View`
  height: 90;
  margin-left: 15;
  margin-top: 15;
  align-items: flex-end;
  justify-content: flex-start;
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
