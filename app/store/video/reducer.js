import {
  SAVE_EXPLORE_VIDEO,
  SAVE_LIKED_VIDEO,
  SAVE_REQUEST_RECEIVED_VIDEO,
  SAVE_REQUEST_SENT_VIDEO,
  SAVE_SAVED_VIDEO,
  SAVE_SWAPE_VIDEO_DATA,
  SET_EXPLORE_VIDEO_LOADER,
  SET_LIKE_VIDEO_LOADER,
  SET_REQUEST_RECEIVED_LOADER,
  SET_REQUEST_SENT_LOADER,
  SET_SAVE_VIDEO_LOADER,
} from './actionTypes';

let initialState = {
  likedVideos: {},
  savedVideos: {},
  requestSentVideo: {},
  requestRecievedVideo: {},
  exploreVideoList: [],
  isLikeVideoLoading: false,
  isSaveVideoLoading: false,
  isExploreVideoLoading: false,
  isRequestSentVideoLoading: false,
  isRequestReceivedVideoLoading: false,
  swapedVideoData: {}
};
const video = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_LIKED_VIDEO:
      return {
        ...state,
        likedVideos: action.payload,
      };
    case SAVE_SAVED_VIDEO:
      return {
        ...state,
        savedVideos: action.payload,
      };
    case SET_LIKE_VIDEO_LOADER:
      return {
        ...state,
        isLikeVideoLoading: action.payload,
      };
    case SET_SAVE_VIDEO_LOADER:
      return {
        ...state,
        isSaveVideoLoading: action.payload,
      };
    case SAVE_EXPLORE_VIDEO:
      return {
        ...state,
        exploreVideoList: action.payload,
        isExploreVideoLoading: false
      };
    case SET_EXPLORE_VIDEO_LOADER:
      return {
        ...state,
        isExploreVideoLoading: action.payload,
      };
    case SAVE_REQUEST_SENT_VIDEO:
      return {
        ...state,
        requestSentVideo: action.payload,
      };
    case SET_REQUEST_SENT_LOADER:
      return {
        ...state,
        isRequestSentVideoLoading: action.payload,
      };
    case SAVE_REQUEST_RECEIVED_VIDEO:
      return {
        ...state,
        requestRecievedVideo: action.payload,
      };
    case SET_REQUEST_RECEIVED_LOADER:
      return {
        ...state,
        isRequestReceivedVideoLoading: action.payload,
      };
    case SAVE_SWAPE_VIDEO_DATA:
      return {
        ...state,
        swapedVideoData: action.payload,
      };
    default:
      return state;
  }
};

export default video;
