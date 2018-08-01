import React from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const screenWidth = Dimensions.get("window").width;

const ScoreCard = (props) => {
  let { subject, score, percent, onPress } = props
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <LinearGradient
        start={{x: 0.4, y: 0.0}} end={{x: 0.6, y: 1.0}}
        colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.4)']}
        style={styles.container}
      >
        <Text style={styles.subject}>{subject}</Text>
        <View style={styles.info}>
          <Text style={styles.degree}>{score}</Text>
          <Text style={styles.percent}>{percent}</Text>
        </View>
        <View style={{ flex: 1 }}/>
        <View>
          <Text style={styles.detail}>Xem chi tiết</Text>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(250,69,120)',
    marginLeft: 15,
    marginTop: 15,
    borderRadius: 8,
    height: (screenWidth - 45) / 2 * 3 / 4,
    width: (screenWidth - 45) / 2,
    padding: 15,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    elevation: 1,
    marginBottom: 2,
  },
  subject: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  info: {
    marginTop: 6,
    flexDirection: 'row',
  },
  degree: {
    color: 'white',
    fontSize: 25,
    fontWeight: '800'
  },
  percent: {
    color: 'white',
    fontSize: 15,
    fontWeight: '400',
    marginLeft: 10,
    marginTop: 5
  },
  detail: {
    color: 'white',
    fontSize: 16,
  }
});

export default ScoreCard;
