import React, { Component } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Slider from 'react-native-slider';
import * as Animatable from 'react-native-animatable';
import Video from 'react-native-video';
import Util from '../configs/util';
import colors from '../styles/colors'

class PopupActiveInDay extends Component {

    renderItem = () => {
      return (
        <View style={{marginTop: 10}}>
          <Text style={{fontSize: 14, color: 'rgb(103,120,151)'}}>
            Bữa sáng
          </Text>
          <Text style={{fontSize: 16, color: 'rgb(45,62,79)'}}>
            Sup bò khoai tây
          </Text>
          <View style={{width: '100%', height: 1, marginVertical: 10, backgroundColor: 'rgb(171,180,189)'}} />
        </View>
      )
    }

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
            <Animatable.View style={[styles.popupInfo, props.style]}>
              <View style={{alignItems: 'center', height: '80%'}}>
                <Text style={{fontSize: 14, marginTop: 15, color: 'rgb(103,120,151)'}}>
                  Thực đơn trong ngày
                </Text>
                <View style={{flexDirection: 'row', marginBottom: -25, marginTop: 20, width: '100%', paddingHorizontal: 10, zIndex: 1000}}>
                  <View style={{height: 50,  width: 100, backgroundColor: '#fd4176', borderRadius: 3, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 14, color: 'white', fontWeight: 'bold'}}>
                      Thứ 2
                    </Text>
                  </View>
                  <View style={{flex: 1}}/>
                  <Image style={{width: 50, height: 50}} source={require('../images/baby/decoVeg1.png')} />
                </View>
                <View style={{height: '100%', width: '100%',paddingHorizontal: 10, paddingVertical: 20, borderRadius: 7, borderWidth: 1, borderColor: '#fd4176'}}>
                  {this.renderItem()}
                  {this.renderItem()}
                  {this.renderItem()}
                  {this.renderItem()}
                </View>
              </View>
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
      padding: 10,
      backgroundColor: "#efeff4",
      borderRadius: 7,
      overflow: 'hidden',
      backgroundColor: 'white'
    },
});
export default PopupActiveInDay;
