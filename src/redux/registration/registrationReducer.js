import { combineReducers } from 'redux';
import { ActionType } from '../login/loginActions';

const requestRegistration = (state = false, { type }) => {
  switch (type) {
    case ActionType.REGISTRATION_REQUEST:
      return true;
    default:
      return state;
  }
};

const successRegistration = (state = null, { type, payload }) => {
  switch (type) {
    case ActionType.REGISTRATION_SUCCESS:
      return payload.response;
    default:
      return state;
  }
};

const errorRegistration = (state = null, { type, payload }) => {
  switch (type) {
    case ActionType.REGISTRATION_ERROR:
      return payload.error;
    default:
      return state;
  }
};

export default combineReducers({
  user: successRegistration,
  authenticated: requestRegistration,
  error: errorRegistration,
});
