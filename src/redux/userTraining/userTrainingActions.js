export const ActionType = {
  ADD_USER_TRAINING: 'ADD_USER_TRAINING',
};

export const addUserTraining = training => ({
  type: ActionType.ADD_USER_TRAINING,
  payload: training,
});
