import React, { Component, PureComponent } from "react";
import {
    View,
    Image,
    Text,
    StyleSheet
} from "react-native";
import ScoreCard from '../../components/ScoreCard'
import colors from '../../styles/colors';
import HeaderBack from "../../components/HeaderBack";

export default class BabyScoreBoard extends PureComponent {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <HeaderBack
                    backgroundColor={'#fd4176'}
                    title={"Giám sát Camera"}
                    iconRight={require("../../images/icon-menu.png")}
                    onPressLeft={()=>this.props.navigation.goBack()}
                />
                <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row' }} >
                    <ScoreCard
                        subject='TOÁN'
                        score='8.4'
                        percent='+14%'
                    />
                    <ScoreCard
                        subject='TOÁN'
                        score='8.4'
                        percent='+14%'
                    />
                    <ScoreCard
                        subject='TOÁN'
                        score='8.4'
                        percent='+14%'
                    />
                    <ScoreCard
                        subject='TOÁN'
                        score='8.4'
                        percent='+14%'
                    />
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        margin: 10
    }
});
