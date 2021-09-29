import { apiLoadingStart, apiLoadingStop } from 'app/store/global';
import { signUp, signUpGuest, loginGuest } from '../../Services/authApiServices';
import { setAccessToken, setProfile } from '../login/actions';
import { updateProfileAction } from '../profile/actions';
import { delay } from './../../Utils/globalFun';

export const signup = (params, { onSuccess, onError }) => {
  return (dispatch, getState) => {
    dispatch(apiLoadingStart());
    signUp(params)
      .then((res) => {
        dispatch(setAccessToken(res.accessToken));
        // const state = getState();
        // console.log(state);
        // const user = state?.login?.data ?? {};
        // delay(200);
        // updateGuestData(user, dispatch);
        dispatch(setProfile({ ...res }));
        // await delay(500);
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

export const signupGuest = (params, { onSuccess, onError }) => {
  console.log("in signupGuest and params are = ",params) ;
  return (dispatch, getState) => {
    dispatch(apiLoadingStart());
    signUpGuest(params)
      .then((res) => {
        dispatch(setAccessToken(res.accessToken));
        // const state = getState();
        // console.log(state);
        // const user = state?.login?.data ?? {};
        // delay(200);
        // updateGuestData(user, dispatch);
        dispatch(setProfile({ ...res }));
        // await delay(500);
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

export const LoginGuest = (params, { onSuccess, onError }) => {
  return (dispatch, getState) => {
    dispatch(apiLoadingStart());
    loginGuest(params)
      .then((res) => {
        dispatch(setAccessToken(res.accessToken));
        // const state = getState();
        // console.log(state);
        // const user = state?.login?.data ?? {};
        // delay(200);
        // updateGuestData(user, dispatch);
        dispatch(setProfile({ ...res, isGuest: false }));
        // await delay(500);
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


const updateGuestData = (user, dispatch) => {
  console.log(user);
  if (user.faces || user.preferences) {
    let formData = new FormData();
    if (user.preferences.length) {
      user.preferences.some((preference, index) => {
        formData.append(`preferences`, preference);
      });
    }
    dispatch(updateProfileAction(formData, { loading: false }));
    if (user.faces.length) {
      user.faces.some((face, index) => {
        formData.append('faceFile', {
          uri: face.uri,
          type: 'image/*',
          name: 'photo.png',
        });
        dispatch(updateProfileAction(formData, { loading: false }));
      });
    }
  }
};
