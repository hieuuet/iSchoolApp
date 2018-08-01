import Constant from '../configs/constant';
import Util from '../configs/util';

const Api = {
    get : async function(url, queryParams) {
        var queryString = '';
        if (typeof queryParams != 'undefined') {
            for (var item in queryParams) {
                queryString += item + "=" + encodeURI(queryParams[item]) + "&";
            }
            queryString = queryString.substring(0, queryString.length - 1);
        }
        if (queryString != '') {
            url += "?" + queryString;
        }

        var token = await Util.getItem("TOKEN");
        var newToken = Util.rebuildToken(token);

        if (token !== newToken) {
            console.log('------------ TOKEN KHONG HOP LE ------------');
            Util.clear();
            Util.exitApp();
        } else {
            console.log("URL: GET " + Constant.BASE_URL + url);
            return fetch(Constant.BASE_URL + url, {
                method: 'GET',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + (token == null ? '' : token)
                },
                timeout : 30000
            }).then(async res => {
                var authHeader = await res.headers.get('Authorization');
                if (authHeader) {
                    var token = authHeader.replace('Bearer ', '');
                    Util.setItem('TOKEN', token);
                }
                return res.json();
            }).catch(error => {
                console.log('--- CATCH ERROR ' + url + ' ---');
                console.log(error);
            });
        }
    },

    post : async function(url, postData) {
        var token = await Util.getItem("TOKEN");
        var newToken = Util.rebuildToken(token);

        if (token !== newToken) {
            Util.clear();
            Util.exitApp();
        } else {
            var queryString = '';
            if (typeof postData != 'undefined') {
                for (var item in postData) {
                    queryString += item + "=" + encodeURI(postData[item]) + "&";
                }
                queryString = queryString.substring(0, queryString.length - 1);
            }

            console.log("URL: POST " + Constant.BASE_URL + url);
            console.log("POST DATA: " + queryString);
            return fetch(Constant.BASE_URL + url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + (token == null ? '' : token)
                },
                body: queryString,
                timeout : 30000
            }).then(async res => {
                var authHeader = await res.headers.get('Authorization');
                if (authHeader) {
                    Util.setItem('TOKEN', authHeader.replace('Bearer ', ''));
                }
                return res.json();
            }).catch(error => {
                console.log('--- CATCH ERROR ' + url + ' ---');
                console.log(error);
            });
        }
    },

    /*
        Lấy public token trước khi đăng nhập app
    */
    getAuthToken : function(device_id) {
        var url = Constant.API.GET_AUTH_TOKEN;
        var params = {device_id};
        return Api.get(url, params);
    },

    /*
        Hàm login user vào ứng dụng:
        {
            deviceType,
            deviceModel,
            deviceVersion,
            devicePlatform,
            username,
            password
        }
    */
    checkLogin : function(user) {
        var url = Constant.API.LOGIN;
        return Api.post(url, user);
    },

    /*
        Lấy thông tin các số badge của các tab
    */
    getTabBadges : function(class_id) {
        var url = Constant.API.GET_TAB_BADGES;
        var params = {class_id};
        return Api.get(url, params);
    },

    /*
        Thay đổi mật khẩu
    */
    changePassword: function(params) {
        var url = Constant.API.CHANGE_PASSWORD;
        return Api.post(url, params);
    },

    /*
        Tính năng like bài viết
    */
    likeNews: function(news_id) {
        var url = Constant.API.LIKE_NEWS;
        var params = {news_id};
        return Api.post(url, params);
    },
    /*
        Tính năng bình luận bài viết
    */
    commentNews: function(params) {
        var url = Constant.API.COMMENT_NEWS;
        return Api.post(url, params);
    },

    /*
        Tính năng insertToken
    */
    insertToken : function(params) {
        var url = Constant.API.INSERT_TOKEN;
        return Api.post(url, params);
    },

    /*
        Lấy danh sách cảm biến cửa
    */
    getSensorList: function(page, type) {
        var url = Constant.API.GET_SENSOR_LIST;
        var params = {page, type};
        return Api.get(url, params);
    },

    /*
        Lấy thông tin cấu hình application
    */
    getAppConfigs : function() {
        var url = Constant.API.GET_APP_CONFIGS;
        var params = {};
        return Api.get(url, params);
    },

    /*
       Get list news
    */
   getLatestNews : function(params) {
       var url = Constant.API.GET_LATES_NEWS;
       return Api.get(url, params);
   },
     /*
       Get list camera
    */
   getCameraList : function(class_id) {
       var params = {class_id};
       var url = Constant.API.GET_CAMERA_LIST;
       return Api.get(url, params);
   },
   getNormalNewsDetail : function(id) {
       var params = {id};
       var url = Constant.API.GET_NEWS_DETAIL;
       return Api.get(url, params);
   },

    /*
       Get list news notification
    */
   getLatestNotifications : function(params) {
    var url = Constant.API.GET_NOTIFICATION_NEWS;
    return Api.get(url, params);
   },
    /*
       Get news detail
    */
   getNormalNewsFullDetail : function(params) {
    var url = Constant.API.GET_NORMAL_NEWS_FULL_DETAIL;
    return Api.get(url, params);
   },

   getRecordDetail : function(params) {
    var url = Constant.API.GET_RECORD_DETAIL;
    return Api.get(url, params);
   },
   getNotificationDetail : function(params) {
    var url = Constant.API.GET_NOTIFICATION_DETAIL;
    return Api.get(url, params);
   },
   getEventDetail : function(params) {
    var url = Constant.API.GET_EVENT_DETAIL;
    return Api.get(url, params);
   },

     /*
       Get list news event
    */
   getLatestEvents : function(params) {
    var url = Constant.API.GET_EVENT_NEWS;
    return Api.get(url, params);
   },

   getScheduleList : function(class_id, from_date, to_date) {
       var params = {class_id, from_date, to_date};
       var url = Constant.API.GET_SCHEDULE_LIST;
       return Api.get(url, params);
   },

   getTeachersListOfClass : function(class_id) {
       var params = {class_id};
       var url = Constant.API.GET_TEACHER_LIST_OF_CLASS;
       return Api.get(url, params);
   },

   getListParentsOfClass : function(class_id) {
       var params = {class_id};
       var url = Constant.API.GET_LIST_PARENT_OF_CLASS;
       return Api.get(url, params);
   },

   updateUserInfo : function(params) {
       var url = Constant.API.UPDATE_USER_INFO;
       return Api.post(url, params);
   },

   getOtp : function(username) {
       var params = {username};
       var url = Constant.API.GET_OTP;
       return Api.post(url, params);
   },

   verifyOtp : function(username, otp, new_password) {
       var params = {username, otp, new_password};
       var url = Constant.API.VERIFY_OTP;
       return Api.post(url, params);
   },

   getDailyMenu : function(class_id, from_time, to_time) {
       var params = {class_id, from_time, to_time};
       var url = Constant.API.GET_MENU_LIST;
       return Api.get(url, params);
   },

   getChildMessage : function(child_id, page) {
       var params = {child_id, page};
       var url = Constant.API.GET_CHILD_MESSAGE;
       return Api.get(url, params);
   },
   getMessageDetail : function(params) {
       var url = Constant.API.GET_MESSAGE_DETAIL;
       return Api.get(url, params);
   },


};

export default Api;
