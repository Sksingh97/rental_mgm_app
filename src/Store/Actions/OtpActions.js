import AsyncStorage from '@react-native-community/async-storage';
import ApiEndpoints from '../../ApiManager/ApiEndpoint'
import { VERIFY_OTP, RESEND_OTP } from '../../ApiManager/ApiEndpoint'
import ApiSingleton from '../../ApiManager/ApiSingleton';
import AppUser from "../../utilities/AppUser";
import { Platform } from 'react-native';

import {
    VERIFY_OTP_SUCCESS, VERIFY_OTP_FAILURE, RESEND_OTP_SUCCESS, RESEND_OTP_FAILURE
} from './ActionsTypes'


export const onVerifyOtpSuccessAction = (data) => {
    return {
        type: VERIFY_OTP_SUCCESS,
        payload: data
    }
}

export const onVerifyOtpFailureAction = (data) => {
    return {
        type: VERIFY_OTP_FAILURE,
        payload: data
    }
}

export const onResendOtpSuccessAction = (data) => {
    return {
        type: RESEND_OTP_SUCCESS,
        payload: data
    }
}

export const onresendOtpFailureAction = (data) => {
    return {
        type: RESEND_OTP_FAILURE,
        payload: data
    }
}

//============================= Verify Otp request api===================//

//POST REQUEST
export const hitVerifyOtpApi = (emailId, phone, verificationCode) =>
    (dispatch) => {
console.log("email=>",emailId,"Phone=>",phone,"verificationCode=>",verificationCode)
        return new Promise((resolve, reject) => {

            const parameters = {
                email: emailId,
                phone: phone,
                code: verificationCode,
                device_token: "QWERTY",
                device_type: Platform.OS === 'android' ? "1" : "2"

            }
            const verifyOtpUrl = ApiEndpoints(VERIFY_OTP)
            //returns a funtion, not an action object
            dispatch(ApiSingleton.getInstance().apiActionCall({
                url: verifyOtpUrl,
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
                    dispatch(onVerifyOtpSuccessAction(data));
                    resolve((data));

                },
                onFailure: (error) => {
                    dispatch(onVerifyOtpFailureAction(error));
                    reject(error)

                },
                label: VERIFY_OTP,
                data: parameters,
                headersOverride: {
                    app_language: 'en',
                    app_version: '1.0'
                }
            }));


        });
    };



//============================= Resend Otp request api===================//

//POST REQUEST
export const hitResendOtpApi = (emailId, phone) =>
(dispatch) => {

    return new Promise((resolve, reject) => {

        const parameters = {
            email: emailId,
            phone: phone,
            device_token: "qwerty",
            device_type: Platform.OS === 'android' ? "1" : "2"

        }
        const resendOtpUrl = ApiEndpoints(RESEND_OTP)
        //returns a funtion, not an action object
        dispatch(ApiSingleton.getInstance().apiActionCall({
            url: resendOtpUrl,
            method: "POST",
            onSuccess: async (data) => {
                // let appUsrObj = AppUser.getInstance();
                // appUsrObj.token = data.user.token;
                // appUsrObj.userId = data.user.id;
                // appUsrObj.userDetails = data.user;

                // const userToken = ["@USER_TOKEN", data.user.token];
                // const userId = ["@USER_ID", data.user.id.toString()];
                // const userDetails = ["@USER_DETAILS", JSON.stringify(data.user)];
                // try {
                //     await AsyncStorage.multiSet([userToken, userId, userDetails])
                // } catch (e) {
                //     console.log("Error saving user details", e);
                // }
                // console.log("data", data);
                dispatch(onResendOtpSuccessAction(data));
                resolve((data));
            },
            onFailure: (error) => {
                dispatch(onresendOtpFailureAction(error));
                reject(error)
            },
            label: RESEND_OTP,
            data: parameters,
            headersOverride: {
                app_language: 'en',
                app_version: '1.0'
            }
        }));


    });
};
