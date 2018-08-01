import React from "react";
import { Text, View, Image, ImageBackground } from "react-native";

const Header = props => {
  return props.isScroll ? (
    <ImageBackground
      style={{ height: undefined, width: undefined }}
      source={require("../images/demo/header_bg.jpg")}
    >
      <View style={[styles.containerScroll, {backgroundColor: props.backgroundColor}]}>
        <View style={{ flex: 1}}>
          <Text style={[styles.title]}>{props.title}</Text>
          <Text style={styles.title}>{props.subTitle}</Text>
          <Text style={[styles.address, { marginTop: 5 }]}>{props.address}</Text>
        </View>
        <Image style={styles.logo} source={props.logo} />
      </View>
    </ImageBackground>
  ) : (
    <ImageBackground
      style={{ height: undefined, width: undefined }}
      source={require("../images/demo/header_bg.jpg")}
    >
      <View style={[styles.container, {backgroundColor: props.backgroundColor}]}>
        <Image style={styles.logo} source={props.logo} />
        <Text style={[styles.title, { marginTop: 10 }]}>{props.title}</Text>
        <Text style={styles.title}>{props.subTitle}</Text>
        <Text style={[styles.address, { marginTop: 5 }]}>{props.address}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = {
  container: {
    height: 150,
    justifyContent: "center",
    alignItems: "center"
  },
  containerScroll: {
    height: 100,
    alignItems: "center",
    flexDirection: 'row',
    paddingHorizontal: 15
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 33,
    resizeMode: "cover"
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "600"
  },
  address: {
    color: "white",
    fontSize: 14,
    fontWeight: "300"
  }
};
export default Header;
