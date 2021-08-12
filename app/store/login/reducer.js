import instance from '../../Config/apiConfig';
import * as types from './actionTypes'

const initialState = {
    data: {},
    loading: false,
    token:''
}
const login = (state = initialState, action) => {

    switch (action.type) {
        case types.API_LOADING_START:
            return {...state, loading: true};
        case types.SET_PROFILE:
            return {...state, data:action.payload};
        case types.API_LOADING_STOP:
            return {...state, loading: false, otp: action.payload};
        case types.UPDATE_ACCESS_TOKEN:
            // await saveData(payload,accessToken)
            // instance.defaults.headers.common['Authorization'] = action.payload;
            return {...state, token: action.payload};
        default:
            return state
    }
}

export default login
