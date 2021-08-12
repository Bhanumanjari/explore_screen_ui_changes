import { SAVE_MY_HELLOS, SAVE_MY_HELLOS_DETAILS, SET_MY_HELLOS_DETAILS_LOADER, SET_MY_HELLOS_LOADER } from "./actionTypes"

const INITIAL_STATE = {
    myHellos: [],
    isMyHellosLoading: false,
    myHellosDetails: [],
    isDetailsFetching: false
}
const myHellos = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_MY_HELLOS:
            return {
                ...state,
                myHellos: action.payload,
                isMyHellosLoading: false
            }
        case SET_MY_HELLOS_LOADER:
            return {
                ...state,
                isMyHellosLoading: action.payload
            }
        case SAVE_MY_HELLOS_DETAILS:
            return {
                ...state,
                myHellosDetails: action.payload,
                isDetailsFetching: false
            }
        case SET_MY_HELLOS_DETAILS_LOADER:
            return {
                ...state,
                isDetailsFetching: action.payload
            }
        default:
            return state
    }

}

export default myHellos