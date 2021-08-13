import { getData, saveData } from '../../Config/asyncStorage';
import { getAppSettings } from '../../Services/authApiServices';
import { appSettings } from '../../Utils/storageKeys';
import * as types from './actionTypes';

export const apiLoadingStart = () => ({ type: types.API_LOADING_START });
export const apiLoadingStop = () => ({ type: types.API_LOADING_STOP });
export const noInternetConnected = (isConnected) => ({
  type: types.IS_INTERNET_CONNECTED,
  payload: isConnected,
});
export const themLoaderStart = () => ({ type: types.THEM_LOADER_STRAT });
export const themLoaderStop = () => ({ type: types.THEM_LOADER_STOP });

export const getAppConfig = () => {
  return (dispatch) => {
    getAppSettings().then(async res => {
      dispatch(saveAppConfig(res))
      await saveData(JSON.stringify(res), appSettings)
    }).catch(async err => {
      console.log(err)
    })
  }
}

export const saveAppConfig = (payload) => ({ type: types.SAVE_APP_CONFIG, payload });