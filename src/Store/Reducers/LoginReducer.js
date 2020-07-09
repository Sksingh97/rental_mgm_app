import {
    ON_USER_LOGIN_SUCCESS, ON_USER_LOGIN_FAILURE,
    ON_GOOGLE_LOGIN_SUCCESS, ON_GOOGLE_LOGIN_FAILURE,
    ON_FB_LOGIN_SUCCESS, ON_FB_LOGIN_FAILURE
} from '../Actions/ActionsTypes'

// initial state for login 
const INITIAL_STATE = {
    loginResponse: {}
}
export default function loginReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ON_USER_LOGIN_SUCCESS:
            return {
                ...state,
                loginResponse: (action.payload)
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
        default:
            return state
    }


}