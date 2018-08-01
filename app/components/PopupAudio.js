import React, { Component } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Slider from 'react-native-slider';
import * as Animatable from 'react-native-animatable';
import Video from 'react-native-video';
import Util from '../configs/util';

class PopupAudio extends Component {

    constructor(props) {
        super(props);
        this.state = {
            playing : true,
            sliding : false,
            currentTime : 0
        };
    }

    onLoad = (params) => {
        this.setState({ songDuration: params.duration });
    }

    onToggle = () => {
        this.setState({playing : !this.state.playing});
    }

    onSlidingStart = () => {
        this.setState({ sliding: true });
    }

    onSlidingChange = (value) => {
        let newPosition = value * this.state.songDuration;
        this.setState({ currentTime: newPosition });
    }

    onSlidingComplete = () => {
        this.refs.audio.seek( this.state.currentTime );
        this.setState({ sliding: false });
    }

    onEnd = () => {
        this.setState({ playing: false });
        this.setState({ currentTime: 0 });
        this.refs.audio.seek(0);
    }

    onProgress = (params) => {
        if(!this.state.sliding ){
            this.setState({ currentTime: params.currentTime });
        }
    }

    render () {
        let props = this.props;
        let toggleButton = this.state.playing ? <TouchableOpacity onPress={this.onToggle}><Image source={require('../images/pause-circle.png')} resizeMode="contain" style={ styles.play } /></TouchableOpacity>
        : <TouchableOpacity onPress={this.onToggle}><Image source={require('../images/play-circle.png')} resizeMode="contain" style={ styles.play } /></TouchableOpacity>;

        let songPercentage;
        if( this.state.songDuration !== undefined){
            songPercentage = this.state.currentTime / this.state.songDuration;
        } else {
            songPercentage = 0;
        }

        let remainDuration;
        if( this.state.songDuration !== undefined){
            remainDuration = this.state.songDuration - this.state.currentTime ;
        } else {
            remainDuration = this.state.songDuration;
        }
        let remainTime = Util.convertSecondToTime(remainDuration);

        return (
        <Animatable.View animation={props.animationContainer} duration={500} style={styles.container}>
            <View style={{flexDirection: 'row'}}>
                <View style={{flex:1}}/>
                <TouchableOpacity onPress={props.closePopupAudio} style={{marginRight: 20, marginBottom: 10}} >
                    <Text style={{color: 'white', fontSize: 15}}>
                        ĐÓNG  ✕
                    </Text>
                </TouchableOpacity>
            </View>
            <Animatable.View animation={props.animation} duration={500} style={styles.popupInfo}>
                <View style={{padding: 15}}>
                <View style={{flexDirection: 'row'}}>
                        <Image source={require('../images/clock-a.png')} resizeMode="contain" style={styles.icon} />
                        <Text style={styles.date}>{props.post.publish_date}</Text>
                    </View>
                    <Text style={styles.title}>{props.post.title}</Text>
                    <Video source={{uri: props.post.audio }}
                        ref="audio"
                        volume={1.0}
                        ignoreSilentSwitch={"ignore"}
                        muted={false}
                        paused={!this.state.playing}
                        onProgress={ this.onProgress }
                        onEnd={ this.onEnd }
                        onLoad={this.onLoad}
                        resizeMode="cover"
                        repeat={false}
                        />
                    <View style={styles.audioInfo}>
                        { toggleButton }
                        <View style={{flex: 1}}>
                            <Slider
                                onSlidingStart={ this.onSlidingStart }
                                onSlidingComplete={ this.onSlidingComplete }
                                onValueChange={ this.onSlidingChange }
                                minimumTrackTintColor='#73c700'
                                style={ styles.slider }
                                trackStyle={ styles.sliderTrack }
                                thumbStyle={ styles.sliderThumb }
                                value={ songPercentage }
                            />
                        </View>
                        <View style={{width: 50, marginLeft: 15 }}>
                            <Text style={ styles.songTime }>{remainTime ? remainTime : '00:00'}</Text>
                        </View>
                    </View> 
                </View>
                {/*<Image style={{width: "100%", height: "40%"}} source={require("../images/demo/banner-ads.jpg")} />*/}
            </Animatable.View>
        </Animatable.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    popupInfo: {
        width: Dimensions.get('window').width - 40,
        backgroundColor: "#efeff4",
        borderRadius: 7,
    },
    audioInfo: {
        flexDirection: 'row',
        paddingVertical: 10,
        alignItems:'center',
        width: '100%'
    },
    icon: {
        width: 16,
        height: 16,
        marginRight: 12
    },
    title: {
        color: 'rgb(2,37,72)',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 5
    },
    date: {
        fontSize: 13,
        color: '#999999',
    },
    slider: {
        height: 20,
        marginLeft: 5,
    },
    sliderTrack: {
        width: Dimensions.get('window').width - 160,
        height: 4,
        backgroundColor: '#dddddd',
        borderRadius: 4,
    },
    sliderThumb: {
        width: 14,
        height: 14,
        backgroundColor: '#73c700',
        borderRadius: 14 / 2,
        shadowColor: '#e62565',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 2,
        shadowOpacity: 1,
    },
    play: {
        width: 40,
        height: 40,
        tintColor: '#73c700',
    },
});
export default PopupAudio;
