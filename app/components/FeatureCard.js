import React from 'react';
import { Text, StyleSheet, View, Image, TouchableWithoutFeedback } from 'react-native';
import colors from '../styles/colors';
import common from '../styles/common';
import LinearGradient from 'react-native-linear-gradient';

const FeatureCard = (props) => {
    let { onPress, cover, subtitle, title, desc, style } = props;
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={[styles.card, common.cardShadow, style]}>
                <LinearGradient colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0)']} style={[styles.layoutLinear,{ paddingBottom: 30 }]}>
                    <View>
                        <Text style={styles.topText}>{subtitle}</Text>
                        <Text style={styles.middleText}>{title}</Text>
                    </View>
                </LinearGradient>
                <View style={{ flex: 1 }} />
                <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.5)']} style={[styles.layoutLinear,styles.bottomContainer]}>
                    <Text style={styles.bottomText}>{desc}</Text>
                </LinearGradient>
                <Image source={cover } resizeMode="cover" style={styles.cover} />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'transparent',
        borderRadius: 8,
        marginBottom: 0,
        position: 'relative',
        overflow: 'hidden',
    },
    cover: {
        backgroundColor: 'transparent',
        position: 'absolute',
        zIndex: -1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#3a3a3a'
    },
    topText: {
        color: "rgba(255,255,255,0.9)",
        fontSize: 15,
    },
    middleText: {
        color: "white",
        fontSize: 28,
        marginTop: 5,
        fontWeight: 'bold'
    },
    bottomText: {
        color: "white",
        fontSize: 16,
    },
    layoutLinear: {
        padding: 15,
    },
    bottomContainer: {
        paddingTop: 30,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    }
});

export default FeatureCard;
