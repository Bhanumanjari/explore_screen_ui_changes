import { fetchCategoryList, getVideoList } from '../../Services/homeServices';
import { setFilterStatus } from '../filter';
import {
  SAVE_CATEGORY_LIST,
  SAVE_CATEGORY_VIDEO_LIST,
  SAVE_FOR_ME_LIST,
  SAVE_SEARCH_LIST,
  SAVE_TRENDING_LIST,
  SET_AUTH_CALL_BACK,
  SET_CATEGORY_LIST_LOADER,
  SET_CATEGORY_VIDEO_LIST_LOADER,
  SET_FOR_ME_LIST_LOADER,
  SET_SEARCH_VIDEO_LIST_LOADER,
  SET_TRENDING_LIST_LOADER,
} from './actionTypes';

export function getTrendingVideo(params) {
  return (dispatch, getState) => {
    const hasList = getState().home.trendingList.length > 0
    if(!hasList) dispatch(setTrendingLoader(true));
    getVideoList(params, getState)
      .then((res) => {
        dispatch(saveTrendingVideo(res));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setTrendingLoader(false));
      });
  };
}

export function saveTrendingVideo(data) {
  return {
    type: SAVE_TRENDING_LIST,
    payload: data,
  };
}

export function getForMeVideo(params) {
  return (dispatch, getState) => {
    const hasList = getState().home.forMeList.length > 0
    if(!hasList) dispatch(setForMeLoader(true));
    getVideoList(params, getState)
      .then((res) => {
        dispatch(saveForMeVideo(res));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setForMeLoader(false));
      });
  };
}

export function saveForMeVideo(data) {
  return {
    type: SAVE_FOR_ME_LIST,
    payload: data,
  };
}

export function getCategoryList(params, fetchList = false) {
  return (dispatch, getState) => {
    const hasList = getState().home.categoryList.length > 0
    if(!hasList) dispatch(setCategoryLoader(true));
    fetchCategoryList(params)
      .then((res) => {
        dispatch(saveCategoryList(res));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setCategoryLoader(false));
        // dispatch(setCategoryVideoLoader(false))
      });
  };
}

export function saveCategoryList(data) {
  return {
    type: SAVE_CATEGORY_LIST,
    payload: data,
  };
}
export function getCategoryVideoList(params) {
  return (dispatch, getState) => {
    const hasList = getState().home.categoryVideoList.length > 0
    if(!hasList) dispatch(setCategoryVideoLoader(true));
    getVideoList(params, getState)
      .then((res) => {
        dispatch(saveCategoryVideoList(res));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setCategoryVideoLoader(false));
      });
  };
}

export function searchVideoByText(params) {
  return (dispatch, getState) => {
    dispatch(setSearchLoader(true));
    dispatch(setFilterStatus(true));
    getVideoList(params, getState)
      .then((res) => {
        dispatch(saveSearchVideoList(res));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setSearchLoader(false));
      })
  };
}

export function setAuthCallback(callback) {
  return {
    type: SET_AUTH_CALL_BACK,
    payload: callback,
  };
}

export function saveSearchVideoList(data) {
  return {
    type: SAVE_SEARCH_LIST,
    payload: data,
  };
}

export function setSearchLoader(data) {
  return {
    type: SET_SEARCH_VIDEO_LIST_LOADER,
    payload: data,
  };
}

export function saveCategoryVideoList(data) {
  return {
    type: SAVE_CATEGORY_VIDEO_LIST,
    payload: data,
  };
}

export function setCategoryLoader(data) {
  return {
    type: SET_CATEGORY_LIST_LOADER,
    payload: data,
  };
}
export function setCategoryVideoLoader(data) {
  return {
    type: SET_CATEGORY_VIDEO_LIST_LOADER,
    payload: data,
  };
}
export function setTrendingLoader(data) {
  return {
    type: SET_TRENDING_LIST_LOADER,
    payload: data,
  };
}
export function setForMeLoader(data) {
  return {
    type: SET_FOR_ME_LIST_LOADER,
    payload: data,
  };
}
