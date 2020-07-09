import axios from "axios";
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import { API } from "../Store/Actions/ActionsTypes";
import { apiError, apiStart, apiEnd } from './APIAction';
import { BASE_DEV_URL, UPLOAD_MEDIA, LOGIN } from '../ApiManager/ApiEndpoint';
import AppUser from "../Utilities/AppUser";
// import strings from "../res/strings";
import { getNavigationReference } from "../Utilities/NavigationRef";


//--------------- API MIDDLEWARE ------------------//

//1. Set up the middleware
const ApiMiddleware = ({ dispatch, getState }) => next => action => {
    next(action);

    //2. ONLY DO FOR type='API' actions, Dismiss irrelevant action types
    if (action.type !== API)
        return;
    //3. Extract imp. variables from the action payload
    console.log("actionPayload", action);
    const {
        url,
        method,
        data,
        accessToken,
        headersOverride,
        onSuccess,
        onFailure,
        label,
        headers
    } = action.payload;
    /*
        console.log(`ApiMiddleware: ->\n ${method}  ${url}`);
        if (data)
            console.log(`ApiMiddleware: ->\n ${JSON.stringify(data)}`);
        if (headersOverride)
            console.log(`ApiMiddleware: ->\n ${JSON.stringify(headersOverride)}`);
    */
    //4.Handle any HTTP method
    const dataOrParams = ["GET", "DELETE"].includes(method) ? "params" : "data";


    //5. Handle Globals/axios default configs
    axios.defaults.baseURL = BASE_DEV_URL || "";
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.headers.common["Authorization"] = `Bearer${accessToken}`;

    //6.Handle loading states
    if (label) {
        dispatch(apiStart(label));  // send apiStart action
    }

    console.log("url", url, "method", method, "headers", headers, "headersOverride", headersOverride, "data", data)

    //7. Make the actual network request, handle errors, and invoke callbacks
    axios
        .request({
            url,
            method,
            headers: headersOverride ? headersOverride : headers,
            [dataOrParams]: data,
        })
        .then(({ data }) => {

            if (data.sc && data.result != null) {
                console.log("resopnse= " + JSON.stringify(data))
                //invalidTokenHandler();
                dispatch(onSuccess(data.result));  //-> SUCCESS callback
            } else if (data.status != null && data.status === 'OK') {
                dispatch(onSuccess(data.results[0]));
            } else if (data.status != null && data.status == 'ZERO_RESULTS') {

                dispatch(onFailure("No Location Found"));
            } else {
                this.handleFailure(data)
            }




        })
        .catch(error => {
            // const code = parseInt(error.response && error.response.status);

            //ERROR Handling
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(`error.response.data: `, error.response.data);
                console.log(`error.response.status: `, error.response.status);
                console.log(`error.response.headers: `, error.response.headers);


                /**
                 * Check for Invalid Token (errorCode = 5) or Blocked User (errorCode  = 6)
                 * If so then logout user.
                 */
                // const err = error.response.data.error;
                // if (err) {
                //     const { errorCode } = err;
                //     if (errorCode == 5) {
                //         // Invalid Token
                //         handleFailure(error.response.data);
                //         invalidTokenHandler();
                //         return;
                //     }
                // }
                // if (label === LOGIN) {
                // dispatch(onFailure(error.response.data));
                // }
                // else {
                //     handleFailure(error.response.data)
                // }

                dispatch(apiError(label, error.response.data)); // send apiError action 

            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js


                // if (label === UPLOAD_MEDIA) {
                //     dispatch(onFailure(error.request._response)); // send apiError action
                // } else if (error.message === "Network Error") {
                //     alert("No Internet Connection.Please try again later")
                // } else {
                //     console.log(`error.request: `, error.request._response);
                //     alert(error.request._response)
                // }

                if (error.message === "Network Error") {
                    alert("No Internet Connection.Please try again later")
                    if (label == 'EVENT_CHECKIN' || label == 'EVENT_CHECKIN_STATUS') {
                        dispatch(onFailure(error.request._response))
                    }
                }

                // else {
                //     dispatch(onFailure(error.request._response));
                // }

            } else {
                // Something happened in setting up the request that triggered an Error


                // if (label === UPLOAD_MEDIA) {
                //     dispatch(onFailure("Something went wrong")); // send apiError action
                // }
            }


            // if (label === UPLOAD_MEDIA) {
            dispatch(onFailure(error.response.data.error)); //-> FAILURE callback
            // }

        })
        .finally(() => {
            if (label) {
                dispatch(apiEnd(label)); // send apiEnd action 
            }
        });

    handleFailure = (data) => {
        //dispatch(onFailure(data))
        let errorMessage = data.error.msg;
        if (errorMessage != null && errorMessage != '') {
            Toast.show(errorMessage)
            
        }

    }


};


const clearAsyncStorageData = async () => {
    const keys = ["@USER_TOKEN", "@USER_ID", "@USER_DETAILS", "@PREF_LOCATIONS", "@EVENT_CHECKIN_ID", "@IS_USER_CHECKEDIN"];
    try {
        await AsyncStorage.multiRemove(keys)
    } catch (e) {
        console.log("Error removing data from async storage.", e);
    }
};

const clearAppUserObject = () => {
    let appUsrObj = AppUser.getInstance();
    appUsrObj.token = undefined;
    appUsrObj.userId = undefined;
    appUsrObj.userDetails = undefined;
};

const resetStack = () => {
    const navigation = getNavigationReference();
    // const resetAction = StackActions.reset({
    //     index: 0,
    //     actions: [
    //         // NavigationActions.navigate({
    //         //     routeName: "login",
    //         // })
    //     ]
    // });
    if (navigation) {
        navigation.dispatch(resetAction);
    }
};

function invalidTokenHandler() {
    Toast.show(strings.invalid_token, Toast.LONG);
    clearAsyncStorageData();
    clearAppUserObject();
    resetStack();
}

function blockedUserHandler() {
    Toast.show(strings.blocked_user, Toast.LONG);
    clearAsyncStorageData();
    clearAppUserObject();
    resetStack();
}


export default ApiMiddleware;