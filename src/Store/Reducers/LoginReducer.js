import {
    ON_USER_LOGIN_SUCCESS, ON_USER_LOGIN_FAILURE,
    ON_GOOGLE_LOGIN_SUCCESS, ON_GOOGLE_LOGIN_FAILURE,
    ON_FB_LOGIN_SUCCESS, ON_FB_LOGIN_FAILURE,
    SET_LOGINSTEP
} from '../Actions/ActionsTypes'

// initial state for login 
const INITIAL_STATE = {
    loginResponse: {},
    authenticated:false,
    login_step:0
}
export default function loginReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ON_USER_LOGIN_SUCCESS:
            return {
                ...state,
                loginResponse: (action.payload.user),
                authenticated: true
            }
        case ON_USER_LOGIN_FAILURE:
            return {
                ...state,
                loginResponse: (action.payload)
            }

        case ON_GOOGLE_LOGIN_SUCCESS:
            return {
                ...state,
                loginResponse: (action.payload)
            }
        case ON_GOOGLE_LOGIN_FAILURE:
            return {
                ...state,
                loginResponse: (action.payload)
            }

        case ON_FB_LOGIN_SUCCESS:
            return {
                ...state,
                loginResponse: (action.payload)
            }
        case ON_FB_LOGIN_FAILURE:
            return {
                ...state,
                loginResponse: (action.payload)
            }
        case SET_LOGINSTEP:
            return {
                ...state,
                login_step:1
            }
        default:
            return state
    }


}