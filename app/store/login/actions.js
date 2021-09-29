import * as types from './actionTypes';
import { apiLoadingStart, apiLoadingStop } from 'app/store/global';

import { endPoints, SesstionKey } from 'app/Constants';
import { ToastType, showToast } from 'app/Utils';
import { login } from '../../Services/authApiServices';
import { fetchMe } from '../../Services/homeServices';
import { saveData } from '../../Config/asyncStorage';
import { accessToken, userData } from '../../Utils/storageKeys';
import instance from '../../Config/apiConfig';

export const loginUser = (params, { onSuccess, onError }) => {
  return (dispatch) => {
    dispatch(apiLoadingStart());
    login(params)
      .then((res) => {
        dispatch(setAccessToken(res.accessToken));
        dispatch(setProfile({ ...res, isGuest: false }));
        dispatch(apiLoadingStop());
        onSuccess(res);
      })
      .catch((err) => {
        dispatch(apiLoadingStop());
        onError();
        console.log(err);
      });
  };
};

export const logOut = () => {
  return (dispatch) => {
      try{
        
        dispatch(setProfile({  }));
        
      }catch{(err) => { 
        console.log(err);
        }
      };
  };
};



export const fetchUserProfile = () => {
  return (dispatch) => {
    fetchMe().then(res => {
      dispatch(setProfile({ ...res }));
    }).catch(err => {
    })
  }
}

export const getProfile = (data) => {
  return (dispatch) => {
    dispatch(setProfile(data));
  };
};

export const getAccessToken = (data) => {
  return (dispatch) => {
    dispatch(setAccessToken(data));
  };
};

export const setProfile = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: types.SET_PROFILE,
      payload,
    });
    await saveData(JSON.stringify(payload), userData);
  };
};

export const setAccessToken = (payload) => {
  return async (dispatch) => {
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + payload;
    dispatch({
      type: types.UPDATE_ACCESS_TOKEN,
      payload,
    });
    await saveData(payload, accessToken);
  };
};
// const loginLoadingStart = () => ({type: types.API_LOADING_START});
// const loginLoadingStop = () => ({type: types.API_LOADING_STOP});
