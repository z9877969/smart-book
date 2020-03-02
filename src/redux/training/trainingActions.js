export const ActionType = {
  TRAINING_REQUEST: 'TRAINING_REQUEST',
  TRAINING_POST_REQUEST: 'TRAINING_POST_REQUEST',
  GET_TRAINING: 'GET_TRAINING',
  LOGOUT_TRAINING: 'LOGOUT_TRAINING',
  UPDATE_TRAINING: 'UPDATE_TRAINING',
  FINISHED_TRAINING: 'FINISHED_TRAINING',
  TRAINING_ERROR: 'TRAINING_ERROR',
};

export const trainingRequest = () => ({
  type: ActionType.TRAINING_REQUEST,
});

export const trainingPostRequest = () => ({
  type: ActionType.TRAINING_POST_REQUEST,
});

export const getTraining = training => ({
  type: ActionType.GET_TRAINING,
  payload: training,
});

export const logOutTraining = () => ({
  type: ActionType.LOGOUT_TRAINING,
});

export const trainingUpdate = trainingData => ({
  type: ActionType.UPDATE_TRAINING,
  payload: trainingData,
});

export const trainingFinished = trainingData => ({
  type: ActionType.FINISHED_TRAINING,
  payload: trainingData,
});

export const trainingError = error => ({
  type: ActionType.TRAINING_ERROR,
  payload: error,
});
