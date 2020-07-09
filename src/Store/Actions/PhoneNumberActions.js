import ApiEndpoints from '../../ApiManager/ApiEndpoint'
import { RESET_PASS_OTP } from '../../ApiManager/ApiEndpoint'
import ApiSingleton from '../../ApiManager/ApiSingleton';

import {
    RESET_PASS_OTP_SUCCESS, RESET_PASS_OTP_FAILURE
} from './ActionsTypes'



export const onResetPassOtpSuccessAction = (data) => {
    return {
        type: RESET_PASS_OTP_SUCCESS,
        payload: data
    }
}

export const onResetPassOtpFailureAction = (data) => {
    return {
        type: RESET_PASS_OTP_FAILURE,
        payload: data
    }
}

//============================= Reset Pass Otp request api===================//

//POST REQUEST
export const hitResetPassOtpApi = (email) =>
    (dispatch) => {
        console.log("email",email)
        return new Promise((resolve, reject) => {

            var data = new FormData();

            const parameters = {
                email:email
            }

            const apiUrl = ApiEndpoints(RESET_PASS_OTP)
            //returns a funtion, not an action object
            dispatch(ApiSingleton.getInstance().apiActionCall({
                url: apiUrl,
                method: "POST",
                onSuccess: (data) => {
                    console.log("Success ", data);
                    dispatch(onResetPassOtpSuccessAction(data));
                    resolve((data));

                },
                onFailure: (error) => {
                    console.log("Failure ", data);
                    dispatch(onResetPassOtpFailureAction(data));
                    reject(error)

                },
                label: RESET_PASS_OTP,
                data: parameters,
                headersOverride: {
                    app_language: 'en',
                    app_version: '1.0',
                }
            }));


        });
    };



