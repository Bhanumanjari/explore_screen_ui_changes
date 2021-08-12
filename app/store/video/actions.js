import { Platform } from 'react-native';
import { DocumentDirectoryPath, downloadFile } from 'react-native-fs';
import Share from 'react-native-share';
import { requestStoragePermission } from '../../Config/permissions';
import { getVideoList } from '../../Services/homeServices';
import {
  createVideo,
  fetchedSavedVideo,
  fetchExploreVideo,
  fetchLikedVideo,
  fetchRequestSentVideo,
  fetchRequestReceivedVideo,
  getVideoById,
  likeVideo,
  saveVideo,
  shareVideo,
  deleteVideo,
  updateVideo,
  sentRequestOnVideo,
  markReqView,
  changeReqStatus,
  fetchSwapedVideo,
} from '../../Services/videoServices';
import { showBottomToast } from '../../Utils';
import { delay } from '../../Utils/globalFun';
import { apiLoadingStart, apiLoadingStop } from '../global/actions';
import { getMyHellos } from '../myHellos';
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

export const createVideoAction = (data, callback = () => { }) => {
  return (dispatch) => {
    createVideo(data)
      .then((res) => {
        if (res) {
          callback(true);
        } else {
          callback(false);
        }
      })
      .catch((err) => {
        callback(false);
      });
  };
};
export const likeVideoAction = (id, data, callback = () => { }) => {
  return (dispatch) => {
    console.log(data);
    likeVideo(id, data)
      .then((res) => {
        if (res) {
          callback(true);
          if(data.op === 'add'){
            showBottomToast("You liked video!")
          }else {
            showBottomToast("Video disliked")
          }
        }
      })
      .catch((err) => {
        callback(false);
      });
  };
};
export const saveVideoAction = (id, data, callback = () => { }) => {
  return (dispatch) => {
    console.log(data);
    saveVideo(id, data)
      .then((res) => {
        if (res) {
          callback(true);
          if(data.op === 'add'){
            showBottomToast("Video added in saved collection")
          }else {
            showBottomToast("Video removed from saved collection")
          }
        }
      })
      .catch((err) => {
        callback(false);
      });
  };
};

export const getLikedVideo = (data) => {
  return (dispatch) => {
    dispatch(setLikeVideoLoader(true));
    fetchLikedVideo(data)
      .then((res) => {
        dispatch(saveLikedVideo(res));
      })
      .catch((err) => { })
      .finally(() => {
        dispatch(setLikeVideoLoader(false));
      });
  };
};

export const getSavedVideo = (data) => {
  return (dispatch) => {
    dispatch(setLikeVideoLoader(true));
    fetchedSavedVideo(data)
      .then((res) => {
        dispatch(saveSavedVideo(res));
      })
      .catch((err) => { })
      .finally(() => {
        dispatch(setLikeVideoLoader(false));
      });
  };
};

export const getExploreVideo = (params = '') => {

  return (dispatch, getState) => {
    const hasList = getState().video.exploreVideoList.length > 0
    if(!hasList) dispatch(setExploreVideoLoader(true))

    params = `?sortBy=popular&${params}`

    getVideoList(params, getState).then(res => {
      dispatch(saveExploreVideos(res))
    }).catch(err => {
      dispatch(setExploreVideoLoader(false))
    })
  }

}

export const shareVideoAction = (id, data, callback = () => { }) => {
  return (dispatch) => {
    shareVideo(id, data)
      .then((res) => {
        if (res) {
          callback(true);
        }
      })
      .catch((err) => {
        callback(false);
      });
  };
};

export const getVideoByIdActions = (id, callback = () => { }) => {
  return (dispatch) => {
    getVideoById(id)
      .then((res) => {
        if (res) {
          callback(res);
        }
      })
      .catch((err) => {
        callback(false);
      });
  };
};

export const getRequestSentVideo = (data) => {
  return (dispatch) => {
    dispatch(setRequestSentVideoLoader(true));
    fetchRequestSentVideo(data)
      .then((res) => {
        dispatch(saveRequestSentVideo(res));
      })
      .catch((err) => { })
      .finally(() => {
        dispatch(setRequestSentVideoLoader(false));
      });
  };
};

export const getRequestReceivedVideo = (data) => {
  return (dispatch) => {
    dispatch(setRequestReceivedVideoLoader(true));
    fetchRequestReceivedVideo(data)
      .then((res) => {
        dispatch(saveRequestReceivedVideo(res));
      })
      .catch((err) => { })
      .finally(() => {
        dispatch(setRequestReceivedVideoLoader(false));
      });
  };
};

export const deleteVideoById = (id, callback) => {
  return (dispatch) => {
    dispatch(apiLoadingStart())
    deleteVideo(id).then(res => {
      callback(res)
    }).catch(err => {
      callback(false)
    }).finally(() => {
      dispatch(apiLoadingStop())
    })
  };
};

export const updateVideoById = (data, callback) => {
  return (dispatch) => {
    const { _id, formData } = data
    updateVideo(_id, formData).then(res => {
      callback(res)
    }).catch(err => {
      callback(false)
    }).finally(() => {
    })
  };
};

export const sentRequest = (params, callback) => {
  return (dispatch) => {
    const { _id, data } = params
    sentRequestOnVideo(_id, data).then(res => {
      showBottomToast("Request sent successfully")
      callback(res)
    }).catch(err => {
      callback(false)
    }).finally(() => {
    })
  };
};

export const markRequestView = (params, callback) => {
  return (dispatch) => {
    markReqView(params).then(res => {
      callback(res)
    }).catch(err => {
      callback(false)
    }).finally(() => {
    })
  };
};

export const changeRequestStatus = (params, callback) => {
  return (dispatch) => {
    changeReqStatus(params).then(res => {
      callback(res)
    }).catch(err => {
      callback(false)
    }).finally(() => {
    })
  };
};

export const swapVideo = (data, cancelToken) => {
  return (dispatch) => {
    return fetchSwapedVideo(data, cancelToken).then(res => {
      dispatch(getMyHellos())
      return dispatch(saveSwapVideo(res))
    }).catch(err => {
      // console.log(err)
    })
  };
};

export const shareVideoOnSocial = (_id ,video, callback = () => {}) => {
  return async (dispatch) => {
    const options = {
      fromUrl: video.original,
      toFile: `${DocumentDirectoryPath}/share_${video.fileName}`,
    };

    let permission = true
    if (Platform.OS === 'android') {
      permission = await requestStoragePermission()
    }

    if (!permission)
      return

    dispatch(apiLoadingStart())
    downloadFile(options).promise.then(async res => {
      if (res.statusCode === 200) {
        dispatch(apiLoadingStop())
        await delay(500)
        const response = await Share.open({
          title: 'Share hello',
          message: `helloface://hello/${_id}`,
          url: `file://${DocumentDirectoryPath}/share_${video.fileName}`,
          type: "video/mp4"
        })
        callback(true)
        dispatch(shareVideoAction(_id, {
          op: 'add'
        }))
      }
    }).catch(err => {
      console.log("err", err)
      callback(false)
      dispatch(apiLoadingStop())
    })
  };
};

export const saveLikedVideo = (payload) => {
  return {
    type: SAVE_LIKED_VIDEO,
    payload,
  };
};

export const saveSavedVideo = (payload) => {
  return {
    type: SAVE_SAVED_VIDEO,
    payload,
  };
};

export const setLikeVideoLoader = (payload) => {
  return {
    type: SET_LIKE_VIDEO_LOADER,
    payload,
  };
};

export const setSaveVideoLoader = (payload) => {
  return {
    type: SET_SAVE_VIDEO_LOADER,
    payload,
  };
};

export const saveExploreVideos = (payload) => {
  return {
    type: SAVE_EXPLORE_VIDEO,
    payload,
  };
};

export const setExploreVideoLoader = (payload) => {
  return {
    type: SET_EXPLORE_VIDEO_LOADER,
    payload,
  };
};

export const saveRequestSentVideo = (payload) => {
  return {
    type: SAVE_REQUEST_SENT_VIDEO,
    payload,
  };
};

export const setRequestSentVideoLoader = (payload) => {
  return {
    type: SET_REQUEST_SENT_LOADER,
    payload,
  };
};

export const saveRequestReceivedVideo = (payload) => {
  return {
    type: SAVE_REQUEST_RECEIVED_VIDEO,
    payload,
  };
};

export const setRequestReceivedVideoLoader = (payload) => {
  return {
    type: SET_REQUEST_RECEIVED_LOADER,
    payload,
  };
};

export const saveSwapVideo = (payload) => {
  return {
    type: SAVE_SWAPE_VIDEO_DATA,
    payload,
  };
};