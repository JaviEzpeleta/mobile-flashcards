import React, { Component } from "react"
import { Text, View } from "react-native"
import {
  H1,
  H2,
  Button,
  Header,
  Body,
  Icon,
  Left,
  Right,
  Title
} from "native-base"
import FinalGameScene from "./FinalGameScene"
import { connect } from "react-redux"
import Flashcard from "./Flashcard"
import * as API from "./../utils/api"

class GameScene extends Component {
  state = {
    currentQuestion: 0,
    points: 0
  }

  goNext = () => {
    this.setState(state => ({ currentQuestion: state.currentQuestion + 1 }))
  }

  resetGame = () => {
    this.setState({
      currentQuestion: 0,
      points: 0
    })
  }

  addPoint = () => {
    this.setState({
      points: this.state.points + 1
    })
  }

  componentDidMount = () => {
    API.getLastScreenVisited().then(value => {
      if (value && value.page === "GameScene") {
        this.setState({
          currentQuestion: value.currentCard,
          points: value.points
        })
      }
    })

    this.saveStep()

    if (this.props.deck.questions.length === this.state.currentQuestion) {
      this.resetGame()
    }
  }

  saveStep = () => {
    if (
      this.state.currentQuestion < 0 ||
      this.props.deck.questions.length === this.state.currentQuestion
    ) {
      API.saveLastScreenVisited("home", false)
    } else {
      API.saveLastScreenVisited(
        "GameScene",
        this.props.deckKey,
        this.state.points,
        this.state.currentQuestion
      )
    }
  }

  componentDidUpdate() {
    this.saveStep()
  }

  goBack() {
    API.saveLastScreenVisited("home", false).then(() => {
      this.props.navigation.navigate("DeckDetail", {
        deckIndex: this.props.deck.key
      })
    })
    this.setState({
      currentQuestion: -1
    })
  }

  render() {
    const { deckKey, deck } = this.props
    const { points, currentQuestion } = this.state
    const currentQuestionObject = deck.questions[currentQuestion]
    if (currentQuestionObject)
      return (
        <View style={{ flex: 1 }}>
          <Header>
            <Left>
              <Button transparent onPress={() => this.goBack()}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>{deck.name}</Title>
            </Body>
            <Right />
          </Header>
          <Flashcard
            question={currentQuestionObject.question}
            answer={currentQuestionObject.answer}
            goNext={this.goNext}
            addPoint={this.addPoint}
            current={currentQuestion + 1}
            total={deck.questions.length}
          />
        </View>
      )
    else if (currentQuestion >= 0)
      return (
        <View>
          <FinalGameScene
            points={points}
            total={deck.questions.length}
            resetGame={this.resetGame}
            deckKey={this.props.deckKey}
            navigation={this.props.navigation}
          />
        </View>
      )
    else return <View />
  }
}

function mapStateToProps(state, { navigation }) {
  const { deckKey } = navigation.state.params

  return {
    deckKey,
    deck: state.decks[deckKey]
  }
}

export default connect(mapStateToProps)(GameScene)
