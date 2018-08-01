import React, { PureComponent } from 'react';
import { Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';

const MAINCOLOR = 'rgb(118,197,36)'
const SECONDCOLOR = 'rgb(171,180,189)'
const widthScreen = Dimensions.get('window').width

class TecherEvaluation extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            liked: false
        }
    }
    render() {
        // let { message, imgPost, time, user, mail, commentCounter, isNew }
        let data = this.props.data
        return (
            <View onLayout={this.props.onLayout} style={styles.container}>
                <View style={styles.header}>
                    <Image
                        source={{uri: data.avatar}}
                        style={styles.ava} />
                    <View style={styles.userContainer}>
                        <Text style={styles.user}>{data.user}</Text>
                        <Text style={styles.mail}>{data.mail}</Text>
                    </View>
                    <View style={styles.time}>
                        {data.isNew && <View style={styles.dot} />}
                        <Text>{data.time}</Text>
                    </View>
                </View>
                <View style={styles.body}>
                    {data.message &&
                        <Text>{data.message}</Text>
                    }
                    {data.imgPost &&
                        <Image
                            source={{ uri: data.imgPost }}
                            style={styles.imgPost}
                        />
                    }
                </View>
            </View>
        )
    }
}

const styles = {
    container: {
        marginLeft: 15,
        marginTop: 15,
        marginRight: 15,
        backgroundColor: 'rgb(255,255,255)',
        borderRadius: 10,
        shadowColor: 'grey',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        elevation: 1,
    },
    header: {
        flexDirection: 'row',
        padding: 12,
        borderRadius: 10
    },
    body: {
        paddingHorizontal: 12,
        paddingBottom: 12
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    },
    userContainer: {
        marginLeft: 5
    },
    ava: {
        width: 36,
        height: 36,
        borderRadius: 18,
        resizeMode: 'cover'
    },
    user: {
        fontSize: 14,
        fontWeight: '500'
    },
    mail: {
        fontSize: 12,
        fontWeight: '400',
        color: SECONDCOLOR,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: MAINCOLOR,
        marginRight: 5
    },
    time: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 20,
        right: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    avaFriend: {
        width: 20,
        height: 20,
        borderRadius: 10,
        resizeMode: 'contain',
    },
    avaContainer: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginLeft: -7,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconSelected: {
        width: 22,
        height: 22,
        resizeMode: 'contain',
        tintColor: MAINCOLOR
    },
    icon: {
        width: 22,
        height: 22,
        resizeMode: 'contain',
        tintColor: SECONDCOLOR
    },
    iconContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        right: 15
    },
    imgPost: {
        width: widthScreen - 30,
        height: widthScreen * 9 / 16,
        resizeMode: 'contain'
    }
}
export default TecherEvaluation;
