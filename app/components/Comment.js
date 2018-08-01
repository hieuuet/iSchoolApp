import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet, Image, View, TextInput, FlatList } from 'react-native';
import colors from '../resources/colors';
import MButton from './MButton';

class Comment extends Component {
    _renderSeparator() {
        return (
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "#cacaca",

            }}
          />
        );
      };
    render() {
        const { title, onPress, subtitle, style, background, comments, value, onChange, userInfor} = this.props;
        // const comments = [
        //     {key: 1, avatar: require('../images/temp/ftn1.jpg'), time: '2 tiếng trước', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit'},
        //     {key: 2, avatar: require('../images/temp/ftn1.jpg'), time: 'vừa xong', content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
        // ];
        let footerComment = null;
        if(userInfor) {
            footerComment =
            <View style={styles.footer}>
                <MButton
                    style={styles.send}
                    label="GỬI BÌNH LUẬN"
                    onPress={onPress}/>
            </View>
        }
        let inputComment = null;
        if(userInfor) {
            inputComment =
            <TextInput
            multiline={true}
            numberOfLines={4}
            style={styles.input}
            placeholder={'Nội dung bình luận'}
            value={value}
            onChangeText={onChange}/>
        }
        return (
            <View style={[styles.wrapper, style]}>
                {inputComment}
                {footerComment}
                {
                    comments.length > 0 &&
                    <FlatList style={{backgroundColor: '#fff', padding: 10,  borderRadius: 4}}
                        scrollEnabled={false}
                        data={comments}
                        renderItem={
                            ({item}) =>
                                (
                                    <View style={styles.cmtWrap}>
                                        <View style={styles.cmtRow}>
                                            <View style={styles.cmtAvatarWrap}>
                                                {/* <Image style={styles.avatar} resizeMode="cover" source={require('../images/temp/ftn1.jpg')} /> */}
                                            </View>
                                            <View style={{flex: 1}}>
                                                <Text style={styles.cmtName}>{item.name}</Text>
                                                <Text style={styles.cmtContent}>{item.content}</Text>
                                            </View>
                                        </View>
                                        <Text style={styles.cmtTime}>{item.time}</Text>
                                    </View>
                                )
                        }
                        keyExtractor={(item, index) => index}
                        ItemSeparatorComponent={() => this._renderSeparator()}
                    />
                }

            </View>
        );
    }
}

Comment.defaultProps = {
    onPress: function () {
    },

    onChange: function() {

    }
};

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 12,
        paddingVertical: 12,
        paddingLeft: 12,
        borderRadius: 4,
        backgroundColor: '#efeff4'
    },
    input: {
        height: 148, borderRadius: 4, backgroundColor: 'white', padding: 12, marginBottom: 11, color: '#677897',
        paddingTop: 18,
        fontSize: 16
    },
    send: {
        height: 46,
        width: 147
    },
    footer: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    userWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%'
    },
    username: {
        color: '#677897',
        fontSize: 14,
        marginLeft: 10
    },
    avatarWrap: {
        overflow: 'hidden',
        borderRadius: 100,
        width: 44,
        height: 44,
    },
    avatar: {
        width: '100%',
        height: '100%',
        marginRight: 10
    },
    cmtAvatarWrap: {
        overflow: 'hidden',
        borderRadius: 60,
        width: 30,
        height: 30,
    },
    cmtRow: {
        flexDirection: 'row',
        // justifyContent: 'space-between'
    },
    cmtContent: {
        fontSize: 14,
        marginLeft: 10,
        paddingRight: 20
    },
    cmtTime: {
        fontSize: 12,
        color: 'gray',
        position: 'absolute',
        right: 0,
        bottom: 0
    },
    cmtWrap: {
        position: 'relative',
        paddingBottom: 20,
        marginBottom: 20,
        marginTop: 10
    },
    cmtName: {
        fontSize: 14,
        marginLeft: 10,
        paddingRight: 20
    }
});

export default Comment;
