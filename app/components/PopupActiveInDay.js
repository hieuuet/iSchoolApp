import React, { Component } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Slider from 'react-native-slider';
import * as Animatable from 'react-native-animatable';
import Video from 'react-native-video';
import Util from '../configs/util';
import colors from '../styles/colors'
import Schedule from './Schedule';
import moment from 'moment';

class PopupActiveInDay extends Component {

    renderListItem = () => {
      let containerStyles = styles.containerSchedule
      let icon = require('../images/middle.png')
      let subjects = [{name: 'Thể dục', time: 'Tiết 1'},{name: 'Thể dục', time: 'Tiết 1'},{name: 'Thể dục', time: 'Tiết 1'},{name: 'Thể dục', time: 'Tiết 1'}]
      return (
        <View style={styles.listSubjects}>
            {
              subjects.map((sub, index) => {
                  let containerStyles = styles.containerSchedule
                  let icon = require('../images/middle.png')
                  if (index == 0) {
                      containerStyles = [styles.containerSchedule, { marginTop: 16, borderTopLeftRadius: 10, borderTopRightRadius: 10 }]
                      icon = require('../images/start.png')
                  } else if (index == subjects.length - 1) {
                      containerStyles = [styles.containerSchedule, { borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }]
                      icon = require('../images/end.png')
                  }
                  return (
                      <View
                          key={`sub_${index}`}
                          style={containerStyles}>
                          <Image
                              source={icon}
                              style={styles.timelineIcon} />
                          <View style={styles.subjectContainer}>
                              <Text style={styles.subjects}>{sub.name}</Text>
                              <Text style={styles.lesson}>{sub.time}</Text>
                          </View>
                      </View>
                  );
              })
            }
        </View>
      )
    }

    render () {
        let props = this.props;
        var weekdays = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];
        return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row'}}>
                <View style={{flex:1}}/>
                <TouchableOpacity onPress={props.closePopup} style={{marginRight: 20, marginBottom: 10}} >
                    <Text style={{color: 'white', fontSize: 15}}>
                        ĐÓNG  ✕
                    </Text>
                </TouchableOpacity>
            </View>
            <Animatable.View style={[styles.popupInfo, props.style]}>
              <View style={{alignItems: 'center', height: '80%'}}>
                <Text style={{fontSize: 14, marginTop: 15, color: 'rgb(103,120,151)'}}>
                  Hoạt động trong ngày
                </Text>
                <Text style={{fontSize: 18, color: 'rgb(171,180,189)', fontWeight: 'bold', marginTop: 15}}>
                  - Thứ 2 -
                </Text>
                <View style={{height: '100%', width: '100%',paddingVertical: 20, borderRadius: 7}}>
                  {this.renderListItem()}
                </View>
              </View>
            </Animatable.View>
        </View>
        )
    }
    
}

const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.7)'
    },
    popupInfo: {
      width: Dimensions.get('window').width - 40,
      backgroundColor: "#efeff4",
      borderRadius: 7,
      overflow: 'hidden',
      backgroundColor: 'white'
    },
    dayContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 15,
      paddingTop: 15,
      borderBottomWidth: 1,
      borderColor: 'rgb(235,235,235)'
    },
    dayContainerSelected: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 15,
    },
    button: {
      width: 20,
      height: 12,
    },
    day: {
      fontSize: 18,
      fontWeight: '600'
    },
    containerSchedule: {
      flexDirection: 'row',
      marginLeft: 16,
      marginRight: 16,
      backgroundColor: 'white',
      borderBottomWidth: 0.5,
      borderColor: 'rgb(235,235,235)'
    },
    subjectContainer: {
      justifyContent: 'center',
      paddingLeft: 20
    },
    timelineIcon: {
      width: 12,
      height: 60,
      resizeMode: 'contain'
    },
    subjects: {
      fontSize: 16,
      color:'black'
    },
    lesson: {
      fontSize: 14,
      color: 'rgb(153,153,153)',
      marginTop: 5
    }
});
export default PopupActiveInDay;
