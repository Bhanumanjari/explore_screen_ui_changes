import { baseApiCall } from "../Config/Api";
import { GET_POPULAR_SEARCH, GET_RECENT_SEARCH } from "../Config/apiEndPoints";

export function fetchRecentSearch(query = 1) {
    return baseApiCall({
        url: `${GET_RECENT_SEARCH}${query}`,
        method: 'get',
    })
}

export function fetchPopularSearch(query) {
    return baseApiCall({
        url: `${GET_POPULAR_SEARCH}${query}`,
        method: 'get',
    })
}