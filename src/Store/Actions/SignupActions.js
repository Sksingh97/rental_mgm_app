import ApiEndpoints from '../../ApiManager/ApiEndpoint'
import { SIGNUP } from '../../ApiManager/ApiEndpoint'
import ApiSingleton from '../../ApiManager/ApiSingleton';

import {
    ON_USER_SIGNUP_SUCCESS, ON_USER_SIGNUP_FAILURE
} from './ActionsTypes'



export const onSignupSuccessAction = (data) => {
    return {
        type: ON_USER_SIGNUP_SUCCESS,
        payload: data
    }
}

export const onSignupFailureAction = (data) => {
    return {
        type: ON_USER_SIGNUP_FAILURE,
        payload: data
    }
}

//============================= signup request api===================//

//POST REQUEST
export const hitSignupApi = (emailId, name, phone, countryCode, password) =>
    (dispatch) => {   
        return new Promise((resolve, reject) => {

            var data = new FormData();

            const parameters = {
                email: emailId,
                name: name,
                phone: phone,
                country_code: countryCode,
                password: password,
                confrm_password: password,
            }
            
            const apiUrl = ApiEndpoints(SIGNUP)
            //returns a funtion, not an action object
            dispatch(ApiSingleton.getInstance().apiActionCall({
                url: apiUrl,
                method: "POST",
                onSuccess: (data) => {
                    console.log("Success ", data);
                    dispatch(onSignupSuccessAction(data));
                    resolve((data));

                },
                onFailure: (error) => {
                    console.log("Failure ", data);
                    dispatch(onSignupFailureAction(data));
                    reject(error)

                },
                label: SIGNUP,
                data: parameters,
                headersOverride: {
                    app_language: 'en',
                    app_version: '1.0',
                }
            }));


        });
    };



