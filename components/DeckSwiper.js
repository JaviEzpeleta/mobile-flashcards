import React, { Component } from "react"
import { Image } from "react-native"
import {
  Container,
  Header,
  View,
  DeckSwiper,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Icon,
  Button
} from "native-base"
const cards = [
  {
    text: "Card One",
    name: "One",
    image:
      "https://slack-imgs.com/?c=1&url=https%3A%2F%2Fnativebase.io%2Fassets%2Fimg%2Frsz_nb-cover-og.png"
  },
  {
    text: "Card One",
    name: "Two",
    image:
      "https://slack-imgs.com/?c=1&url=https%3A%2F%2Fnativebase.io%2Fassets%2Fimg%2Frsz_nb-cover-og.png"
  },
  {
    text: "Card One",
    name: "Three",
    image:
      "https://slack-imgs.com/?c=1&url=https%3A%2F%2Fnativebase.io%2Fassets%2Fimg%2Frsz_nb-cover-og.png"
  }
]
export default class DeckSwiperAdvancedExample extends Component {
  render() {
    return (
      <Container>
        <Header />
        <View>
          <DeckSwiper
            ref={c => (this._deckSwiper = c)}
            dataSource={cards}
            looping={false}
            renderEmpty={() => (
              <View style={{ alignSelf: "center" }}>
                <Text>Over</Text>
              </View>
            )}
            renderItem={item => (
              <Card style={{ elevation: 3 }}>
                <CardItem>
                  <Left>
                    <Thumbnail source={{ uri: item.image }} />
                    <Body>
                      <Text>{item.text}</Text>
                      <Text note>NativeBase</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image
                    style={{ height: 300, flex: 1 }}
                    source={{ uri: item.image }}
                  />
                </CardItem>
                <CardItem>
                  <Icon name="heart" style={{ color: "#ED4A6A" }} />
                  <Text>{item.name}</Text>
                </CardItem>
              </Card>
            )}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            position: "absolute",
            bottom: 50,
            left: 0,
            right: 0,
            justifyContent: "space-between",
            padding: 15
          }}
        >
          <Button
            iconLeft
            onPress={() => {
              console.log("LEFT!")
              this._deckSwiper._root.swipeLeft()
            }}
          >
            <Icon name="arrow-back" />
            <Text>Swipe Left</Text>
          </Button>
          <Button iconRight onPress={() => this._deckSwiper._root.swipeRight()}>
            <Icon name="arrow-forward" />
            <Text>Swipe Right</Text>
          </Button>
        </View>
      </Container>
    )
  }
}
