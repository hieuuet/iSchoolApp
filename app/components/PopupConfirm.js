import React, { Component } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Slider from 'react-native-slider';
import * as Animatable from 'react-native-animatable';
import Video from 'react-native-video';
import Util from '../configs/util';
import colors from '../styles/colors'

class PopupComfirm extends Component {

    render () {
        let props = this.props;
        return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row'}}>
                <View style={{flex:1}}/>
                <TouchableOpacity onPress={props.closePopup} style={{marginRight: 20, marginBottom: 10}} >
                    <Text style={{color: 'white', fontSize: 15}}>
                        ĐÓNG  ✕
                    </Text>
                </TouchableOpacity>
            </View>
            <Animatable.View animation={props.animation} duration={500} style={[styles.popupInfo, props.style]}>

                  <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    {props.children}
                  </View>
                  {!!props.txtActivePopup &&
                    <TouchableOpacity onPress={props.onPress} style={styles.btn}>
                      <Text style={styles.btnTxt}>{props.txtActivePopup}</Text>
                    </TouchableOpacity>
                  }

            </Animatable.View>
        </View>
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
      padding: 20,
      backgroundColor: "#efeff4",
      borderRadius: 7,
      overflow: 'hidden',
      backgroundColor: 'white'
    },
    btn: {
      width: 155,
      height: 50,
      backgroundColor: colors.pink,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: 20,
      shadowColor: colors.pink,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 2,
  },
  btnTxt: {
      color: 'white',
      fontWeight: '600',
      fontSize: 14
  },
});
export default PopupComfirm;
