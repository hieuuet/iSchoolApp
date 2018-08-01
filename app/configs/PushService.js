import PushNotification from 'react-native-push-notification'
import _ from 'lodash';
import Util from './util'
import {
  Platform
} from "react-native";
export default class PushService {
  static configure(options) {   // {onRegistration, onNotification}
    PushNotification.configure({
      onRegister: (device) => {
        if (options.onRegister) {
          options.onRegister(device);
        }
      },
      onNotification: (notification) => {
        if (options.onNotification) {
          options.onNotification(notification);
        }
      },
      // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: "664725807551",

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
          alert: true,
          badge: true,
          sound: true
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
        * (optional) default: true
        * - Specified if permissions (ios) and token (android and ios) will requested or not,
        * - if not, you must call PushNotificationsHandler.requestPermissions() later
        */
      requestPermissions: true,
    })
  }
}
