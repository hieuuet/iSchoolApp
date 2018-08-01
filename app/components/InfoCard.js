import React, { PureComponent } from 'react';
import { Text, StyleSheet, View, Image, TouchableWithoutFeedback} from 'react-native';
import colors from '../styles/colors';
import common from '../styles/common';

class InfoCard extends PureComponent {

    _renderArrow(show) {
        if(show == false) {
           return null;
        }
        return <Image style={styles.arrow} resizeMode="contain" source={require('../images/arrow-right.png')} />;
    }

    render() {
        const { title, subtitle, thumb, showarrow, onPress, isMaster, subject } = this.props;

        return (
            <TouchableWithoutFeedback onPress={()=>onPress()}>
                <View style={[styles.card, common.cardShadow]}>
                    <View style={styles.roundImageWrap}>
                        <Image style={styles.thumb} resizeMode="cover" source={{uri: thumb}} />
                    </View>
                    <View style={styles.contentWrap}>
                        <Text style={styles.title}>{title}</Text>
                        <View style={{flexDirection:'row'}}><Text style={[styles.subtitle, isMaster ? {color: colors.orange} : {}]}>{isMaster ? "Giáo viên chủ nhiệm" : "Giáo viên bộ môn"}</Text><Text style={styles.subtitle}> - {subject}</Text></View>
                    </View>
                    {this._renderArrow(showarrow)}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

InfoCard.defaultProps = {
    onPress: function () {
    }
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 8,
        position: 'relative',
        backgroundColor: '#fff',
        margin: 10,
        marginBottom: 0,
        flexDirection: 'row',
        padding:5

    },
    contentWrap: {
        marginLeft: 10
    },
    roundImageWrap: {
        overflow: 'hidden',
        width: 60,
        height: 60,
        borderRadius: 100,
        backgroundColor: colors.gray
    },
    thumb: {
        width: 61,
        height: 61
    },
    title: {
        fontSize: 21,
        color: '#020202',
        marginBottom: 3
    },
    subtitle: {
        color: colors.gray,
        fontSize: 13
    },
    arrow: {
        position: 'absolute',
        right: 16,
        top: 26,
        height: 20
    },
});

export default InfoCard;
