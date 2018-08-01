import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
const {height, width} = Dimensions.get('window');

const SettingForm = (props) => {
    const { icon, title } = props;
    return (
      <TouchableOpacity onPress={props.onPress} style={styles.container}>
        <View style={{ flex:1, justifyContent: 'center', alignItems: 'center',}}>
          <Image style={styles.icon} source={icon} />
        </View>
        <Text style={styles.title}>
          {title}
        </Text>
      </TouchableOpacity>
      )
}

const styles = StyleSheet.create({
  container: {
    width: (width-50)/2,
    height: 130,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 15
  },
  icon: {
    width: 56,
    height: 56,
  },
  title: {
    fontSize: 17,
    color: '#c0bec0',
    marginBottom: 10
  }
})
export default SettingForm;
