import axios from "axios";
import AsyncStorage from '@react-native-community/async-storage';
import  Toast from "react-native-simple-toast";
// import { NavigationActions, StackActions } from 'react-navigation';
import { API } from "./types";
import { apiError, apiStart, apiEnd } from "./APIAction";
// import ApiEndpoint, { BASE_DEV_URL } from "./ApiEndpoint";
// import { AppNavigationReference } from "../utils/AppNavigation";
// import { setAppToken } from "../utils/Utils";
// import AppSingleton from "../helper/AppSingleton";

// import AppUser from "../AppUser";
// import strings from "../../../res/strings";
// import { getNavigationReference } from "../Utils";

// var appSingleton = AppSingleton.getInstance();

//--------------- API MIDDLEWARE ------------------//

//1. Set up the middleware
const ApiMiddleware = ({ dispatch, getState }) => next => action => {
    next(action);

    //2. ONLY DO FOR type='API' actions, Dismiss irrelevant action types
    if (action.type !== API)
        return;
    //3. Extract imp. variables from the action payload
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
    // axios.defaults.baseURL = BASE_DEV_URL || "";
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.headers.common["Authorization"] = `Bearer${accessToken}`;

    //6.Handle loading states
    if (label) {
        dispatch(apiStart(label));  // send apiStart action
    }

    //7. Make the actual network request, handle errors, and invoke callbacks
    axios
        .request({
            url,
            method,
            headers: headersOverride ? headersOverride : headers,
            [dataOrParams]: data,
            timeout: 60000
        })
        .then(async ({ data }) => {
            if (data.result != null || data.msg != null) {
                let action = await onSuccess(data.result);
                console.log("ACTION : : :",action)
                if (action) {
                    dispatch(action);
                }
                //-> SUCCESS callback
            } else {
                console.log("EROROROR : : ")
                this.handleFailure(data)
            }




        })
        .catch(error => {
            // const code = parseInt(error.response && error.response.status);
            console.log("LETS CHECK : : ",error)
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

                const err = error.response.data.error;
                // if (err) {
                //     const { errorCode } = err;
                //     if (errorCode == 5) {
                //         // Invalid Token
                //         invalidTokenHandler();
                //         return;
                //     } else if (errorCode == 6) {
                //         // Blocaed User
                //         blockedUserHandler();
                //         return;
                //     }
                // }

                handleFailure(error.response.data)
                dispatch(apiError(label, error.response.data));

            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(`error.request: `, error.request._response);
                handleFailure({ error: { msg: error.request._response, message: error.request._response }});
                const acti = apiError(label, { error: { msg: error.request._response, message: error.request._response} });
                if (acti) {
                    dispatch(acti);
                }
                return;
                //dispatch(apiError(label, error.request)); // send apiError action
            } else {
                // Something happened in setting up the request that triggered an Error

                //dispatch(apiError(label, error)); // send apiError action
            }

            // TODO remove it
            handleFailure(error.response.data)
            let action = onFailure(error.response.data.error);
            if (action) {
                dispatch(action);
            }
            
        })
        .finally(() => {
            if (label) {
                dispatch(apiEnd(label)); // send apiEnd action 
            }
        });

    handleFailure = (data) => {
        let action = onFailure(data.error);
        if (action) {
            dispatch(action);
        }
        let errorMessage = data.error.msg;
        if (errorMessage != null && errorMessage != '') {
            Toast.show(errorMessage)
        }

    }


};


const clearAsyncStorageData = async () => {
    let emailId=""
    try{
           emailId= await AsyncStorage.getItem("email","")
        //    setAppToken("", "");
           await AsyncStorage.clear();
           await AsyncStorage.setItem("email",emailId)
    }
    catch{

    }
    const keys = ["@USER_TOKEN", "@USER_ID", "@USER_DETAILS"];
    try {
        await AsyncStorage.multiRemove(keys)
    } catch (e) {
        console.log("Error removing data from async storage.", e);
    }
};

const clearAppUserObject = () => {
    // let appUsrObj = AppUser.getInstance();
    // appUsrObj.token = undefined;
    // appUsrObj.userId = undefined;
    // appUsrObj.userDetails = undefined;

    // appSingleton.userId = "";
    // appSingleton.userToken = "";
    // appSingleton.id = 0;
    // appSingleton.c = "";
    // appSingleton.email = "";
    // appSingleton.client_id = "";
    // appSingleton.user = "";
    // appSingleton.twillioToken = "";
    // appSingleton.fcmToken = "";
    // appSingleton.hospitalName = "";
    // appSingleton.hospitalId = 0;
    // appSingleton.hospitalImageUrl = "";
    // appSingleton.hospitalVirtualPhone = "";
};

// const resetStack = async() => {
//     var emailId=""
//     try {    
//        emailId= await AsyncStorage.getItem("email","")
  
//     if (AppNavigationReference) {
//       const resetAction = StackActions.reset({
//         index: 0,
//         actions: [NavigationActions.navigate({ routeName: "WelcomeScreen" })]
//       });
//       AppNavigationReference.dispatch(resetAction);
//     }
//   }
//   catch{
//   }
// };

function invalidTokenHandler() {
    // Toast.show(strings.invalid_token, Toast.LONG);
    clearAsyncStorageData();
    clearAppUserObject();
    // resetStack();
}

function blockedUserHandler() {
    // Toast.show(strings.blocked_user, Toast.LONG);
    clearAsyncStorageData();
    clearAppUserObject();
    // resetStack();
}


export default ApiMiddleware;