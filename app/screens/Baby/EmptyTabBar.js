const React = require('react');
const { ViewPropTypes, TouchableOpacity, Image } = ReactNative = require('react-native');
const PropTypes = require('prop-types');
const createReactClass = require('create-react-class');
const {
    StyleSheet,
    Text,
    View,
    Animated,
} = ReactNative;

const DefaultTabBar = createReactClass({
    propTypes: {
        goToPage: PropTypes.func,
        activeTab: PropTypes.number,
        tabs: PropTypes.array,
        backgroundColor: PropTypes.string,
        activeTextColor: PropTypes.string,
        inactiveTextColor: PropTypes.string,
        textStyle: Text.propTypes.style,
        tabStyle: ViewPropTypes.style,
        renderTab: PropTypes.func,
        underlineStyle: ViewPropTypes.style,
    },

    getDefaultProps() {
        return {
            activeTextColor: 'navy',
            inactiveTextColor: 'black',
            backgroundColor: null,
        };
    },

    renderTabOption(name, page) {
    },

    renderTab(name, page, isTabActive, onPressHandler) {
        const { activeTextColor, inactiveTextColor, textStyle, } = this.props;
        const textColor = isTabActive ? activeTextColor : inactiveTextColor;
        const fontWeight = isTabActive ? 'bold' : 'normal';

        return <TouchableOpacity
          style={{flex: 1}}
          key={name}
          accessible={true}
          accessibilityLabel={name}
          accessibilityTraits='button'
          onPress={() => onPressHandler(page)}
        >
            <View style={[styles.tab, this.props.tabStyle, ]}>
                <Image style={{maxWidth: 18, height: 16, marginTop: 10}} source={this._renderTabIcon(page, isTabActive)} />
                <Text style={[{color: textColor, fontWeight, }, textStyle, ]}>{name}</Text>
            </View>
        </TouchableOpacity>;
    },

    _renderTabIcon(page, isTabActive) {
        let src = null;
        switch(page) {
            case 0:
                src = isTabActive ? require('../../images/class-contact-a.png') : require('../../images/class-contact.png');
            break;
            case 1:
                src = isTabActive ? require('../../images/class-teacher-a.png') : require('../../images/class-teacher.png');
            break;
            case 2:
                src = isTabActive ? require('../../images/classroom-a.png') : require('../../images/classroom.png');
            break;
        }
        return src;
    },

    render() {
        return null;
    },
});

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
        flexDirection: 'column'
    },
    tabs: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: '#ccc',
    },
});

module.exports = DefaultTabBar;
