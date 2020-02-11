export const backdropActionTypes = {
  OPEN_MODAL: 'OPEN_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL',
};

const backdropReducer = (state = false, { type }) => {
  switch (type) {
    case backdropActionTypes.OPEN_MODAL:
      return true;

    case backdropActionTypes.CLOSE_MODAL:
      return false;

    default:
      return state;
  }
};

export default backdropReducer;
