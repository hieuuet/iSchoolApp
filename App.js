import React, { Component } from 'react';
import { TabNavigator,TabBarBottom,StackNavigator } from 'react-navigation';
import {
    View,
    Text,
    StyleSheet,
    Image,
    BackHandler,
    Platform
} from 'react-native';
import Home from './app/screens/Home/Home';
import PostDetail from './app/screens/Home/PostDetail';
import Setting from './app/screens/Setting/Setting';
import SettingAccount from './app/screens/Setting/SettingAccount';
import SettingPassword from './app/screens/Setting/SettingPassword';
import About from './app/screens/Setting/About';
import Utility from './app/screens/Utility/Utility';
import ClassRoom from './app/screens/ClassRoom/ClassRoom';
import Baby from './app/screens/Baby/BabyNew';
import BabyScoreBoard from './app/screens/Baby/BabyScoreBoard';
import BabySchedule from './app/screens/Baby/BabySchedule';
import BabyMenu from './app/screens/Baby/BabyMenu';
import BabyAlbum from './app/screens/Baby/BabyAlbum';
import BabyGallery from './app/screens/Baby/BabyGallery';
import BabyDiary from './app/screens/Baby/BabyDiary';
import Login from './app/screens/Auth/Login';
import Teacher from './app/screens/ClassRoom/Teacher';
import TabIcon from './app/components/TabIcon';
import ClassMessage from './app/screens/ClassRoom/ClassMessage';
import Register from './app/screens/Auth/Register'
import PushNotificationCallback from './app/screens/PushNotificationCallback/PushNotificationCallback'

import Util from './app/configs/util';
import Api from './app/api/api';
import Constant from './app/configs/constant';
import _ from 'lodash';
import { Provider } from 'react-redux';
import store from './app/redux/store';
import * as actionCreators from './app/redux/actionCreators';
import DeviceInfo from 'react-native-device-info';

const ClassRoomStack = StackNavigator({
  ClassRoom: { screen: ClassRoom },
  Teacher: { screen: Teacher },
  ClassMessage: { screen: ClassMessage },
}, {
  navigationOptions: {
    header: null
  }
});

const HomeStack = StackNavigator({
  Home: { screen: Home },
  PostDetail: { screen: PostDetail },
}, {
  navigationOptions: {
    header: null
  }
});

const BabyStack = StackNavigator({
  Baby: { screen: Baby },
  BabyScoreBoard: { screen: BabyScoreBoard },
  BabySchedule: { screen: BabySchedule },
  BabyMenu: { screen: BabyMenu },
  BabyAlbum: { screen: BabyAlbum },
  BabyGallery: { screen: BabyGallery },
  BabyDiary: { screen: BabyDiary },
},
  {
    navigationOptions: {
      header: null
    }
  })

const SettingStack = StackNavigator({
  Setting: { screen: Setting },
  SettingAccount: { screen: SettingAccount },
  SettingPassword: { screen: SettingPassword },
  About: { screen: About },
},
  {
    navigationOptions: {
      header: null
    }
  })

const MainTabNavigator = TabNavigator({
	Home: { screen: HomeStack },
    ClassRoom: { screen: ClassRoomStack },
    Baby: { screen: BabyStack },
    Utility: { screen: Utility },
    Setting: { screen: SettingStack },
},
{
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        return <TabIcon routeName={routeName} isactive={focused} />;
      },

      tabBarLabel: ({ focused, tintColor }) => {
		const { routeName } = navigation.state;
        let label;

        switch(routeName) {
        	case 'Home':
          		label = 'CẬP NHẬT';
        		break;
      		case 'Utility':
        		label = 'TIỆN ÍCH';
          		break;
      		case 'ClassRoom':
        		label = 'LIÊN LẠC';
          		break;
            case 'Baby':
                label = '';
                break;
      		case 'Setting':
        		label = 'CÀI ĐẶT';
          		break;
        }
        if(routeName == 'Baby') return null;
        return <Text style={{fontSize: 9, color: '#abb4bd', fontWeight: 'bold',marginBottom: 5, alignSelf: 'center'}}>{label}</Text>;
      }
    }),
    initialRouteName: 'Baby',
    tabBarOptions: {
      	style: {
          backgroundColor: '#fff',
	      borderTopWidth: 0,
	      height: 60,
          marginBottom: 0,
          paddingBottom: 0,
          borderTopWidth: 1,
          borderTopColor: '#ccc'
      	}
    },
    tabBarComponent: ({ jumpToIndex, ...props }) => (
        <TabBarBottom
            {...props}
            jumpToIndex={(index) => {
                    if(props.navigation.state.index === index) {
                        props.navigation.dispatch(NavigationActions.back());
                    } else {
                        jumpToIndex(index);
                        App.currentTab = index;
                    }
                }
            }
        />
    ),
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
});

export default class App extends React.Component {
    static currentTab = 2;
    constructor(props) {
        super(props);
        this.state = {
            loggedIn : false,
            ready : false
        };
    }

    componentWillMount() {
        this.init();
    }

    init = async () => {
        console.disableYellowBox = true;
        let $this = this;

        let savedUserInfoStr = await Util.getItem('SAVED_USERINFO');
        if (savedUserInfoStr !== null) {
            if(!_.isEmpty(savedUserInfoStr)) {
                var savedUserInfo = JSON.parse(savedUserInfoStr);
                if (savedUserInfo.children.length > 0) {
                    let savedChildIndex = await Util.getItem('SAVED_CHILD_INDEX');
                    savedChildIndex = savedChildIndex !== null ? parseInt(savedChildIndex) : 0;
                    store.dispatch(actionCreators.changechildIndexAction(savedChildIndex));
                }
            }
        }

        let token = await Util.getItem('TOKEN');
        if (token !== null) {
            let configs = await Api.getAppConfigs();
            if (typeof configs == 'undefined' || configs.code !== 'SUCCESS') {
                Util.alertFailToInit();
            } else {
                if (configs.javaResponse.version != DeviceInfo.getVersion()) {
                    let appUrl = Platform.select({
                        ios: configs.javaResponse.ios_url,
                        android: configs.javaResponse.android_url
                    });

                    if (configs.javaResponse.force_update == '1') {
                        Util.alertToUpdate(true, appUrl);
                    } else {
                        Util.alertToUpdate(false, appUrl);
                        Util.setItem('SAVED_CONFIGS', JSON.stringify(configs.javaResponse));
                        if (savedUserInfoStr !== null) {
                            $this.setState({loggedIn : true, ready : true});
                        } else {
                            $this.setState({loggedIn : false, ready : true});
                        }
                    }
                } else {
                    Util.setItem('SAVED_CONFIGS', JSON.stringify(configs.javaResponse));
                    if (savedUserInfoStr !== null) {
                        $this.setState({loggedIn : true, ready : true});
                    } else {
                        $this.setState({loggedIn : false, ready : true});
                    }
                }
            }
        } else {
            var deviceId = DeviceInfo.getUniqueID();
            let res = await Api.getAuthToken(deviceId);
            if (typeof res == 'undefined' || res.code !== 'SUCCESS') {
                Util.alertFailToInit();
            } else {
                let configs = await Api.getAppConfigs();
                if (typeof configs == 'undefined' || configs.code !== 'SUCCESS') {
                    Util.alertFailToInit();
                } else {
                    if (configs.javaResponse.version != DeviceInfo.getVersion()) {
                        let appUrl = Platform.select({
                            ios: configs.javaResponse.ios_url,
                            android: configs.javaResponse.android_url
                        });

                        if (configs.javaResponse.force_update == '1') {
                            Util.alertToUpdate(true, appUrl);
                        } else {
                            Util.alertToUpdate(false, appUrl);
                            Util.setItem('SAVED_CONFIGS', JSON.stringify(configs.javaResponse));
                            $this.setState({loggedIn : false, ready : true});
                        }
                    } else {
                        Util.setItem('SAVED_CONFIGS', JSON.stringify(configs.javaResponse));
                        $this.setState({loggedIn : false, ready : true});
                    }
                }
            }
        }
    }

    render() {
        if (!this.state.ready) {
          return (
              <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                  <Image source={require('./app/images/logo.png')} resizeMode="cover" />
              </View>
          );
        } else  if (this.state.loggedIn) {
            var App = StackNavigator({
                Main: {screen: MainTabNavigator},
                Login: { screen: Login },
                Register: { screen: Register },
                PushNotificationCallback : {screen: PushNotificationCallback}
            });


            return (
                <Provider store={store}>
                    <App ref={nav => {
                        BackHandler.addEventListener('hardwareBackPress', function() {
                            var routeItem = nav.state.nav;
                            var routeIndex;
                            if (typeof routeItem.index != 'undefined') {
                                routeIndex = routeItem.index;
                            } else {
                                routeIndex = -1;
                            }
                            while (routeIndex != -1) {
                                routeItem = routeItem.routes[routeIndex];
                                if (typeof routeItem.index != 'undefined') {
                                    routeIndex = routeItem.index;
                                } else {
                                    routeIndex = -1;
                                }
                            }

                            var routeName = routeItem.routeName;
                            if (routeName == 'Login' || routeName == 'Home' || routeName == 'ClassRoom' || routeName == 'Baby' || routeName == 'Utility' || routeName == 'Setting') {
                                Util.showConfirm(Constant.MESSAGES.CONFIRM_EXIT_TITLE, function() {
                                    BackHandler.exitApp();
                                });
                                return true;
                            }
                            return false;
                        });
                    }}/>
                </Provider>
            );
        } else {
            var App = StackNavigator({
                Login: { screen: Login },
                Main: {screen: MainTabNavigator},
                Register: { screen: Register },
                PushNotificationCallback : {screen: PushNotificationCallback}
            });


            return (
                <Provider store={store}>
                    <App ref={nav => {
                        BackHandler.addEventListener('hardwareBackPress', function() {
                            var routeItem = nav.state.nav;
                            var routeIndex;
                            if (typeof routeItem.index != 'undefined') {
                                routeIndex = routeItem.index;
                            } else {
                                routeIndex = -1;
                            }
                            while (routeIndex != -1) {
                                routeItem = routeItem.routes[routeIndex];
                                if (typeof routeItem.index != 'undefined') {
                                    routeIndex = routeItem.index;
                                } else {
                                    routeIndex = -1;
                                }
                            }

                            var routeName = routeItem.routeName;
                            if (routeName == 'Login' || routeName == 'Home' || routeName == 'ClassRoom' || routeName == 'Baby' || routeName == 'Utility' || routeName == 'Setting') {
                                Util.showConfirm(Constant.MESSAGES.CONFIRM_EXIT_TITLE, function() {
                                    BackHandler.exitApp();
                                });
                                return true;
                            }
                            return false;
                        });
                    }}/>
                </Provider>
            );
        }
    }
}

const tabBarStyle = StyleSheet.create({
    tabBar: {
	    backgroundColor: '#ffffff',
	    borderTopWidth: 0,
	},
});
