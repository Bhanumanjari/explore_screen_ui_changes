import { baseApiCall } from '../Config/Api';
import {
  CREATE_VIDEO,
  DELET_VIDEO,
  UPDATE_VIDEO,
  FETCH_SAVED_LIKED_VIDEO,
  GET_VIDEO_DETAILS,
  GET_VIDEO_LIST,
  LIKE_VIDEO,
  SAVE_VIDEO,
  SHARE_VIDEO,
  SENT_REQUEST,
  MARK_REQUEST_VIEW,
  CHANGE_REQ_STATUS,
  SWAP_VIDEO,
} from '../Config/apiEndPoints';

export const createVideo = (data) => {
  return baseApiCall({
    url: CREATE_VIDEO,
    method: 'post',
    data,
  });
};

export const likeVideo = (id, data) => {
  return baseApiCall({
    url: `${LIKE_VIDEO}/${id}`,
    method: 'post',
    data,
  });
};

export const saveVideo = (id, data) => {
  return baseApiCall({
    url: `${SAVE_VIDEO}/${id}`,
    method: 'post',
    data,
  });
};

export const fetchLikedVideo = (data) => {
  return baseApiCall({
    url: `${FETCH_SAVED_LIKED_VIDEO}${data}`,
    method: 'get',
  });
};

export const fetchedSavedVideo = (data) => {
  return baseApiCall({
    url: `${FETCH_SAVED_LIKED_VIDEO}${data}`,
    method: 'get',
  });
};

export const fetchExploreVideo = (query, getState) => {
  const { isGuest } = getState().login.data
  return baseApiCall({
    url: `${isGuest ? GET_VIDEO_LIST_GUEST : GET_VIDEO_LIST}${query}`,
    method: 'get',
  });
};

export const getVideoById = (videoId) => {
  return baseApiCall({
    url: `${GET_VIDEO_DETAILS}/${videoId}`,
    method: 'get',
  });
};

export const shareVideo = (videoId, data) => {
  return baseApiCall({
    url: `${SHARE_VIDEO}/${videoId}`,
    method: 'post',
    data
  });
};

export const fetchRequestSentVideo = (data) => {
  return baseApiCall({
    url: `${FETCH_SAVED_LIKED_VIDEO}${data}`,
    method: 'get',
  });
};

export const fetchRequestReceivedVideo = (data) => {
  return baseApiCall({
    url: `${FETCH_SAVED_LIKED_VIDEO}${data}`,
    method: 'get',
  });
};

export const deleteVideo = (videoId) => {
  return baseApiCall({
    url: `${DELET_VIDEO}/${videoId}`,
    method: 'delete',
    data: {}
  });
}

export const updateVideo = (videoId, data) => {
  return baseApiCall({
    url: `${UPDATE_VIDEO}/${videoId}`,
    method: 'post',
    data
  });
}

export const sentRequestOnVideo = (videoId, data) => {
  return baseApiCall({
    url: `${SENT_REQUEST}/${videoId}`,
    method: 'post',
    data
  });
}

export const markReqView = (data) => {
  return baseApiCall({
    url: `${MARK_REQUEST_VIEW}`,
    method: 'post',
    data
  });
}

export const changeReqStatus = (data) => {
  return baseApiCall({
    url: `${CHANGE_REQ_STATUS}/${data.videoId}/request/${data.requestId}`,
    method: 'post',
    data: data.data
  });
}

export const fetchSwapedVideo = (data, cancelToken) => {
  return baseApiCall({
    url: `${SWAP_VIDEO}`,
    method: 'post',
    cancelToken,
    data
  });
}