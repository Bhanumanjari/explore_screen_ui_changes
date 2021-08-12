import { saveData } from '../../Config/asyncStorage';
import { guestData } from '../../Utils/storageKeys';
import * as types from './actionTypes';

const initialState = {
  guestProfile: {},
};
const guest = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_GUEST_PROFILE:
      return {
        ...state,
        guestProfile:action.payload
      };
    default:
      return state;
  }
};

export default guest;
