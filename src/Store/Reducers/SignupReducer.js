import {
    ON_USER_SIGNUP_SUCCESS, ON_USER_SIGNUP_FAILURE
} from '../Actions/ActionsTypes'

// initial state for login 
const INITIAL_STATE = {
    signupResponse: {}
}
export default function signupReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ON_USER_SIGNUP_SUCCESS:
            return {
                ...state,
                signupResponse: (action.payload)
            }
        case ON_USER_SIGNUP_FAILURE:
            return {
                ...state,
                signupResponse: (action.payload)
            }
        default:
            return state
    }


}