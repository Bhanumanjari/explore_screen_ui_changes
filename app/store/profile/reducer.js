
import * as types from './actionTypes'

const initialState = {
    profileList: [],
    isProfilesLoading: false,
    userNameAvaibility: false,
    userNameErrorMessage: '',
    isUserNameValidating: false,
    userProfileDetail: {},
    isUserProfileLoading: false,
    userVideos: [],
    isUserVideoLoading: false,
    languages: [],
    isLanguagesLoading: false,
}
const profile = (state = initialState, action) => {

    switch (action.type) {
        case types.SAVE_SEARCH_PROFILE:
            return { ...state, profileList: action.payload };
        case types.SET_SEARCH_PROFILE_LOADER:
            return { ...state, isProfilesLoading: action.payload };
        case types.SAVE_USERNAME_AVAIBILITY:
            return { ...state, userNameAvaibility: action.payload };
        case types.SET_USERNAME_AVAIBILITY_LOADER:
            return { ...state, isUserNameValidating: action.payload };
        case types.SAVE_USER_PROFILE:
            return { ...state, userProfileDetail: action.payload };
        case types.SET_USER_PROFILE_LOADER:
            return { ...state, isUserProfileLoading: action.payload };
        case types.SAVE_USER_VIDEOS:
            return { ...state, userVideos: action.payload };
        case types.SET_USER_VIDEOS_LOADER:
            return { ...state, isUserVideoLoading: action.payload };
        case types.CHANGE_USERNAME_ERROR_MESSAGE:
            return { ...state, userNameErrorMessage: action.payload };
        case types.SET_LANGUAGES_LOADER:
            return { ...state, isLanguagesLoading: action.payload };
        case types.SAVE_LANGUAGES:
            return { ...state, isLanguagesLoading: false, languages: action.payload };
        default:
            return state
    }
}

export default profile
