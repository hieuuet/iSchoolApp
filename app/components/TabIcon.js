import React, { PureComponent } from 'react';
import { StyleSheet, Image,View } from 'react-native';
import common from '../styles/common';
import {connect} from 'react-redux';
import Util from '../configs/util';

class TabIcon extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            children : []
        };
    }

    componentWillMount() {
        Util.getItem('SAVED_USERINFO', true).then(userInfo => {
            this.setState({
                children : userInfo.children
            });
        });
    }

    render() {
        const { routeName, isactive } = this.props;
        let src;
        switch(routeName) {
            case 'Home':
                src = isactive ? require('../images/home-a.png'):require('../images/home.png');
                break;
            case 'Utility':
                src = isactive ? require('../images/utility-a.png'):require('../images/utility.png');
                break;
            case 'ClassRoom':
                src = isactive ? require('../images/classroom-a.png'):require('../images/classroom.png');
                break;
            case 'Setting':
                src = isactive ? require('../images/setting-a.png'):require('../images/setting.png');
                break;
        }
        if(routeName != 'Baby') {
            return (
                <Image style={styles.icon} resizeMode="contain" source={src} />
            );
        }else{
            return (
                this.state.children.length > 0 &&
                <View style={styles.avaWrap}><Image style={common.ava} resizeMode="cover" source={{uri : this.state.children[this.props.childIndex].profile_img}} /></View>
            );
        }
    }
}

const styles = StyleSheet.create({
    icon: {
       height: 24,
       width: 24
    },
    avaWrap: {
        borderWidth: 5,
        borderColor: '#fd4176',
        width: 40,
        height: 40,
        overflow: 'hidden',
        borderRadius: 67,
        marginTop: 5
    },
});

function mapStateToProps(state) {
    return  {
        childIndex : state.childIndex
    }
}

export default connect(mapStateToProps, null)(TabIcon);
