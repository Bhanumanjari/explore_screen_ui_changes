import { baseApiCall } from "../Config/Api"
import { GET_CATEGORY_LIST, GET_PROFILE, GET_USER_PROFILE, GET_VIDEO_LIST, GET_VIDEO_LIST_GUEST } from "../Config/apiEndPoints"

export const getVideoList = (query = '', getState) => {
    return baseApiCall({
        url: `${GET_VIDEO_LIST}${query}`,
        method: 'get',
    })
}

export const fetchCategoryList = (query = '') => {
    return baseApiCall({
        url: `${GET_CATEGORY_LIST}${query}`,
        method: 'get',
    })
}

export const fetchMe = () => {
    return baseApiCall({
        url: `${GET_PROFILE}`,
        method: 'get',
    })
}

export const fetchProfileById = (userId) => {
    return baseApiCall({
        url: `${GET_USER_PROFILE}/${userId}`,
        method: 'get',
    })
}

export const fetchUserVideosById = (query) => {
    return baseApiCall({
        url: `${GET_VIDEO_LIST}${query}`,
        method: 'get',
    })
}