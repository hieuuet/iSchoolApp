import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, Dimensions, TextInput } from 'react-native';

const width = Dimensions.get("window").width

const ChildrenItem = props => {

    return (
      <TouchableOpacity onPress={props.onPress} style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <Image style={styles.avatar} source={props.avater} />
          <View style={{flex: 1, marginLeft: 15, paddingVertical: 5, flexDirection: 'row', alignItems: 'center', borderBottomColor: "rgb(221,221,224)", borderBottomWidth: 1}}>
            <View style={{flex: 1}}>
                <Text style={styles.name}>
                  {props.name}
                </Text>
                <Text style={styles.age}>
                  {props.age}
                </Text>
            </View>
            <Image style={{width: 28, height: 28,}} source={require("../images/arrowRight.png")} />
          </View>
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  name: {
    color: 'black',
    fontSize: 21
  },
  age: {
    color: 'black',
    fontSize: 15,
    opacity: 0.5,
    marginTop: 2
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30
  }
})

export default ChildrenItem;
