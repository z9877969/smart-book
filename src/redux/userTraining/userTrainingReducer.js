import { ActionType } from './userTrainingActions';

export const userTrainingReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionType.ADD_USER_TRAINING:
      return action.payload;
    default:
      return state;
  }
};

export default userTrainingReducer;
