import React, { Component } from "react"
import { View } from "react-native"
import { connect } from "react-redux"
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

class DeckDetailScreen extends Component {
  render() {
    const { deck } = this.props
    const key = deck.key
    return (
      <Container>
        <Content>
          <H1>{deck.name}</H1>
          <H2>{deck.questions.length} questions</H2>

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
            <Button full>
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
