import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, Dimensions, TextInput } from 'react-native';

const width = Dimensions.get("window").width

const SettingInput = props => {

    return (
        <TouchableOpacity style={[styles.container, { flexDirection: 'row' }, props.style]} onPress={() => this['input' + props.index].focus()} >
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>{props.item.title.toUpperCase()}</Text>
                <TextInput
                    ref={(ref) => { this['input' + props.index] = ref }}
                    value={props.value}
                    secureTextEntry={props.item.security}
                    placeholder={props.item.placeholder || null}
                    onChangeText={props.onChangeText}
                    editable={props.item.editable}
                    style={styles.info}
                    underlineColorAndroid='rgba(0,0,0,0)'
                />
            </View>
            <View style={{ justifyContent: 'flex-end' }}>
                <Image
                    source={require('../images/pencil.png')}
                    style={styles.icon}
                />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        backgroundColor: 'rgb(255,255,255)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(219,219,221)'

    },
    title: {
        color: 'rgb(161,66,239)',
        fontSize: 10,
        fontWeight: '800'
    },
    info: {
        marginTop: 15,
        fontSize: 17
    },
    icon: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    }
})

export default SettingInput;
