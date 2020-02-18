import { combineReducers } from 'redux';

export const modalActionTypes = {
  OPEN_MODAL_SUMMARY: 'OPEN_MODAL_SUMMARY',
  CLOSE_MODAL_SUMMARY: 'CLOSE_MODAL_SUMMARY',
  OPEN_CONGRATS_SUMMARY: 'OPEN_CONGRATS_SUMMARY',
  CLOSE_CONGRATS_SUMMARY: 'CLOSE_CONGRATS_SUMMARY',
};

export const summaryModalReducer = (state = false, { type }) => {
  switch (type) {
    case modalActionTypes.OPEN_MODAL_SUMMARY:
      return true;

    case modalActionTypes.CLOSE_MODAL_SUMMARY:
      return false;

    default:
      return state;
  }
};

// modal that display when user finished read books
export const congratsModalReducer = (state = false, { type }) => {
  switch (type) {
    case modalActionTypes.OPEN_CONGRATS_SUMMARY:
      return true;

    case modalActionTypes.CLOSE_CONGRATS_SUMMARY:
      return false;

    default:
      return state;
  }
};

export const modalReducers = combineReducers({
  summaryModalReducer,
  congratsModalReducer,
});
