import * as types from './actionTypes';

const initialState = {
  categoryList: [],
  forMeList: [],
  trendingList: [],
  categoryVideoList: [],
  isCategoryLoading: false,
  isForMeLoading: false,
  isTrendingLoading: false,
  isCategoryVideoLoading: false,
  searchList: [],
  isSearchListLoading: false,
  authCallback: () => { }
};
const home = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_CATEGORY_LIST:
      return {
        ...state,
        categoryList: action.payload,
        isCategoryLoading: false,
      };
    case types.SAVE_TRENDING_LIST:
      return {
        ...state,
        trendingList: action.payload,
        isTrendingLoading: false,
      };
    case types.SAVE_FOR_ME_LIST:
      return {
        ...state,
        forMeList: action.payload,
        isForMeLoading: false,
      };
    case types.SAVE_CATEGORY_VIDEO_LIST:
      return {
        ...state,
        categoryVideoList: action.payload,
        isCategoryVideoLoading: false,
      };
    case types.SET_CATEGORY_LIST_LOADER:
      return {
        ...state,
        isCategoryLoading: true,
      };
    case types.SET_TRENDING_LIST_LOADER:
      return {
        ...state,
        isTrendingLoading: true,
      };
    case types.SET_FOR_ME_LIST_LOADER:
      return {
        ...state,
        isForMeLoading: true,
      };
    case types.SET_CATEGORY_VIDEO_LIST_LOADER:
      return {
        ...state,
        isCategoryVideoLoading: true,
      };
    case types.SAVE_SEARCH_LIST:
      return {
        ...state,
        searchList: action.payload,
        isSearchListLoading: false
      };
    case types.SET_SEARCH_VIDEO_LIST_LOADER:
      return {
        ...state,
        isSearchListLoading: action.payload,
      };
    case types.SET_AUTH_CALL_BACK:
      return {
        ...state,
        authCallback: action.payload,
      };
    default:
      return state;
  }
};

export default home;
