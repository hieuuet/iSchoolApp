import React, { Component, Fragment } from "react";
import {
  View, Text, StyleSheet, Image
} from "react-native";

import common from '../styles/common';
import colors from '../styles/colors';

const ChatBubble = props => {

  const renderMessage = () => (
    <View style={[common.cardShadow, styles.card,
      props.avatarLeft === true ? { marginHorizontal: 15 } : { marginRight: 15 }
      ]}>
      <Text style={styles.cardPara}>{props.message}</Text>
    </View>
  );
  const renderAvatar = () => {
    return (
      <View>
        <Image
          source={{uri: props.avatar}}
          style={[styles.ava, props.avatarLeft === true ? { marginLeft: 15 } : { marginRight: 15 }]} />
      </View>
    )
  };
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {
        props.avatarLeft === true ?
          <Fragment>
            {renderAvatar()}
            {renderMessage()}
          </Fragment>
          :
          <Fragment>
            {renderMessage()}
            {renderAvatar()}
          </Fragment>
      }
    </View>

  )
}

const styles = StyleSheet.create({
  ava: {
    width: 46,
    height: 46,
    borderRadius: 23,
    resizeMode: 'cover',
    marginVertical: 5
  },
  card: {
    flex:1, 
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginVertical: 5,
    borderRadius: 8,
    padding: 20
  },
  cardPara: {
    color: 'black',
    fontSize: 17,
    marginBottom: 2
  },
  cardSubtitle: {
    color: colors.gray,
    fontSize: 13,
  },
  cardTopTitle: { marginBottom: 14, fontWeight: 'bold' },
  cardDivider: {
    borderTopWidth: 1,
    borderTopColor: '#d8d8d8',
    marginVertical: 15
  }
})

export default ChatBubble;