import React, { PureComponent } from 'react';
import { Platform, Text, StyleSheet, View, Image, TouchableWithoutFeedback,Dimensions,TouchableOpacity} from 'react-native';
import colors from '../styles/colors';
import common from '../styles/common';
import Video from 'react-native-video';
import Slider from 'react-native-slider';
import Util from '../configs/util'
import AudioModal from '../components/AudioModal';
import GifAndroid from "../components/GifAndroid";

const win = Dimensions.get('window');
class AnnouncementCard extends PureComponent {
    _renderContent(post) {
        return (
            <View style={styles.audioStyle}>
                {
                   (post.audio == null) &&
                   <Text style={styles.content}>{post.short_description}</Text>
                }
                {
                   (post.audio != null) &&
                    <View style={{alignItems: 'center', justifyContent: 'center', }}>
                        <TouchableOpacity onPress={()=>this.props.showPopupAudio(post)} style={styles.playContainer}>
                            <View style={styles.audioButton}>
                                <Image style={{width: 16, height: 16}} source={require('../images/icon-play.png')} />
                        </View>
                            <View style={{height:1, width:"50%", backgroundColor: colors.green }}/>
                            <View style={{width: 8, height: 8, borderRadius: 4, borderColor: colors.green, borderWidth: 1}} />
                            <Text style={{color: "rgb(132,132,132)", fontSize: 12, marginLeft: 15}}>
                                Nghe thông báo
                            </Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        );
    }

    _renderHeader(post) {
        return (
            <View style={styles.headerWrap}>
                <Text style={styles.subtitle}>{post.publish_date}</Text>
                <Text style={styles.title}>{post.title}</Text>
                <Image source={require('../images/aordgxsm.png')} resizeMode="cover" style={styles.cover} />
            </View>
        );
    }

    toggle(post) {
        if (post.content) {
            if (this.state.isopen) {
                this.setState({isopen: false});
            } else {
                this.setState({isopen: true});
            }
        }
    }

    render() {
        const { post, style, onClick } = this.props;
        return (
            <View style={[styles.card, style]}>
                {this._renderHeader(post)}
                {this._renderContent(post)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        borderWidth: Platform.OS === 'ios' ? 0 : 1,
        borderColor: 'rgba(0, 0, 0, 0.04)',
        margin: 15,
        marginBottom: 0,
        backgroundColor: '#fff',
        position: 'relative',
        overflow : 'hidden'

    },
    headerWrap: {
        position: 'relative',
        overflow: 'hidden'
    },
    headerFluidWrap: {
        padding: 15,
        overflow: 'hidden',
        borderRadius: 8,
    },
    content: {
        color: 'black',
        fontSize: 15,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#fff',
        lineHeight: 25
    },
    title: {
        backgroundColor: 'transparent',
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 15,
        marginBottom: 15
    },
    subtitle: {
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 15,
        fontWeight: '500',
        marginLeft: 15,
        marginTop: 15,
    },
    seen: {
        color: '#fff',
        fontSize: 16
    },
    cover: {
        position: 'absolute',
        zIndex: -1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#3a3a3a',
        width: '100%'
    },
    slider: {
        height: 20,
        marginTop: 5
    },
    sliderTrack: {
        width: 200,
        height: 4,
        backgroundColor: '#dddddd',
        borderRadius: 4
    },
    sliderThumb: {
        width: 14,
        height: 14,
        backgroundColor: '#e62565',
        borderRadius: 14 / 2,
        shadowColor: '#e62565',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 2,
        shadowOpacity: 1,
    },
    play: {
        width: 32,
        height: 32
    },
    timeInfo: {
        flexDirection: 'row',
    },
    time: {
        color: '#FFF',
        flex: 1,
        fontSize: 10,
    },
    timeRight: {
        color: '#FFF',
        textAlign: 'right',
        flex: 1,
        fontSize: 10,
    },
    audioStyle: {
        position: 'relative',
        zIndex: 0,
        overflow: 'hidden',
        paddingBottom: 5,
        backgroundColor: '#fff'
    },
    sliderContainer: {
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    modalBackdrop: {
        backgroundColor: '#EFEFF4',
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
		paddingHorizontal: 0
    },
    modalInner: {
        overflow: 'hidden',
        backgroundColor: '#EFEFF4',
        borderRadius: 0,
        width: '100%',
        maxHeight: '80%',
        position: 'relative'
    },
    playContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        paddingVertical: 10,
        flex: 1
    },
    audioButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: colors.green
    }
});

export default AnnouncementCard;
