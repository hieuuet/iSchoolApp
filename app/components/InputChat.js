import React, { Component, Fragment, PureComponent } from "react";
import {
  View, Text, StyleSheet, Image, TouchableOpacity, TextInput
} from "react-native";

export default class InputChat extends PureComponent {
    constructor(props) {
      super(props);
    }

    clear = () => {
        this.refs.mInputText.clear();
    }
    render() {
        return (
          <View style={[{ height: 50, width: "100%", backgroundColor: "white", flexDirection: "row", alignItems: "center", paddingLeft: 10}, this.props.style]}>
            <View style={{flex:1, padding: 5 }}>
              <View style={{
                borderRadius: 4,
                backgroundColor: "#F0F0F0",
                flex: 1
              }}>
                <TextInput
                  ref="mInputText"
                  underlineColorAndroid="transparent"
                  placeholder="Nhập nội dung"
                  style={{ width: "100%", height: "100%", paddingLeft: 10}}
                  onChangeText={text => {this.props.onChangeText(text)}}
                />
              </View>
            </View>
            <TouchableOpacity style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 15
          }} onPress={this.props.onPress}>
              <Image source={require("../images/arrow-up.png")} style={{width: 20, height: 20, tintColor : this.props.tintColor}} />
            </TouchableOpacity>
          </View>
        )
    }
}
