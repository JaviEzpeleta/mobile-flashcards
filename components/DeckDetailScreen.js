import React, { Component } from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import * as API from "./../utils/api"
import {
  Container,
  Content,
  H1,
  H2,
  H3,
  Text,
  Button,
  Footer,
  FooterTab
} from "native-base"
import CustomHeader from "./CustomHeader"

class DeckDetailScreen extends Component {
  componentDidMount() {
    API.saveLastScreenVisited("deckDetail", this.props.deck.key)
  }

  goBack() {
    API.saveLastScreenVisited("home", false)
    this.props.navigation.goBack()
  }

  render() {
    const { deck } = this.props
    const key = deck.key
    return (
      <Container>
        <CustomHeader title={deck.name} goBack={this.goBack} />

        <Content>
          <H1>{deck.name}</H1>
          <H2>{deck.questions.length.toString()} questions</H2>

          <Button
            onPress={() =>
              this.props.navigation.navigate("NewQuestion", {
                deckKey: key
              })}
          >
            <Text>Add Question</Text>
          </Button>
        </Content>

        <Footer>
          <FooterTab>
            <Button
              full
              onPress={() =>
                this.props.navigation.navigate("Game", {
                  deckKey: key
                })}
            >
              <Text>Start the game!</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

function mapStateToProps(state, { navigation }) {
  const { deckIndex } = navigation.state.params

  return {
    deckIndex,
    deck: state.decks[deckIndex]
  }
}

export default connect(mapStateToProps)(DeckDetailScreen)
