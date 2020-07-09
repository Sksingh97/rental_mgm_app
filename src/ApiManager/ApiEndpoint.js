
//export const BASE_DEV_URL = "";      // 
//export const BASE_DEV_URL = ""            // aws development
// export const BASE_DEV_URL = ""       // Production


// export const GEO_CODER_API = ""

const LOGIN_ENDPOINT = "/user/login"
const GOOGLE_LOGIN_ENDPOINT = "/user/login/gp"
const FB_LOGIN_ENDPOINT = "/user/login/fb"
const SIGNUP_ENDPOINT = "/user/signup"
const VERIFY_OTP_ENDPOINT = "/user/verify-otp"
const RESEND_OTP_ENDPOINT = "/user/resend-otp"
const RESET_PASS_OTP_ENDPOINT = "/user/reset-password-otp"
const RESET_PASS_ENDPOINT = "/user/reset-password"
const LOGOUT_ENDPOINT = "/user/logout"


export const LOGIN = 'LOGIN'
export const GOOGLE_LOGIN = 'GOOGLE_LOGIN'
export const FB_LOGIN = 'FB_LOGIN'
export const SIGNUP = 'SIGNUP'
export const VERIFY_OTP = 'VERIFY_OTP'
export const RESEND_OTP = 'RESEND_OTP'
export const RESET_PASS_OTP = "RESET_PASS_OTP"
export const RESET_PASS = "RESET_PASS"
export const LOGOUT = "LOGOUT"



export default function ApiEndpoint(type) {

    switch (type) {
        case LOGIN:
            return `${BASE_DEV_URL}${LOGIN_ENDPOINT}`
        case GOOGLE_LOGIN:
            return `${BASE_DEV_URL}${GOOGLE_LOGIN_ENDPOINT}`
        case FB_LOGIN:
            return `${BASE_DEV_URL}${FB_LOGIN_ENDPOINT}`
        case SIGNUP:
            return `${BASE_DEV_URL}${SIGNUP_ENDPOINT}`
        case VERIFY_OTP:
            return `${BASE_DEV_URL}${VERIFY_OTP_ENDPOINT}`
        case RESEND_OTP:
            return `${BASE_DEV_URL}${RESEND_OTP_ENDPOINT}`
        case RESET_PASS_OTP:
            return `${BASE_DEV_URL}${RESET_PASS_OTP_ENDPOINT}`
        case RESET_PASS:
            return `${BASE_DEV_URL}${RESET_PASS_ENDPOINT}`
        case LOGOUT:
            return `${BASE_DEV_URL}${LOGOUT_ENDPOINT}`
    }
}