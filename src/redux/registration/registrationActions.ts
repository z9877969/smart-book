import { ActionType, RegistrationActionTypes } from './types';

export const registrationRequest = (): RegistrationActionTypes => {
  return {
    type: ActionType.REGISTRATION_REQUEST,
  }
};

export const registrationSuccess = (response: object): RegistrationActionTypes => {
  return {
    type: ActionType.REGISTRATION_SUCCESS,
    payload: {
      response,
    },
  }
};

export const registrationError = (error: object): RegistrationActionTypes => {
  return {
    type: ActionType.REGISTRATION_ERROR,
    payload: {
      error,
    },
  }
};
