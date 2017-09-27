import React, { Component } from "react"
import { Text, View } from "react-native"
import { H1, H2, Button } from "native-base"
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
    this.setState({
      currentQuestion: this.state.currentQuestion + 1
    })
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
    console.log("DID MOUNT")

    API.getLastScreenVisited().then(value => {
      if (value && value.page === "GameScene") {
        console.log("GOING TO SET STATE")
        console.log(
          "current: " + value.currentCard + " ... points: " + value.points
        )
        this.setState({
          currentQuestion: value.currentCard,
          points: value.points
        })
      }
    })

    console.log("DID MOUNT")
    console.log(this.props)
    console.log("..........")
    this.saveStep()

    if (this.props.deck.questions.length === this.state.currentQuestion) {
      console.log(" IWANT TO WAIT ")
      this.resetGame()
      this.saveStep()
    } else {
      console.log(
        " ...on Friday! " +
          this.state.currentQuestion +
          " VS " +
          this.props.deck.questions.length
      )
    }
  }

  /*
  componentWillMount = () => {
    API.getLastScreenVisited().then(value => {
      if (value && value.page === "GameScene") {
        console.log("GOING TO SET STATE")
        console.log(
          "current: " + value.currentCard + " ... points: " + value.points
        )
        this.setState({
          currentQuestion: value.currentCard,
          points: value.points
        })
      }
    })

    console.log("WILL MOUNT")
    console.log(this.props)
    console.log("..........")
    this.saveStep()
  }
  */

  saveStep = () => {
    if (this.props.deck.questions.length === this.state.currentQuestion) {
      console.log("?....GOING HOME!")

      API.saveLastScreenVisited("home", false)
    } else {
      console.log(
        "SAVING THIS STEP!" +
          "GameScene" +
          " ... " +
          this.props.deckKey +
          " ... " +
          this.state.currentQuestion +
          " ... " +
          this.state.points
      )

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

  render() {
    const { deckKey, deck } = this.props
    const { points, currentQuestion } = this.state
    const currentQuestionObject = deck.questions[currentQuestion]
    if (currentQuestionObject)
      return (
        <Flashcard
          question={currentQuestionObject.question}
          answer={currentQuestionObject.answer}
          goNext={this.goNext}
          addPoint={this.addPoint}
          current={currentQuestion + 1}
          total={deck.questions.length}
        />
      )
    else
      return (
        <View>
          <FinalGameScene
            points={points}
            total={deck.questions.length}
            resetGame={this.resetGame}
          />
        </View>
      )
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
