import React, { PureComponent } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import colors from '../styles/colors';

class EventDateBreak extends PureComponent {
    render() {
        const { date } = this.props;
        
        return (
            <View style={styles.wrap}>
                <Text style={styles.date}>{date}</Text>
                <View style={styles.line}></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        height: 18,
        position: 'relative',
        alignItems: 'center',
        marginBottom: 15,
        marginTop: 15
    },
    line: {
        height: 1,
        backgroundColor: '#ceced2',
        position: 'absolute',
        top: 9,
        width: '100%',
        zIndex: -1
    },
    date: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#abb4bd',
        backgroundColor: colors.body,
        paddingLeft: 50,
        paddingRight: 50
    },
});

export default EventDateBreak;