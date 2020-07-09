import {
    VERIFY_OTP_SUCCESS, VERIFY_OTP_FAILURE, RESEND_OTP_SUCCESS, RESEND_OTP_FAILURE, ON_USER_LOGIN_FAILURE
} from '../Actions/ActionsTypes'

// initial state for verifyOtp 
const INITIAL_STATE = {
    verifyOtpResponse: {}
}
export default function OtpReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case VERIFY_OTP_SUCCESS:
            return {
                ...state,
                verifyOtpResponse: (action.payload)
            }
        case VERIFY_OTP_FAILURE:
            return {
                ...state,
                verifyOtpResponse: (action.payload)
            }

        case RESEND_OTP_SUCCESS:
            return {
                ...state,
                // verifyOtpResponse: (action.payload)
            }
        case RESEND_OTP_FAILURE:
            return {
                ...state,
                // verifyOtpResponse: (action.payload)
            }
        default:
            return state
    }


}