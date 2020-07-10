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
export const hitSignupApi = ({name, email, country_code, phone, password}) =>
    (dispatch) => {   
        return new Promise((resolve, reject) => {

            var data = new FormData();

            const parameters = {
                email,
                name,
                phone,
                country_code,
                password,
            }
            
            const apiUrl = ApiEndpoints(SIGNUP)
            console.log(apiUrl)
            //returns a funtion, not an action object
            try{
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
            }catch(e){
                console.log("Dispatch error")
            }
            


        });
    };



