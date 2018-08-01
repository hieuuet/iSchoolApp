import React, { PureComponent } from 'react';
import { Text, StyleSheet, View, Image, TouchableWithoutFeedback} from 'react-native';
import colors from '../styles/colors';
import common from '../styles/common';

class AnnouncementCard1 extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isopen: false
        };
    }

    _renderContent(post) {
        if(this.state.isopen) {
            return <Text style={styles.content}>{post.content}</Text>;
        }
    }

    _renderHeader(post) {
        if(this.state.isopen) {
            return (
                <View style={styles.headerWrap}>
                    <Text style={styles.publish_date}>{post.publish_date}</Text>
                    <Text style={styles.title}>{post.title}</Text>
                    <Image source={post.cover} resizeMode="cover" style={styles.cover} />
                </View>
            );
        }else{
            return (
                <View style={styles.headerFluidWrap}>
                    <Text style={styles.publish_date}>{post.publish_date}</Text>
                    <Text style={styles.title}>{post.title}</Text>
                    <Text style={styles.seen}>{post.short_description ? post.short_description : 'Xem thêm'}</Text>
                </View>
            );
        }
    }

    toggle(post) {
        if(post.content) {
            if(this.state.isopen) {
                this.setState({isopen: false});
            }else{
                this.setState({isopen: true});
            }    
        }
        console.log('Hello');
        this.props.onClick();
    }

    render() {
        const { post, style, onClick } = this.props;
        
        return (
            <TouchableWithoutFeedback onPress={()=> this.toggle(post)}>
            {/*<TouchableWithoutFeedback onPress={this.props.onClick}>*/}
                <View style={[styles.card, common.cardShadow, style]}>
                    {this._renderHeader(post)}
                    {this._renderContent(post)}
                    <Image source={post.cover} resizeMode="cover" style={styles.cover} />
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 8,
        marginBottom: 0,
        position: 'relative',
        overflow: 'hidden',
    },
    headerWrap: {
        backgroundColor: 'transparent',
        position: 'relative',
        padding: 15,
        overflow: 'hidden',
        paddingBottom: 0
    },
    headerFluidWrap: {
        backgroundColor: 'transparent',
        padding: 15,
        overflow: 'hidden',
        borderRadius: 8,
    },
    content: {
        backgroundColor: 'transparent',
        color: 'black',
        fontSize: 17,
        padding: 15,
        backgroundColor: '#fff',
        lineHeight: 25
    },
    title: {
        backgroundColor: 'transparent',
        color: '#ffffff',
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 16,
        marginTop: 6
    },
    subtitle: {
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 15,
        fontWeight: '500'
    },
    seen: {
        backgroundColor: 'transparent',
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
        backgroundColor: '#3a3a3a'
    }
});

export default AnnouncementCard1;