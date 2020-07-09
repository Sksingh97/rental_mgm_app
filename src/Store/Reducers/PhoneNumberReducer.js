import {
    RESET_PASS_OTP_SUCCESS, RESET_PASS_OTP_FAILURE
} from '../Actions/ActionsTypes'

// initial state for login 
const INITIAL_STATE = {
    resetPassOtpResponse: {}
}
export default function signupReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case RESET_PASS_OTP_SUCCESS:
            return {
                ...state,
                resetPassOtpResponse: (action.payload)
            }
        case RESET_PASS_OTP_FAILURE:
            return {
                ...state,
                resetPassOtpResponse: (action.payload)
            }
        default:
            return state
    }


}