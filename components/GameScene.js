import React, { Component } from "react"
import { Text, View } from "react-native"
import { H1, H2, Button } from "native-base"
import FinalGameScene from "./FinalGameScene"
import { connect } from "react-redux"
import Flashcard from "./Flashcard"

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

  addPoint = () => {
    this.setState({
      points: this.state.points + 1
    })
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
          <FinalGameScene points={points} total={deck.questions.length} />
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
