import { fetchPopularSearch, fetchRecentSearch } from "../../Services/filterServices"
import { SAVE_POPULAR_SEARCH, SAVE_POPULAR_SEARCH_USER, SAVE_RECENT_SEARCH, SAVE_RECENT_SEARCH_USER, SET_FILTER_STATUS, SET_POPULAR_SEARCH_LOADER, SET_POPULAR_SEARCH_USER_LOADER, SET_RECENT_SEARCH_LOADER, SET_RECENT_SEARCH_USER_LOADER, SET_SEARCH_TEXT } from "./actionTypes"

export const getPopularSearch = (params) => {
    return (dispatch) => {
        dispatch(setPopularSearchLoader(true))
        fetchPopularSearch(`?isVideoSearch=1`).then(res => {
            dispatch(savePopularSearch(res))
        }).catch(err => {

        }).finally(() => {
            dispatch(setPopularSearchLoader(false))
        })
    }
}

export const getPopularUserSearch = (params) => {
    return (dispatch) => {
        dispatch(setPopularUserLoader(true))
        fetchPopularSearch('').then(res => {
            dispatch(savePopularUserSearch(res))
        }).catch(err => {

        }).finally(() => {
            dispatch(setPopularUserLoader(false))
        })
    }
}

export const getRecentSearch = (params) => {
    return (dispatch, getState) => {
        dispatch(setRecentSearchLoader(true))
        fetchRecentSearch(`?isVideoSearch=1`).then(res => {
            dispatch(saveRecentSearch(res))
        }).catch(err => {

        }).finally(() => {
            dispatch(setRecentSearchLoader(false))
        })
    }
}

export const getRecentUserSearch = (params) => {
    return (dispatch, getState) => {
        dispatch(setRecentUserLoader(true))
        fetchRecentSearch('').then(res => {
            dispatch(saveRecentUserSearch(res))
        }).catch(err => {

        }).finally(() => {
            dispatch(setRecentUserLoader(false))
        })
    }
}

export const saveRecentSearch = (payload) => {
    return {
        type: SAVE_RECENT_SEARCH,
        payload
    }
}

export const saveRecentUserSearch = (payload) => {
    return {
        type: SAVE_RECENT_SEARCH_USER,
        payload
    }
}

export const savePopularSearch = (payload) => {
    return {
        type: SAVE_POPULAR_SEARCH,
        payload
    }
}

export const savePopularUserSearch = (payload) => {
    return {
        type: SAVE_POPULAR_SEARCH_USER,
        payload
    }
}

export const setPopularSearchLoader = (payload) => {
    return {
        type: SET_POPULAR_SEARCH_LOADER,
        payload
    }
}

export const setPopularUserLoader = (payload) => {
    return {
        type: SET_POPULAR_SEARCH_USER_LOADER,
        payload
    }
}

export const setRecentSearchLoader = (payload) => {
    return {
        type: SET_RECENT_SEARCH_LOADER,
        payload
    }
}

export const setRecentUserLoader = (payload) => {
    return {
        type: SET_RECENT_SEARCH_USER_LOADER,
        payload
    }
}

export const setFilterStatus = (payload) => {
    return {
        type: SET_FILTER_STATUS,
        payload
    }
}
export const setSearchQuery = (payload) => {
    return {
        type: SET_SEARCH_TEXT,
        payload
    }
}