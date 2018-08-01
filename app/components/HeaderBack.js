import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';

const HeaderBack = (props) => {
    return (
      <View style={[styles.container, {backgroundColor: props.backgroundColor}]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={props.onPressLeft} style={[styles.button,{left: 5}]}>
            <Image style={styles.icon} source={require("../images/icon-back-white.png")} />
            <Text style={styles.title}>Quay lại</Text>
          </TouchableOpacity>
          <Text style={[styles.title,{flex: 1, textAlign: 'center', fontWeight: "600"}]}>
            {props.title}
          </Text>
          {!!props.iconRight &&
            <TouchableOpacity onPress={props.onPressRight} style={[styles.button,{right: 15}]}>
              <Image style={styles.icon} source={props.iconRight} />
            </TouchableOpacity>
          }
        </View>
      </View>
      )
}

const styles = {
  container: {
    height: 44,
  },
  header: {
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  button: {
    flexDirection:'row',
    alignItems: "center",
    position: "absolute",
    top: 0,
    bottom: 0,
    zIndex: 1
  },
  title: {
    color: 'white',
    fontSize: 17
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: 'white'
  }
}
export default HeaderBack;
