import { baseApiCall } from "../Config/Api"
import { DELETE_FACE, UPDATE_PROFILE, SEARCH_PROFILE, GET_LANGUAGES, FEEDBACK } from "../Config/apiEndPoints"

export const updateProfile = (data) => {
    return baseApiCall({
        url: UPDATE_PROFILE,
        method: 'post',
        data
    })
}

export const deleteFace = (data) => {
    return baseApiCall({
        url: `${DELETE_FACE}`,
        method: 'post',
        data
    })
}

export const searchProfile = (data) => {
    return baseApiCall({
        url: `${SEARCH_PROFILE}${data}`,
        method: 'get',
    })
}

export const fetchLanguages = () => {
    return baseApiCall({
        url: `${GET_LANGUAGES}`,
        method: 'get',
    })
}

export const feedback = (data) => {
    return baseApiCall({
        url: `${FEEDBACK}`,
        method: 'post',
        data
    })
}