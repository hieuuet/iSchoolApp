import React, { Component, PureComponent } from 'react';
import { ScrollView, View, StyleSheet, Image, Text, Keyboard, Platform } from "react-native";
import colors from '../../styles/colors';
import common from '../../styles/common';
import PageHeader from "../../components/PageHeader";
import ChatBubble from "../../components/ChatBubble";
import InputChat from "../../components/InputChat";
import HeaderBack from "../../components/HeaderBack";


export default class ClassMessage extends PureComponent {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            
        };
    }

    renderInput = () => {
        return (
            <InputChat 
            />
        )
    }

    render() {

        return ( 
            <View style={{flex:1}}>
                <HeaderBack title="cô Hường (chủ nhiệm)" backgroundColor={colors.orange} onPressLeft={() => this.props.navigation.goBack()}/>
                <ScrollView>
                    <ChatBubble message="sjnfakjasbfka" avatar="https://avatarfiles.alphacoders.com/522/52255.jpg" />
                    <ChatBubble message="sjnfakjasbfka" avatar="https://avatarfiles.alphacoders.com/522/52255.jpg" avatarLeft />
                    <ChatBubble message="sjnfakjasbfka" avatar="https://avatarfiles.alphacoders.com/522/52255.jpg" />
                    <ChatBubble message="sjnfakjasbfka" avatar="https://avatarfiles.alphacoders.com/522/52255.jpg" avatarLeft />
                    <ChatBubble message="sjnfakjasbfka" avatar="https://avatarfiles.alphacoders.com/522/52255.jpg" />
                    <ChatBubble message="sjnfakjasbfka" avatar="https://avatarfiles.alphacoders.com/522/52255.jpg" avatarLeft />
                </ScrollView>
                {this.renderInput()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        height: 198,
        backgroundColor: colors.orange,
        flexDirection: 'column',
        alignItems: 'center'
    },
    avaWrap: {
        width: 90,
        height: 90,
        borderWidth: 3,
        borderColor: '#fff',
        borderRadius: 90,
        overflow: 'hidden',
        marginTop: 25
    },
    ava: {
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 22,
        color: '#fff',
        marginTop: 16,
        marginBottom: 6,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 15,
        color: '#fff'
    },
    card: {
        backgroundColor: 'white',
        margin: 15,
        borderRadius: 8,
        padding: 20
    },
    cardPara: {
        color: 'black',
        fontSize: 17,
        marginBottom: 2
    },
    cardSubtitle: {
        color: colors.gray,
        fontSize: 13,
    },
    cardTopTitle: {marginBottom: 14, fontWeight: 'bold'},
    cardDivider: {
        borderTopWidth: 1,
        borderTopColor: '#d8d8d8',
        marginVertical: 15
    }
});