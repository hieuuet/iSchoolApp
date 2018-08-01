import React, { PureComponent } from 'react';
import { Text, View, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';

const AvaFriend = props => {
  return (
    <View style={{flexDirection: "row"}}>
      {props.listAva.map((item, index) => {
        return (
          <View style={styles.avaContainer} key={`cmt_${index}`}>
            <Image
              source={{ uri: item }}
              style={styles.avaFriend}
            />
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  avaFriend: {
    width: 20,
    height: 20,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  avaContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginLeft: -7,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default AvaFriend