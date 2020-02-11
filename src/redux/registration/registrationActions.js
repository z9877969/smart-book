import { ActionType } from '../login/loginActions';

export const registrationRequest = () => ({
  type: ActionType.REGISTRATION_REQUEST,
});

export const registrationSuccess = response => ({
  type: ActionType.REGISTRATION_SUCCESS,
  payload: {
    response,
  },
});

export const registrationError = error => ({
  type: ActionType.REGISTRATION_ERROR,
  payload: {
    error,
  },
});
