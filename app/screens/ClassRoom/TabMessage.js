import React, { Component, PureComponent} from 'react';
import {ScrollView, Text, StyleSheet} from "react-native";
import InfoCard from "../../components/InfoCard";
import ContactCard from "../../components/ContactCard";
import common from '../../styles/common';
import colors from '../../styles/colors';
import ConversationItem from "../../components/ConversationItem";

export default class TabMessage extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

	render() {
		return (
            <ScrollView>
                <ConversationItem
                    data={{
                        user: 'Michael Cole',
                        avatar: "https://avatarfiles.alphacoders.com/522/52255.jpg",
                        mail: '@mjcole',
                        time: 'Now',
                        isNew: true,
                        message: 'See you at the show tonight!'
                    }}
                    onPress={() => this.props.navigation.navigate("ClassMessage")}
                />
                <ConversationItem
                    data={{
                        user: 'Sofia Griffin',
                        avatar: "https://avatarfiles.alphacoders.com/522/52255.jpg",
                        mail: '@griffinsof',
                        time: '3m',
                        message: 'Sounds good to me! 🍜'
                    }}
                    onPress={() => this.props.navigation.navigate("ClassMessage")}
                />
            </ScrollView>
        );
	}
}

const styles = StyleSheet.create({
    dividerTitle: {
        paddingVertical: 8,
        color: colors.gray,
        paddingLeft: 15,
        backgroundColor: '#fff',
        marginTop: 15
    }
});
