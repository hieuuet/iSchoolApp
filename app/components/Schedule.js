import React, { PureComponent } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import common from '../styles/common';

class Schedule extends PureComponent {
  render() {
    // let selected = this.state.selectedDay
    let { day, subjects, selected, onPress } = this.props
    return (
      subjects.length > 0 &&
      <View style={styles.container}>
        <TouchableOpacity
          style={selected ? styles.dayContainerSelected : styles.dayContainer}
          onPress={onPress}
        >
          <Text style={[styles.day, { color: selected ? 'rgb(171,180,189)' : 'black' }]}>
            {day}
          </Text>
          {!selected &&
            <Image
              source={require('../images/arrow-down.png')}
              style={styles.button}
            />
          }
        </TouchableOpacity>
        {
            selected &&
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
                                    <Text style={styles.lesson}>{sub.start_time + ' - ' + sub.end_time}</Text>
                                </View>
                            </View>
                        );
                    })
                }
            </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(248,251,252)'
  },
  listSubjects: {
    shadowColor: 'grey',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    marginBottom: 2,
    elevation: 1,
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
    paddingLeft: 16,
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderColor: 'rgb(235,235,235)'
  },
  subjectContainer: {
    justifyContent: 'center',
    paddingLeft: 10
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

export default Schedule;
