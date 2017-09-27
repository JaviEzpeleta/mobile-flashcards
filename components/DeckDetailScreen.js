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
  FooterTab,
  Header,
  Body,
  Icon,
  Left,
  Right,
  Title
} from "native-base"

class DeckDetailScreen extends Component {
  componentDidMount() {
    API.saveLastScreenVisited("deckDetail", this.props.deck.key)
  }

  goBack() {
    API.saveLastScreenVisited("home", false)
    this.props.navigation.navigate("Home")
  }

  componentDidUpdate() {
    console.log("UPDATE!! 💚")
  }

  render() {
    const { deck } = this.props
    const key = deck.key
    return (
      <Container>
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
    navigation,
    deckIndex,
    deck: state.decks[deckIndex]
  }
}

export default connect(mapStateToProps)(DeckDetailScreen)
