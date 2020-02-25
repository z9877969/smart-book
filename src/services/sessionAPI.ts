import axios from 'axios';
import * as apiEndpoint from '../api/apiEndpoint';
import { LoginCredentials } from '../redux/loginTS/types'
import { RegistrationCredentials } from '../redux/registration/types'

import {
    loginRequest,
    loginSuccess,
    loginError,
    logOutSuccess,
    logOutError,
    refreshUserRequest,
    refreshUserSuccess,
    refreshUserError,
} from '../redux/loginTS/loginActions';

import {
    registrationRequest,
    registrationSuccess,
    registrationError,
} from '../redux/registration/registrationActions'

import { getUserToken } from '../redux/selectors/sessionSelectors';


export const setAuthToken = (token: string) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthToken = () => {
    axios.defaults.headers.common.Authorization = null;
};




export const registration = (userValue: RegistrationCredentials) => (dispatch: any) => {
    dispatch(registrationRequest());

    axios
        .post(apiEndpoint.registration, userValue)
        .then(response => {
            return dispatch(registrationSuccess(response));
        })
        .catch(error => dispatch(registrationError(error)));
};


export const login = (credentials: LoginCredentials) => (dispatch: any) => {
    dispatch(loginRequest());
    axios
        .post('/auth/login', credentials)
        .then((response: object) => {
            dispatch(loginSuccess(response));
        })
        .catch((err: object) => {
            dispatch(loginError(err));
        });
};


export const logOut = (token: string) => (dispatch: any) => {
    setAuthToken(token);
    axios
        .post(`${process.env.REACT_APP_BASE_API_URL}/auth/logout`)
        .then(() => {
            dispatch(logOutSuccess());
            clearAuthToken();
        })
        .catch((err: object) => {
            dispatch(logOutError(err));
        });
};

export const refreshUser = () => (dispatch: any, getState: any) => {
    const token = getUserToken(getState());
    if (!token) {
        return;
    }
    setAuthToken(token);
    dispatch(refreshUserRequest());

    axios
        .get('/user/me')
        .then(response => {
            dispatch(refreshUserSuccess(response));
        })
        .catch(err => {
            dispatch(refreshUserError(err));
        });
};