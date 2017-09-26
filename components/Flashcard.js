import React, { Component } from "react"
import { View, Animated } from "react-native"
import {
  Text,
  H1,
  H2,
  Button,
  Content,
  Container,
  CardItem,
  Card,
  Body
} from "native-base"

export default class Flashcard extends Component {
  state = {
    showingAnswer: false,
    cardFade: new Animated.Value(0),
    cardScale: new Animated.Value(0),
    nextButtonOpacity: new Animated.Value(0)
  }

  showAnswer = () => {
    this.setState({ showingAnswer: true })
  }

  showCard = () => {
    Animated.timing(this.state.cardFade, {
      toValue: 1,
      duration: 400
    }).start()
    Animated.spring(this.state.cardScale, {
      toValue: 1,
      duration: 100
    }).start()
  }
  showNextButton = () => {
    Animated.timing(this.state.nextButtonOpacity, {
      toValue: 1,
      duration: 1500
    }).start()
  }

  removeCard = () => {
    Animated.timing(this.state.cardFade, {
      toValue: 0,
      duration: 400
    }).start()
    Animated.spring(this.state.cardScale, {
      toValue: 0,
      duration: 100
    }).start()
  }

  componentDidMount = () => {
    this.showCard()
    this.showNextButton()
  }

  render() {
    const { showingAnswer, cardFade, cardScale, nextButtonOpacity } = this.state
    const { question, answer, goNext } = this.props
    return (
      <Content style={{ margin: 15, marginTop: 40 }}>
        <Animated.View
          style={{
            opacity: cardFade,
            transform: [{ scale: cardScale }]
          }}
        >
          <Card>
            <CardItem style={{ height: 460 }}>
              {showingAnswer ? (
                <Body style={{ padding: 15 }}>
                  <Text>Question 1 of 6</Text>
                  <Text>Answer:</Text>
                  <H2
                    style={{
                      marginTop: 15,
                      marginBottom: 40
                    }}
                  >
                    {answer}
                  </H2>
                </Body>
              ) : (
                <Body style={{ padding: 15 }}>
                  <Text>Question 1 of 6</Text>
                  <H2
                    style={{
                      marginTop: 15,
                      marginBottom: 40
                    }}
                  >
                    {question}
                  </H2>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "stretch",
                      alignSelf: "stretch",
                      justifyContent: "space-between"
                    }}
                  >
                    <Button danger onPress={() => this.showAnswer()}>
                      <Text>I Don't Know</Text>
                    </Button>
                    <Button success onPress={() => false}>
                      <Text>✔️ I got this! </Text>
                    </Button>
                  </View>
                </Body>
              )}
            </CardItem>
          </Card>
        </Animated.View>
        <Animated.View style={{ opacity: nextButtonOpacity }}>
          <Body style={{ padding: 15 }}>
            <Button
              onPress={() => {
                this.removeCard()
                setTimeout(
                  function() {
                    this.showCard()
                  }.bind(this),
                  500
                )
                goNext()
              }}
            >
              <Text>NEXT</Text>
            </Button>
          </Body>
        </Animated.View>
      </Content>
    )
  }
}
