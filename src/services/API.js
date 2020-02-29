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

import {
  getTraining,
  trainingRequest,
  trainingPostRequest,
  trainingFinished,
  trainingError,
} from '../redux/training/trainingActions';

// import { getUserToken } from '../redux/selectors/sessionSelectors';

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
      dispatch(loginError(err.response));
    })
    .finally(dispatch(loginError()));
};

export const registration = userValue => dispatch => {
  dispatch(registrationRequest());

  axios
    .post(apiEndpoint.registration, userValue)
    .then(response => {
      return dispatch(registrationSuccess(response));
    })
    .catch(err => dispatch(registrationError(err.response)));
};

export const refreshUser = token => async dispatch => {
  // const token = getUserToken(getState());
  if (!token) {
    return;
  }
  setAuthToken(token);
  dispatch(refreshUserRequest());

  await axios
    .get('/user/me')
    .then(response => {
      dispatch(refreshUserSuccess(response));
    })
    .catch(err => {
      dispatch(refreshUserError(err.response));
    });
};

export const logOut = token => dispatch => {
  setAuthToken(token);
  axios
    .post(`${process.env.REACT_APP_BASE_API_URL}/auth/logout`)
    .then(() => {
      dispatch(logOutSuccess());
      clearAuthToken();
    })
    .catch(err => {
      dispatch(logOutError(err.response));
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
      dispatch(trainingError(err.response));
    });
};

export const updateTraining = (trainingData, token) => dispatch => {
  const data = Object.entries(trainingData)
    .filter(entryArr => entryArr[0] !== 'trainingId')
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

  dispatch(trainingRequest());

  axios
    .patch(
      `${process.env.REACT_APP_BASE_API_URL}/training/${trainingData.trainingId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .catch(err => {
      throw err;
    });
};

export const postTraining = (training, token) => dispatch => {
  dispatch(trainingPostRequest());
  axios
    .post(`${process.env.REACT_APP_BASE_API_URL}/training`, training, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      dispatch(getTraining(res.data.training));
      dispatch({
        type: 'USER_HAVE_TRAINING',
      });
    })
    .then(() => {
      dispatch(refreshUser(token));
    })
    .catch(err => {
      throw err;
    });
};

export const finishTraining = (
  trainingId,
  token,
  updateObj,
) => async dispatch => {
  await axios
    .patch(
      `${process.env.REACT_APP_BASE_API_URL}/training/${trainingId}`,
      updateObj,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then(res => {
      dispatch(trainingFinished(res.data.training));
    })
    .then(() => {
      dispatch(getTrainingFromServer(token));
    })
    .catch(err => {
      throw err;
    });
};
