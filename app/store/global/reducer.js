import * as types from './actionTypes';

const initialState = {
  loading: false,
  isInternetConnected: true,
  isThemLoaderVisible: false,
  appConfig: {
    loaderTime: 60
  }
};
const globalData = (state = initialState, action) => {
  switch (action.type) {
    case types.API_LOADING_START:
      return { ...state, loading: true };
    case types.API_LOADING_STOP:
      return { ...state, loading: false };
    case types.IS_INTERNET_CONNECTED:
      // console.warn(action.payload);
      if (action.payload === false) {
        return { ...state, isInternetConnected: action.payload, loading: false };
      } else {
        return { ...state, isInternetConnected: action.payload };
      }
    case types.THEM_LOADER_STRAT:
      return {
        ...state,
        isThemLoaderVisible: true,
      };
    case types.THEM_LOADER_STOP:
      return {
        ...state,
        isThemLoaderVisible: false,
      };
    case types.SAVE_APP_CONFIG:
      return {
        ...state,
        appConfig: action.payload,
      };
    default:
      return state;
  }
};

export default globalData;
