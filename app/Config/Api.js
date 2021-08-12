import instance, { source } from './apiConfig';
import Toast from 'react-native-simple-toast';
import { reset } from '../Services/RootNavigation';
import { removeData } from './asyncStorage';
import { accessToken, faceSwipCount, userData } from '../Utils/storageKeys';
import { store } from './../index'
import axios from 'axios';
import { showBottomToast } from '../Utils';

export const baseApiCall = (config) => {
  return new Promise((resolve, reject) => {
    instance(config)
      .then(async (response) => {
        if (response.status === 200) {
          resolve(response.data.data);
        } else {
          console.log(response.status);
          if (response.status === 401) {
            await removeData(accessToken);
            await removeData(userData);
            await removeData(faceSwipCount);
            // reset('LoginScreen');
            store.getState().home.authCallback(false)
          }
          showBottomToast(response.data.message)
          reject(false);
        }
      })
      .catch(async (e) => {
        if (axios.isCancel(e)) {
          showBottomToast(e.message)
        } else {
          showBottomToast(e?.response?.data?.message ?? 'Please check your internet connection')
        }
        reject(e);
        if (e?.response?.data?.statusCode === 401) {
          await removeData(accessToken);
          await removeData(userData);
          await removeData(faceSwipCount);
          // reset('LoginScreen');
          store.getState().home.authCallback(false)
        }
      });
  });
};
