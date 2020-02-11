import axios from 'axios';
import * as apiEndpoint from '../api/apiEndpoint';
import {
  loginRequest,
  loginSuccess,
  loginError,
  refreshUserRequest,
  refreshUserSuccess,
  refreshUserError,
  logOutSuccess,
  logOutError,
} from '../redux/login/loginActions';

import {
  registrationRequest,
  registrationSuccess,
  registrationError,
} from '../redux/registration/registrationActions';
// import { addUserTraining } from '../redux/userTraining/userTrainingActions';

import {
  getTraining,
  trainingRequest,
  trainingError,
} from '../redux/training/trainingActions';

import { getUserToken } from '../redux/selectors/sessionSelectors';

axios.defaults.baseURL = process.env.REACT_APP_BASE_API_URL;

export const setAuthToken = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthToken = () => {
  axios.defaults.headers.common.Authorization = null;
};

export const login = credentials => dispatch => {
  dispatch(loginRequest());

  axios
    .post('/auth/login', credentials)
    .then(response => {
      dispatch(loginSuccess(response));
    })
    .catch(err => {
      dispatch(loginError(err));
    });
};

export const registration = userValue => dispatch => {
  dispatch(registrationRequest());

  axios
    .post(apiEndpoint.registration, userValue)
    .then(response => {
      return dispatch(registrationSuccess(response));
    })
    .catch(error => dispatch(registrationError(error)));
};

export const refreshUser = () => (dispatch, getState) => {
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

export const logOut = token => dispatch => {
  axios
    .post(`${process.env.REACT_APP_BASE_API_URL}/auth/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      dispatch(logOutSuccess());
      clearAuthToken();
    })
    .catch(err => {
      dispatch(logOutError(err));
    });
};

export const getTrainingFromServer = token => dispatch => {
  dispatch(trainingRequest());

  axios
    .get(`${process.env.REACT_APP_BASE_API_URL}/training`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => res.data)
    .then(data => data.training)
    .then(training => {
      dispatch(getTraining(training));
    })
    .catch(err => {
      dispatch(trainingError(err));
    });
};

export const postTraining = (training, token) => dispatch => {
  axios
    .post(`${process.env.REACT_APP_BASE_API_URL}/training`, training, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      dispatch(getTraining(res.data.training));
      dispatch({ type: 'USER_HAVE_TRAINING' });
    })
    .catch(err => {
      console.log(err);
    });
};
