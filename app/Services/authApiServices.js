import { baseApiCall } from "../Config/Api"
import { APP_SETTINGS, CHECK_USERNAME, FORGOT_PASSWORD, LOGIN, LOGINGUEST, REGISTER, REGISTERGUEST, RESEND_OTP, RESET_PASSWORD, VERIFY_OTP } from "../Config/apiEndPoints"

export const fetchOtp = (data) => {
    return baseApiCall({
        url: RESEND_OTP,
        method: 'post',
        data
    })
}

export const checkUserName = (data) => {
    return baseApiCall({
        url: CHECK_USERNAME,
        method: 'post',
        data
    })
}

export const verifyOtp = (data) => {
    return baseApiCall({
        url: VERIFY_OTP,
        method: 'post',
        data
    })
}

export const signUp = (data) => {
    return baseApiCall({
        url: REGISTER,
        method: 'post',
        data
    })
}
export const signUpGuest = (data) => {
    return baseApiCall({
        url: REGISTERGUEST,
        method: 'post',
        data
    })
}

export const login = (data) => {
    return baseApiCall({
        url: LOGIN,
        method: 'post',
        data
    })
}

export const loginGuest = (data) => {
    return baseApiCall({
        url: LOGINGUEST,
        method: 'post',
        data
    })
}

export const forgotPasswordSendOtp = (data) => {
    return baseApiCall({
        url: FORGOT_PASSWORD,
        method: 'post',
        data
    })
}

export const resetPassword = (data, token) => {
    return baseApiCall({
        url: RESET_PASSWORD,
        method: 'post',
        headers: {
            Authorization: "Bearer " + token
        },
        data
    })
}

export const getAppSettings = () => {
    return baseApiCall({
        url: APP_SETTINGS,
        method: 'get',
    })
}