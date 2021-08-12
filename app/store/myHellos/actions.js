import { groupBy } from "lodash";
import { deleteMyHello, fetchMyHellos, fetchMyHellosDetails } from "../../Services/myHellosServices";
import { SAVE_MY_HELLOS, SAVE_MY_HELLOS_DETAILS, SET_MY_HELLOS_DETAILS_LOADER, SET_MY_HELLOS_LOADER } from "./actionTypes";

export function getMyHellos(params) {
    return (dispatch, getState) => {
        const { _id } = getState().login.data
        const hasList = getState().myHellos.myHellos.length > 0
        if(!hasList) dispatch(setMyHellosLoader(true))
        fetchMyHellos(_id, getState).then(res => {
            dispatch(saveMyHellos(res))
        }).catch(err => {
            dispatch(setMyHellosLoader(false))
        })

    }
}

export function getMyHellosDetails(hellosId) {
    return (dispatch, getState) => {
        const { _id } = getState().login.data
        dispatch(setMyHellosDetailsLoader(true))
        fetchMyHellosDetails(_id, hellosId).then(res => {
            dispatch(saveMyHellosDetails(res))
        }).catch(err => {
            dispatch(setMyHellosDetailsLoader(false))
        })

    }
}

export function deleteHello(helloId, callback = () => { }) {
    return (dispatch, getState) => {
        deleteMyHello(helloId).then(res => {
            callback(true)
        }).catch(err => {
            callback(false)
        })

    }
}

export function setMyHellosLoader(payload) {
    return {
        type: SET_MY_HELLOS_LOADER,
        payload
    }
}

export function saveMyHellos(payload) {
    return {
        type: SAVE_MY_HELLOS,
        payload
    }
}

export function saveMyHellosDetails(payload) {
    return {
        type: SAVE_MY_HELLOS_DETAILS,
        payload
    }
}

export function setMyHellosDetailsLoader(payload) {
    return {
        type: SET_MY_HELLOS_DETAILS_LOADER,
        payload
    }
}