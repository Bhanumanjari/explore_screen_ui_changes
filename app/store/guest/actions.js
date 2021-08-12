import {saveData} from '../../Config/asyncStorage';
import {guestData} from '../../Utils/storageKeys';
import {setProfile} from '../login';
import {SET_GUEST_PROFILE} from './actionTypes';

export const setGuestProfile = (data) => {
  return async (dispatch) => {
    // await saveData(JSON.stringify(data),guestData);
    dispatch(setProfile({...data, isGuest: true}));
  };
};

export const setGuest = (payload) => {
  return {
    type: SET_GUEST_PROFILE,
    payload,
  };
};
