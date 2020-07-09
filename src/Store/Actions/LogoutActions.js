import {
    USER_LOGOUT,
    LOGOUT_SUCCESS_RESPONSE,
    LOGOUT_FAILURE_RESPONSE
} from './ActionsTypes'

import ApiEndpoint from "../../ApiManager/ApiEndpoint";
import {
    LOGOUT
} from "../../ApiManager/ApiEndpoint";
import ApiSingleton from '../../ApiManager/ApiSingleton';
import AppUser from "../../utilities/AppUser";




export const onUserLogout = () => {
    return {
        type: USER_LOGOUT,
        data: {}
    }
}
export const onLogoutSuccessAction = (data) => {
    return {
        type: LOGOUT_SUCCESS_RESPONSE,
        payload: data
    }
}
export const onLogoutFailureAction = (data) => {
    return {
        type: LOGOUT_FAILURE_RESPONSE,
        payload: data
    }
}


export function logoutRequestApi(eventID) {
    return (dispatch) => {
        const Executor = async (resolve, reject) => {
            try {

                let url = ApiEndpoint(LOGOUT);

                const authToken = AppUser.getInstance().token;
                const onSuccessCallback = (data) => {

                    dispatch(onLogoutSuccessAction(data))
                    resolve(data);

                };
                const onFailureCallback = (error) => {
                    dispatch(onLogoutFailureAction(data))
                    reject(error);
                };

                const apiActionPayload = {
                    url: url,
                    method: "GET",
                    onSuccess: onSuccessCallback,
                    onFailure: onFailureCallback,
                    label: LOGOUT,
                    headersOverride: {
                        authorization: authToken,
                        app_language: 'en',
                        event_id: eventID != null ? eventID : null
                    }
                };
                const apiCallAction = ApiSingleton.getInstance().apiActionCall(apiActionPayload);
                dispatch(apiCallAction);

            } catch (error) {

                reject(error);
            }
        };
        return new Promise(Executor);
    };
}
