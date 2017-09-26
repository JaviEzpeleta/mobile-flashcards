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
    hideCardContent: true,
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
    this.showCardContent()
  }

  showCardContent = () => {
    this.setState({
      hideCardContent: false
    })
  }
  hideCardContent = () => {
    this.setState({
      hideCardContent: true
    })
  }

  componentWillReceiveProps = () => {
    setTimeout(
      function() {
        this.showCard()
        setTimeout(
          function() {
            this.showCardContent()
          }.bind(this),
          250
        )
      }.bind(this),
      700
    )
  }

  goNextActions = () => {
    this.hideCardContent()
    this.removeCard()
    this.props.goNext()
  }

  render() {
    const {
      showingAnswer,
      cardFade,
      cardScale,
      nextButtonOpacity,
      hideCardContent
    } = this.state
    const { question, answer, goNext } = this.props
    const { goNextActions } = this
    return (
      <Content style={{ margin: 15, marginTop: 40 }}>
        <Animated.View
          style={{
            opacity: cardFade,
            transform: [{ scale: cardScale }]
          }}
        >
          <Card>
            {hideCardContent ? (
              <Body style={{ height: 460 }}>
                <H1
                  style={{
                    marginTop: 120,
                    height: 140,
                    lineHeight: 200,
                    fontSize: 90
                  }}
                >
                  ?
                </H1>
              </Body>
            ) : (
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
            )}
          </Card>
        </Animated.View>
        <Animated.View style={{ opacity: nextButtonOpacity }}>
          <Body style={{ padding: 15 }}>
            <Button
              onPress={() => {
                goNextActions()
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
