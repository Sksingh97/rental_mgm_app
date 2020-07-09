import AsyncStorage from '@react-native-community/async-storage';
import ApiEndpoints from '../../ApiManager/ApiEndpoint'
import { LOGIN, GOOGLE_LOGIN, FB_LOGIN } from '../../ApiManager/ApiEndpoint'
import ApiSingleton from '../../ApiManager/ApiSingleton';
import AppUser from "../../utilities/AppUser";
import { Platform } from 'react-native';

import {
    ON_USER_LOGIN_SUCCESS, ON_USER_LOGIN_FAILURE,
    ON_GOOGLE_LOGIN_SUCCESS, ON_GOOGLE_LOGIN_FAILURE,
    ON_FB_LOGIN_SUCCESS, ON_FB_LOGIN_FAILURE
} from './ActionsTypes'



export const onLoginSuccessAction = (data) => {
    return {
        type: ON_USER_LOGIN_SUCCESS,
        payload: data
    }
}

export const onLoginFailureAction = (data) => {
    return {
        type: ON_USER_LOGIN_FAILURE,
        payload: data
    }
}

export const onGoogleLoginSuccessAction = (data) => {
    return {
        type: ON_GOOGLE_LOGIN_SUCCESS,
        payload: data
    }
}

export const onGoogleLoginFailureAction = (data) => {
    return {
        type: ON_GOOGLE_LOGIN_FAILURE,
        payload: data
    }
}

export const onFbLoginSuccessAction = (data) => {
    return {
        type: ON_FB_LOGIN_SUCCESS,
        payload: data
    }
}

export const onFbLoginFailureAction = (data) => {
    return {
        type: ON_FB_LOGIN_FAILURE,
        payload: data
    }
}

//============================= login request api===================//

//POST REQUEST
export const hitUserLoginApi = (emailId, userPass) =>
    (dispatch) => {

        return new Promise((resolve, reject) => {

            const parameters = {
                email: emailId,
                password: userPass,
                device_token: "qwerty",
                device_type: Platform.OS === 'android' ? "1" : "2"

            }
            const loginUrl = ApiEndpoints(LOGIN)
            //returns a funtion, not an action object
            dispatch(ApiSingleton.getInstance().apiActionCall({
                url: loginUrl,
                method: "POST",
                onSuccess: async (data) => {
                    let appUsrObj = AppUser.getInstance();
                    appUsrObj.token = data.user.token;
                    appUsrObj.userId = data.user.id;
                    appUsrObj.userDetails = data.user;

                    const userToken = ["@USER_TOKEN", data.user.token];
                    const userId = ["@USER_ID", data.user.id.toString()];
                    const userDetails = ["@USER_DETAILS", JSON.stringify(data.user)];
                    try {
                        await AsyncStorage.multiSet([userToken, userId, userDetails])
                    } catch (e) {
                        console.log("Error saving user details", e);
                    }
                    console.log("data", data);
                    dispatch(onLoginSuccessAction(data));
                    resolve((data));

                },
                onFailure: (error) => {
                    dispatch(onLoginFailureAction(error));
                    reject(error)

                },
                label: LOGIN,
                data: parameters,
                headersOverride: {
                    app_language: 'en',
                    app_version: '1.0'
                }
            }));


        });
    };

//============================= Google login request api===================//

//POST REQUEST
export const hitGoogleLoginApi = (token) =>
    (dispatch) => {

        return new Promise((resolve, reject) => {

            const parameters = {
                accessToken: token,
                device_token: "Qwerty",
                device_type: Platform.OS === 'android' ? "1" : "2"

            }
            const googleLoginUrl = ApiEndpoints(GOOGLE_LOGIN)
            //returns a funtion, not an action object
            dispatch(ApiSingleton.getInstance().apiActionCall({
                url: googleLoginUrl,
                method: "POST",
                onSuccess: async (data) => {
                    let appUsrObj = AppUser.getInstance();
                    appUsrObj.token = data.user.token;
                    appUsrObj.userId = data.user.id;
                    appUsrObj.userDetails = data.user;

                    const userToken = ["@USER_TOKEN", data.user.token];
                    const userId = ["@USER_ID", data.user.id.toString()];
                    const userDetails = ["@USER_DETAILS", JSON.stringify(data.user)];
                    try {
                        await AsyncStorage.multiSet([userToken, userId, userDetails])
                    } catch (e) {
                        console.log("Error saving user details", e);
                    }
                    console.log("data", data);
                    dispatch(onGoogleLoginSuccessAction(data));
                    resolve((data));

                },
                onFailure: (error) => {
                    dispatch(onGoogleLoginFailureAction(error));
                    reject(error)

                },
                label: GOOGLE_LOGIN,
                data: parameters,
                headersOverride: {
                    app_language: 'en',
                    app_version: '1.0'
                }
            }));


        });
    };



//============================= Fb login request api===================//

//POST REQUEST
export const hitFbLoginApi = (token) =>
    (dispatch) => {

        return new Promise((resolve, reject) => {

            const parameters = {
                accessToken: token,
                device_token: "QWERTY",
                device_type: Platform.OS === 'android' ? "1" : "2"

            }
            const fbLoginUrl = ApiEndpoints(FB_LOGIN)
            //returns a funtion, not an action object
            dispatch(ApiSingleton.getInstance().apiActionCall({
                url: fbLoginUrl,
                method: "POST",
                onSuccess: async (data) => {
                    if (data && data.user) {
                        console.log("ONSUCCESSFBLOGINRESULT......", data)
                        let appUsrObj = AppUser.getInstance();
                        appUsrObj.token = data.user.token;
                        appUsrObj.userId = data.user.id;
                        appUsrObj.userDetails = data.user;

                        const userToken = ["@USER_TOKEN", data.user.token];
                        const userId = ["@USER_ID", data.user.id.toString()];
                        const userDetails = ["@USER_DETAILS", JSON.stringify(data.user)];
                        try {
                            await AsyncStorage.multiSet([userToken, userId, userDetails])
                        } catch (e) {
                            console.log("Error saving user details", e);
                        }
                        console.log("data", data);
                        dispatch(onFbLoginSuccessAction(data));
                        resolve((data));
                    }


                },
                onFailure: (error) => {
                    dispatch(onFbLoginFailureAction(error));
                    reject(error)

                },
                label: FB_LOGIN,
                data: parameters,
                headersOverride: {
                    app_language: 'en',
                    app_version: '1.0'
                }
            }));


        });
    };
