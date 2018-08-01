import React, { Component } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Slider from 'react-native-slider';
import * as Animatable from 'react-native-animatable';
import Video from 'react-native-video';
import Util from '../configs/util';
import colors from '../styles/colors';
import common from '../styles/common';

class PopupTextContent extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render () {
        let props = this.props;
        return (
        <Animatable.View animation={props.animationContainer} duration={500} style={styles.container}>
            <View style={{flexDirection: 'row'}}>
                <View style={{flex:1}}/>
                <TouchableOpacity onPress={props.closePopupText} style={{marginRight: 20, marginBottom: 10}} >
                    <Text style={{color: 'white', fontSize: 15}}>
                        ĐÓNG  ✕
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.wrap, common.cardShadow]}>
                <View style={{flexDirection: 'row'}}>
                    <View>
                        <Text style={styles.title}>{props.post.title}</Text>
                        <Text style={styles.date}>{props.isEvent?Util.diffDate(props.post.from_time, true) + ' - ' + Util.diffDate(props.post.to_time, true):Util.diffDate(props.post.publish_date, true)}</Text>
                    </View>
                </View>
                <View style={styles.line}></View>
                <Text style={styles.more}>{props.post.short_description}</Text>
            </View>

        </Animatable.View>
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
export default PopupTextContent;
