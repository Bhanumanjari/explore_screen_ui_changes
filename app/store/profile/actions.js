import { deleteFace, feedback, fetchLanguages, searchProfile, updateProfile } from '../../Services/profileServices';
import { UPDATE_PROFILE, SAVE_USER_PROFILE, SET_USER_PROFILE_LOADER, SAVE_SEARCH_PROFILE, SET_SEARCH_PROFILE_LOADER, SAVE_USERNAME_AVAIBILITY, SET_USERNAME_AVAIBILITY_LOADER, SAVE_USER_VIDEOS, SET_USER_VIDEOS_LOADER, CHANGE_USERNAME_ERROR_MESSAGE, SET_LANGUAGES_LOADER, SAVE_LANGUAGES } from './actionTypes';
import { setAccessToken, setProfile } from './../login/actions';
import { apiLoadingStart, apiLoadingStop } from './../global/actions';
import { showBottomToast } from '../../Utils';
import { checkUserName } from '../../Services/authApiServices';
import { fetchProfileById, fetchUserVideosById } from '../../Services/homeServices';
import { setFilterStatus } from '../filter';

export const updateProfileAction = (
  params,
  { onSuccess = () => { }, onError = () => { }, loading = true } = {},
) => {
  return (dispatch) => {
    loading && dispatch(apiLoadingStart());
    updateProfile(params)
      .then((res) => {
        dispatch(setProfile(res));
        dispatch(setAccessToken(res.accessToken));
        onSuccess();
      })
      .catch((err) => {
        console.log(err);
        onError();
      })
      .finally(() => {
        loading && dispatch(apiLoadingStop());
      });
  };
};

export const removeFace = (
  params,
  { onSuccess = () => { }, onError = () => { }, loading = true } = {},
) => {
  return (dispatch, getState) => {
    loading && dispatch(apiLoadingStart());
    deleteFace(params)
      .then((res) => {
        onSuccess();
        const userData = getState().login.data
        // console.log(userData)
        dispatch(setProfile({ ...userData, faces: res.faces }));
        dispatch(setAccessToken(res.accessToken));
        showBottomToast('Face removed successfully')
      })
      .catch((err) => {
        console.log(err);
        onError();
      })
      .finally(() => {
        loading && dispatch(apiLoadingStop());
      });
  };
};

export const fetchProfiles = (params) => {
  return (dispatch) => {
    dispatch(setProfileSearchLoader(true))
    dispatch(setFilterStatus(true));
    searchProfile(params)
      .then((res) => {
        dispatch(saveProfile(res))
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(setProfileSearchLoader(false))
      });
  };
};

export const checkUserNameAvaibility = (data) => {
  return (dispatch) => {
    dispatch(setUserNameAvaibilityLoader(true))
    dispatch(changeUserNameErrorMessage(''))
    checkUserName(data).then(res => {
      dispatch(saveUserNameAvaibility(true))
      dispatch(changeUserNameErrorMessage(''))
    }).catch(err => {
      if (err.response) {
        if (err.response?.data?.statusCode === 400) {
          dispatch(saveUserNameAvaibility(false))
          dispatch(changeUserNameErrorMessage(`${data?.username} username is already taken`))
        }
      }
    }).finally(() => {
      dispatch(setUserNameAvaibilityLoader(false))
    })
  }

}

export const getUserProfileById = (id) => {
  return (dispatch) => {
    dispatch(setUserProfileLoader(true))
    fetchProfileById(id).then(res => {
      dispatch(saveUserProfile(res))
    }).catch(err => {

    }).finally(() => {
      dispatch(setUserProfileLoader(false))
    })
  }

}

export const getUserVideos = (id) => {
  return (dispatch) => {
    dispatch(setUserVideoLoader(true))
    fetchUserVideosById(`?userId=${id}`).then(res => {
      dispatch(saveUserVideos(res))
    }).catch(err => {

    }).finally(() => {
      dispatch(setUserVideoLoader(false))
    })
  }

}

export const getLanguages = () => {
  return (dispatch) => {
    dispatch(setLanguageLoader(true))
    fetchLanguages().then(res => {
      dispatch(saveLanguages(res))
    }).catch(err => {
      dispatch(setLanguageLoader(false))
    })
  }

}

export const postFeedback = (data, callback) => {
  return (dispatch) => {
    feedback(data).then(res => {
      callback(true)
    }).catch(err => {
      callback(false)
    })
  }

}

export const saveProfile = (payload) => {
  return {
    type: SAVE_SEARCH_PROFILE,
    payload
  }
}

export const setProfileSearchLoader = (payload) => {
  return {
    type: SET_SEARCH_PROFILE_LOADER,
    payload
  }
}

export const saveUserNameAvaibility = (payload) => {
  return {
    type: SAVE_USERNAME_AVAIBILITY,
    payload
  }
}

export const setUserNameAvaibilityLoader = (payload) => {
  return {
    type: SET_USERNAME_AVAIBILITY_LOADER,
    payload
  }
}

export const saveUserProfile = (payload) => {
  return {
    type: SAVE_USER_PROFILE,
    payload
  }
}

export const setUserProfileLoader = (payload) => {
  return {
    type: SET_USER_PROFILE_LOADER,
    payload
  }
}

export const saveUserVideos = (payload) => {
  return {
    type: SAVE_USER_VIDEOS,
    payload
  }
}

export const setUserVideoLoader = (payload) => {
  return {
    type: SET_USER_VIDEOS_LOADER,
    payload
  }
}

export const changeUserNameErrorMessage = (payload) => {
  return {
    type: CHANGE_USERNAME_ERROR_MESSAGE,
    payload
  }
}

export const setLanguageLoader = (payload) => {
  return {
    type: SET_LANGUAGES_LOADER,
    payload
  }
}

export const saveLanguages = (payload) => {
  return {
    type: SAVE_LANGUAGES,
    payload
  }
}