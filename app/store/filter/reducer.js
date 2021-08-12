import { SAVE_POPULAR_SEARCH, SAVE_POPULAR_SEARCH_USER, SAVE_RECENT_SEARCH, SAVE_RECENT_SEARCH_USER, SET_FILTER_STATUS, SET_POPULAR_SEARCH_LOADER, SET_POPULAR_SEARCH_USER_LOADER, SET_RECENT_SEARCH_LOADER, SET_RECENT_SEARCH_USER_LOADER, SET_SEARCH_TEXT } from "./actionTypes"

let INITIAL_STATE = {
    recentSearch: [],
    popularSearch: [],
    recentUserSearch: [],
    popularUserSearch: [],
    isRecentSearchLoading: false,
    isPopularSearchLoading: false,
    isPopularUserLoading: false,
    isRecentUserLoading: false,
    isFilterApplied: false,
    searchQuery: ''
}
const filter = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_RECENT_SEARCH:
            return {
                ...state,
                recentSearch: action.payload
            }
        case SAVE_POPULAR_SEARCH:
            return {
                ...state,
                popularSearch: action.payload
            }
        case SAVE_RECENT_SEARCH_USER:
            return {
                ...state,
                recentUserSearch: action.payload
            }
        case SAVE_POPULAR_SEARCH_USER:
            return {
                ...state,
                popularUserSearch: action.payload
            }
        case SET_RECENT_SEARCH_LOADER:
            return {
                ...state,
                isRecentSearchLoading: action.payload
            }
        case SET_POPULAR_SEARCH_LOADER:
            return {
                ...state,
                isPopularSearchLoading: action.payload
            }
        case SET_RECENT_SEARCH_USER_LOADER:
            return {
                ...state,
                isRecentUserLoading: action.payload
            }
        case SET_POPULAR_SEARCH_USER_LOADER:
            return {
                ...state,
                isPopularUserLoading: action.payload
            }
        case SET_FILTER_STATUS:
            return {
                ...state,
                isFilterApplied: action.payload
            }
        case SET_SEARCH_TEXT:
            return {
                ...state,
                searchQuery: action.payload
            }

        default:
            return state
    }

}

export default filter