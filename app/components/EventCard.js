import React, { PureComponent } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import colors from '../styles/colors';
import common from '../styles/common';

class EventCard extends PureComponent {
    render() {
        const { title, date, post, indexEvent, index, style} = this.props;
        return (
            <TouchableWithoutFeedback onPress={this.props.selectEventCard}>
                <View style={[styles.wrap, common.cardShadow, style]}>
                    <View onPress={this.props.selectEventCard}  style={{flexDirection: 'row'}}>
                        <Image source={ post.active == 1 ? require('../images/clock-a.png') : require('../images/clock.png')} resizeMode="contain" style={styles.icon} />
                        <View>
                            <Text style={styles.title}>{post.title}</Text>
                            <Text style={styles.date}>{post.date}</Text>
                        </View>
                    </View>
                    {
                        indexEvent === index &&
                        <Text style={styles.more}>{post.short_description}</Text>
                    }
                    <View style={styles.line}></View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{color: colors.gray, fontSize: 13}}>{ indexEvent === index ? "Đóng" : "Xem thêm"}</Text>
                        <View style={{flex: 1}} />
                        <Image style={styles.iconMore} source={ indexEvent === index ? require("../images/up.png") : require("../images/arrow-down.png")} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        borderRadius: 3,
        backgroundColor: '#fff',
        padding: 15,
        marginHorizontal: 15
    },
    icon: {
        width: 16,
        height: 16,
        marginRight: 12
    },
    title: {
        color: '#555',
        fontSize: 16,
        fontWeight: 'bold',
        paddingRight: 18,
        marginBottom: 2,
        marginTop: -3
    },
    line: {
        height: 1,
        opacity: 0.34,
        backgroundColor: '#abb4bd',
        width: '100%',
        marginTop: 13,
        marginBottom: 13
    },
    date: {
        fontSize: 13,
        color: '#999999',
    },
    more: {
        color: '#222',
        fontSize: 15,
        lineHeight: 25
    },
    iconMore: {
        width: 24,
        height: 24
    }
});

export default EventCard;
