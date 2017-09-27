import React, { Component } from "react"
import { View, Animated } from "react-native"
import {
  Text,
  H1,
  H2,
  Button,
  Header,
  Footer,
  Left,
  Right,
  Title,
  Body,
  Icon,
  Content,
  Card,
  CardItem,
  Container
} from "native-base"
import Animation from "lottie-react-native"
import * as API from "./../utils/api"

export default class FinalGameScene extends Component {
  constructor(props) {
    super(props)
    this.state = {
      progress: new Animated.Value(0)
    }
  }

  getAnimationFile = () => {
    return {
      width: 300,
      heigth: 200,
      file: require("./../utils/animations/trophy.json")
    }

    const points = this.props.points
    const questions = this.props.total

    let finalScore = 0
    if (points > 0) {
      finalScore = questions / points
    }
    if (finalScore === 0) return require("./../utils/animations/shrug.json")
    if (finalScore <= 0.15)
      return require("./../utils/animations/emoji_shock.json")
    if (finalScore <= 0.4)
      return require("./../utils/animations/cloud_disconnection.json")
    if (finalScore <= 0.5)
      return require("./../utils/animations/emoji_wink.json")
    if (finalScore <= 0.8) return require("./../utils/animations/star.json")
    return {
      width: 300,
      heigth: 200,
      file: require("./../utils/animations/trophy.json")
    }
  }

  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 2000
    }).start()
  }

  goBack() {
    API.saveLastScreenVisited("DeckDetail", this.props.deckKey).then(() => {
      this.props.navigation.navigate("DeckDetail", {
        deckIndex: this.props.deckKey
      })
    })
  }

  render() {
    const lottieFile = this.getAnimationFile()

    return (
      <View style={{ flex: 1 }}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>FINISHED!!!</Title>
          </Body>
          <Right />
        </Header>

        <Container>
          <Body>
            <View>
              <H2>Great Job!</H2>
            </View>

            <View style={{ height: 300, width: 300 }}>
              <Animation
                style={{
                  width: lottieFile.width,
                  height: lottieFile.heigth,
                  marginTop: 20
                }}
                source={lottieFile.file}
                progress={this.state.progress}
              />
            </View>
            <H2>
              {this.props.points.toString()} of {this.props.total.toString()}
            </H2>
            <Button onPress={() => this.props.resetGame()}>
              <Text>Try it again!</Text>
            </Button>
          </Body>
        </Container>
      </View>
    )
  }
}
