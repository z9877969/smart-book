export const ActionType = {
  TRAINING_REQUEST: 'TRAINING_REQUEST',
  GET_TRAINING: 'GET_TRAINING',
  UPDATE_TRAINING: 'UPDATE_TRAINING',
  TRAINING_ERROR: 'TRAINING_ERROR',
};

export const trainingRequest = () => ({
  type: ActionType.TRAINING_REQUEST,
});

export const getTraining = training => ({
  type: ActionType.GET_TRAINING,
  payload: training,
});

export const trainingUpdate = trainingData => ({
  type: ActionType.UPDATE_TRAINING,
  payload: trainingData,
});

export const trainingError = error => ({
  type: ActionType.TRAINING_ERROR,
  payload: error,
});
