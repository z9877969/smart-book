import { combineReducers } from 'redux';
import { ActionType } from './componentControllerActions';

// const modalLogoutOpenReducer = (state, action) => {};

// const summeryModalOpenReducer = (state, action) => {};

const modalCongratsOpenReducer = (state = false, action) => {
  switch (action.type) {
    case ActionType.OPEN_MODAL_CONGRATS:
      return action.payload === 0;
    default:
      return state;
  }
};

export default combineReducers({
  // modalLogoutOpen: modalLogoutOpenReducer,
  // summeryModalOpen: summeryModalOpenReducer,
  modalCongratsOpen: modalCongratsOpenReducer,
});
