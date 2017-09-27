import React, { Component } from "react"
import { Text, View } from "react-native"
import { Header, Body, Icon, Left, Right, Title, Button } from "native-base"

export default class CustomHeader extends Component {
  render() {
    return (
      <Header>
        <Left>
          <Button transparent onPress={() => this.props.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>{this.props.title}</Title>
        </Body>
        <Right />
      </Header>
    )
  }
}
