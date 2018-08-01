import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import colors from '../resources/colors';

class Tag extends PureComponent {
    render() {
        const { label, onPress, textStyle, style, isActive, onClose } = this.props;
        var fullStyle = [styles.buttonStyle, style];
        if (isActive) {
            fullStyle.push({backgroundColor: '#9bffe6', opacity: 1});
        }
        let iconClose = null;
        if(isActive) {
            iconClose =
            <TouchableOpacity style={styles.closeStyle}  onPress={() => onClose()}>
                <Image style={{width: 20}} resizeMode="contain" source={require('../images/icon-close.png')}/>
            </TouchableOpacity>
        }
        return (
            <View>
                <TouchableOpacity style={fullStyle} onPress={() => onPress()}>
                    <Text style={[styles.textStyle, textStyle]}>{label}</Text>
                </TouchableOpacity>
                {iconClose}
            </View>
        );
    }
}

Tag.propTypes = {
    label: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    width: PropTypes.number,
};
Tag.defaultProps = {
    onPress: function () {
    },
    onClose: function() {

    }
};

const styles = StyleSheet.create({
    textStyle: {
        fontSize:14,
        textAlign: 'center',
        color: '#677897',
        textAlignVertical: 'center'
    },
    buttonStyle: {
        backgroundColor: '#FFFFFF',
        shadowColor: 'rgba(89, 89, 89, 0.38)',
        shadowOpacity: 1,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 1
        },
        borderRadius: 2,
        overflow: 'hidden',
        paddingHorizontal: 8,
        paddingVertical: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    closeStyle: {
        width: 30,
        right: -10,
        bottom: -5,
        position: 'absolute',
        alignItems: 'center'
    }
});

export default Tag;
