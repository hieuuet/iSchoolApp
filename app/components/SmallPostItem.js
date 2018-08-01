import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import colors from '../resources/colors';

class SmallPostItem extends PureComponent {
    render() {
        const { title, areaTitle, areaType, onPress, style, background, pushlishDate, showDate} = this.props;
        let areaTitleView = null;
        if(areaTitle && areaType) {
            var areaTitleBackgroundColor = '#bcbcbc';
            if (areaType == 1) {
                areaTitleBackgroundColor = colors.primaryColor;
            } else if (areaType == 2) {
                areaTitleBackgroundColor = '#f7c640';
            } else if (areaType == 3) {
                areaTitleBackgroundColor = '#23aaff';
            }
            var backgroundColorStyle = {
                backgroundColor: areaTitleBackgroundColor
            };
            areaTitleView = <Text style={[styles.areaTitle, backgroundColorStyle]}>{areaTitle}</Text>
        }
        return (
            <TouchableOpacity style={[styles.wrapper, style]} onPress={() => onPress()}>
                <View style={styles.bgWrap}>
                    <Image style={styles.background} resizeMode="cover" source={background} />
                    {areaTitleView}
                    <View style={{width:25, height:20, position: 'absolute', bottom: 0, right: 0, zIndex: 50, opacity: 0.8, backgroundColor: '#fff', borderTopLeftRadius: 10}}>
                    </View>
                    <Image style={{width:13, height:13, position: 'absolute', bottom: 3, right: 5, zIndex: 100}} source={require('../images/camera.png')} />
                </View>
                <Text ellipsizeMode='tail' numberOfLines={3} style={[styles.textStyle]}>{title}</Text>
                <Text style={[styles.time, {opacity: this.props.showDate?1:0}]}>{pushlishDate}</Text>
            </TouchableOpacity>
        );
    }
}

SmallPostItem.defaultProps = {
    onPress: function () {
    }
};

const styles = StyleSheet.create({
    bgWrap: {
        position: 'relative',
        shadowOpacity: 1,
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowRadius: 5,
        borderRadius: 8,
        overflow: 'hidden'
    },
    areaTitle: {
        left: 0,
        bottom: 0,
        color: 'white',
        position: 'absolute',
        paddingVertical: 2,
        paddingLeft: 5,
        paddingRight: 7,
        borderTopRightRadius: 10,
        fontSize: 10
    },
    textStyle: {
        fontSize:15,
        color: '#404040',
        paddingHorizontal: 12,
        flex: 1
    },
    wrapper: {
        borderBottomWidth: 1,
        borderBottomColor: '#cacaca',
        padding: 12,
        justifyContent: 'space-between',
        flexDirection: 'row',
        flex: 1,
        borderRadius: 8,
        overflow: 'hidden',
    },
    background: {
        height: 84,
        width: 124,
        borderRadius: 8,
    },
    time: {
        position: 'absolute',
        bottom: 10,
        right: 12,
        color:'#b2b2b2'
    }
});

export default SmallPostItem;
