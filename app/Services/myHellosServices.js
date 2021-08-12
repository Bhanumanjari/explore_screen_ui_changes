import { baseApiCall } from "../Config/Api"
import { DELETE_MY_HELLOS, GET_MY_HELLOS } from "../Config/apiEndPoints"

export const fetchMyHellos = (userId) => {
    return baseApiCall({
        url: `${GET_MY_HELLOS}/${userId}`,
        method: 'get',
    })
}

export const fetchMyHellosDetails = (userId,hellosId) => {
    return baseApiCall({
        url: `${GET_MY_HELLOS}/${userId}/details/${hellosId}`,
        method: 'get',
    })
}

export const deleteMyHello = (helloId) => {
    return baseApiCall({
        url: `${DELETE_MY_HELLOS}/${helloId}/swapped-videos`,
        method: 'delete',
    })
}