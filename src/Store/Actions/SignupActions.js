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
    console.log("ON SIGNUP FAILURE DATA : : :",data)
    return {
        type: ON_USER_SIGNUP_FAILURE,
        payload: data
    }
}

//============================= signup request api===================//

//POST REQUEST
export const hitSignupApi = ({name, email, country_code, phone, password}) =>

    (dispatch) => {
        
        try{
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
                console.log("apiUrl",apiUrl)
                //returns a funtion, not an action object
                try{
                    let method = ApiSingleton.getInstance().apiActionCall({
                        url: apiUrl,
                        method: "POST",
                        onSuccess: (data) => {
                            try{
                                console.log("Success ", data);
                                dispatch(onSignupSuccessAction(data));
                                resolve((data));
                            }catch(e){
                            reject(e)

                            }
                            
                        },
                        onFailure: (error) => {
                            try{
                            dispatch(onSignupFailureAction(error));
                            reject(error)
                        }catch(e){
                            reject(e)

                        }
                        },
                        label: SIGNUP,
                        data: parameters,
                        headersOverride: {
                            app_language: 'en',
                            app_version: '1.0',
                        }
                    })
                    dispatch(method);
                }catch(e){
                    console.log("Dispatch error")
                    reject(e)
                }
                
    
    
            });
        } catch(e){
            reject(e)
        }  
        
    };



