import React, { Component } from "react"
import { View } from "react-native"
import { Text, H1, H2, Button } from "native-base"
export default class FinalGameScene extends Component {
  render() {
    return (
      <View>
        <H1> FINAL GAME </H1>
        <H2>
          {this.props.points.toString()} of {this.props.total.toString()}
        </H2>
        <Button>
          <Text>Try it again!</Text>
        </Button>
      </View>
    )
  }
}
