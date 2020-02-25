import {
    LoginActionTypes,
    ActionType
} from './types';

// export const ActionType = {
//     LOGIN_REQUEST: 'LOGIN_REQUEST',
//     // LOGIN_SUCCESS: 'LOGIN_SUCCESS',
//     LOGIN_ERROR: 'LOGIN_ERROR',
//     REFRESH_USER_REQUEST: 'REFRESH_USER_REQUEST',
//     REFRESH_USER_SUCCESS: 'REFRESH_USER_SUCCESS',
//     REFRESH_USER_ERROR: 'REFRESH_USER_ERROR',
//     LOGOUT: 'LOGOUT',
//     LOGOUT_ERROR: 'LOGOUT_ERROR',
// REGISTRATION_REQUEST: 'REGISTRATION_REQUEST',
// REGISTRATION_SUCCESS: 'REGISTRATION_SUCCESS',
// REGISTRATION_ERROR: 'REGISTRATION_ERROR',
//     SET_GOOGLE_TOKEN: 'SET_GOOGLE_TOKEN',
// };


export const loginSuccess = (response: object): LoginActionTypes => {
    return {
        type: ActionType.LOGIN_SUCCESS,
        payload: response,
    }
};

export const loginRequest = (): LoginActionTypes => {
    return {
        type: ActionType.LOGIN_REQUEST
    }
};

export const loginError = (err: object): LoginActionTypes => {
    return {
        type: ActionType.LOGIN_ERROR,
        payload: err,
    }
};

export const logOutSuccess = (): LoginActionTypes => {
    return {
        type: ActionType.LOGOUT
    }
};

export const logOutError = (err: object): LoginActionTypes => {
    return {
        type: ActionType.LOGOUT_ERROR,
        payload: err,
    }
};

export const refreshUserRequest = (): LoginActionTypes => ({
    type: ActionType.REFRESH_USER_REQUEST,
});

export const refreshUserSuccess = (response: object): LoginActionTypes => ({
    type: ActionType.REFRESH_USER_SUCCESS,
    payload: response,
});

export const refreshUserError = (error: object): LoginActionTypes => ({
    type: ActionType.REFRESH_USER_ERROR,
    payload: error,
});