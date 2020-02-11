import { combineReducers } from 'redux';
import { ActionType } from './loginActions';

export const user = (state = null, { type, payload }) => {
  switch (type) {
    case ActionType.LOGIN_SUCCESS:
    case ActionType.REFRESH_USER_SUCCESS:
      return payload.data.user.userData;
    case ActionType.REGISTRATION_SUCCESS:
      return payload.response.data.user.userData;
    case ActionType.LOGOUT:
      return null;
    default:
      return state;
  }
};

const authenticated = (state = false, { type }) => {
  switch (type) {
    case ActionType.LOGIN_SUCCESS:
    case ActionType.REFRESH_USER_SUCCESS:
    case ActionType.REGISTRATION_SUCCESS:
      return true;
    case ActionType.LOGOUT:
      return false;
    case 'USER_HAVE_TRAINING':
      return { ...state, haveTraining: true };
    default:
      return state;
  }
};

const token = (state = null, { type, payload }) => {
  switch (type) {
    case ActionType.LOGIN_SUCCESS:
      return payload.data.user.token;
    case ActionType.REGISTRATION_SUCCESS:
      return payload.response.data.user.token;
    case ActionType.LOGOUT:
      return null;
    case ActionType.SET_GOOGLE_TOKEN:
      return payload.googleToken;
    default:
      return state;
  }
};

const error = (state = null, { type, payload }) => {
  switch (type) {
    case ActionType.LOGIN_ERROR:
    case ActionType.REFRESH_USER_ERROR:
    case ActionType.LOGOUT_ERROR:
      return payload;
    case ActionType.REGISTRATION_ERROR:
      return payload.error;
    default:
      return state;
  }
};

export const sessionReducer = combineReducers({
  authenticated,
  token,
  error,
});
