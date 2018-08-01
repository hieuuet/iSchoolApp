import React, { Component} from "react";
import {
  WebView, View
} from "react-native";

const html = (source, width, height) => `
<html>
<head>
<style>
  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0);
  }
</style>
</head>
<body>
<img src="${source}" style="width:${width}px;height:${height}px" />
</body>
</html>
`

export default (props) => {
  return (
    <View style={[{width: props.width, height:props.height, backgroundColor: "rgba(0,0,0,0)"}, props.style]}>
    <WebView source={{ html: html(props.source, props.width, props.height) }} 
      style={[{width: props.width, height:props.height, backgroundColor: "rgba(0,0,0,0)"}, props.style]}
    />
    </View>
  )
}