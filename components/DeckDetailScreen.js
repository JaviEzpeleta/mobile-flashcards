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
          <H2>{deck.name}</H2>
          <Text>- questions</Text>
          <Text>{deck.key}</Text>

          <Button
            onPress={() =>
              this.props.navigation.navigate("NewQuestion", {
                deckKey: key
              })}
          >
            <Text>Add Question to {key}</Text>
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
