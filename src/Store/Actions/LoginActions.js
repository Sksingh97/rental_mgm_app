import AsyncStorage from '@react-native-community/async-storage';
import ApiEndpoints from '../../ApiManager/ApiEndpoint'
import { LOGIN, GOOGLE_LOGIN, FB_LOGIN } from '../../ApiManager/ApiEndpoint'
import ApiSingleton from '../../ApiManager/ApiSingleton';
import AppUser from "../../Singleton/AsyncStorage";
import AppAsync from "../../Singleton/AsyncStorage";
import { Platform } from 'react-native';
import {SHA256} from '../../Utilities/Utils'

const AppAsyncIns = AppAsync.getInstance()
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

export const RestoreReducer = (user) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch(onLoginSuccessAction({user}))
        resolve(true)
    })
}

//============================= login request api===================//

//POST REQUEST
export const hitUserLoginApi = ({email, password, log_in_type = 0, token="", id=0}) =>
    (dispatch) => {

        return new Promise((resolve, reject) => {

            const parameters = {
                email: email,
                password: password&&password.length>0?SHA256(password):"",
                log_in_type: log_in_type,
                device_token: "qwerty",
                token:token,
                id:id,
                device_type: Platform.OS === 'android' ? "1" : "2"

            }
            const loginUrl = ApiEndpoints(LOGIN)
            //returns a funtion, not an action object
            dispatch(ApiSingleton.getInstance().apiActionCall({
                url: loginUrl,
                method: "POST",
                onSuccess: async (data) => {
                    // console.log("DATA : : : : ",data)
                    if(data && data.user){
                        let user = {...data.user,token:data.token}
                        let key_list = Object.keys(user);
                        console.log("BEFORE WRITTING DATA : : : ",user)
                        for(let i = 0; i<key_list.length;i++){
                            console.log("WRITING KEY : : : ",key_list[i] ," _ _ VALUE _ _ ",user[key_list[i]],"\n\n\n")
                            await AppAsyncIns.setAsyncData(key_list[i],user[key_list[i]])
                        }
                        AppAsyncIns.setAsyncData('authenticated',true)
                    }
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
