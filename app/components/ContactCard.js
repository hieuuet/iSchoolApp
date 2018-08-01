import React, { PureComponent } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, Linking } from 'react-native';
import colors from '../styles/colors';
import common from '../styles/common';

class ContactCard extends PureComponent {

    openURL = (url) => {
        Linking.openURL(url);
    }

    render() {
        const { title, subtitle, thumb, showarrow, phone } = this.props;

        return (
            <View style={[styles.card]}>
                <View style={styles.roundImageWrap}>
                    <Image style={styles.thumb} resizeMode="cover" source={{uri: thumb}} />
                </View>
                <View style={styles.contentWrap}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{subtitle}</Text>
                </View>
                <View style={styles.iconWrap}>
                    <TouchableOpacity onPress={() => {
                        this.openURL("tel:"+phone);
                    }}>
                        <Image style={styles.icon} resizeMode="contain" source={require('../images/phone.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        this.openURL("sms:"+phone);
                    }}>
                        <Image style={styles.icon} resizeMode="contain" source={require('../images/email.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 8,
        position: 'relative',
        marginBottom: 0,
        padding: 10,
        borderBottomColor: '#ceced2',
        borderBottomWidth: 1,
        flexDirection: 'row'
    },
    contentWrap: {
        marginLeft: 10
    },
    roundImageWrap: {
        overflow: 'hidden',
        width: 36,
        height: 36,
        borderRadius: 100,
        backgroundColor: colors.gray
    },
    thumb: {
        width: 37,
        height: 37
    },
    title: {
        fontSize: 16
    },
    subtitle: {
        color: colors.gray,
        fontSize: 13
    },
    icon: {
        height: 20,
        width: 20,
        marginRight: 16
    },
    iconWrap: {
        marginRight: 20,
        position: 'absolute',
        right: 0,
        flexDirection: 'row',
        top: 20
    }
});

export default ContactCard;
