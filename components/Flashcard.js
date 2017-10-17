import React, { Component } from "react"
import { View, Animated, Easing, StyleSheet } from "react-native"
import {
  Text,
  H1,
  H2,
  Button,
  Content,
  Container,
  CardItem,
  Card,
  Body,
  Footer
} from "native-base"

export default class Flashcard extends Component {
  state = {
    hideCardContent: true,
    showingAnswer: false,
    cardFade: new Animated.Value(0),
    cardScale: new Animated.Value(0),
    cardRotationY: new Animated.Value(59),
    nextButtonOpacity: new Animated.Value(0),
    spinValue: new Animated.Value(0)
  }

  showAnswer = () => {
    setTimeout(
      function() {
        this.setState({ showingAnswer: true })
      }.bind(this),
      200
    )

    Animated.timing(this.state.spinValue, {
      toValue: 1,
      duration: 400,
      easing: Easing.linear
    }).start()
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
      300
    )
  }

  goNextActions = () => {
    this.hideCardContent()
    this.removeCard()
    this.setState({ showingAnswer: false, spinValue: new Animated.Value(0) })
    this.props.goNext()
  }

  render() {
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "180deg"]
    })

    const {
      showingAnswer,
      cardFade,
      cardScale,
      nextButtonOpacity,
      hideCardContent,
      cardRotationY
    } = this.state
    const { question, answer, goNext } = this.props
    const { goNextActions } = this
    return (
      <Content style={{ margin: 15, marginTop: 40 }}>
        <Animated.View
          style={{
            opacity: cardFade,
            /*            transform: [{rotate: '90deg'}] */
            transform: [{ scale: cardScale }, { rotateY: spin }]
          }}
        >
          <Card>
            {hideCardContent ? (
              <Body style={{ height: 460, transform: [{ rotateY: "90deg" }] }}>
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
                  <Body
                    style={{ padding: 15, transform: [{ rotateY: "180deg" }] }}
                  >
                    <Text>
                      Question {this.props.current} of {this.props.total}
                    </Text>
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
                  <View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "column"
                      }}
                    >
                      <Text>
                        Question {this.props.current} of {this.props.total}
                      </Text>
                      <H2
                        style={{
                          marginTop: 15,
                          marginBottom: 40
                        }}
                      >
                        {question}
                      </H2>
                    </View>
                    <Button onPress={() => this.showAnswer()}>
                      <Text>Show Answer</Text>
                    </Button>
                  </View>
                )}
              </CardItem>
            )}
          </Card>
        </Animated.View>
        <Animated.View style={{ opacity: nextButtonOpacity }}>
          <View style={styles.responseButtons}>
            <Button
              danger
              onPress={() => {
                goNextActions()
              }}
            >
              <Text>I Don't Know</Text>
            </Button>
            <Button
              success
              onPress={() => {
                this.props.addPoint()
                goNextActions()
              }}
            >
              <Text>✔️ I got this! </Text>
            </Button>
          </View>
        </Animated.View>
      </Content>
    )
  }
}

const styles = StyleSheet.create({
  responseButtons: {
    flexDirection: "row",
    alignItems: "stretch",
    alignSelf: "stretch",
    justifyContent: "space-between",
    marginTop: 20
  }
})
