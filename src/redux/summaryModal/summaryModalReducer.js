export const summaryModalActionTypes = {
  OPEN_MODAL_SUMMARY: 'OPEN_MODAL_SUMMARY',
  CLOSE_MODAL_SUMMARY: 'CLOSE_MODAL_SUMMARY',
};

export const summaryModalReducer = (state = false, { type }) => {
  switch (type) {
    case summaryModalActionTypes.OPEN_MODAL_SUMMARY:
      return true;

    case summaryModalActionTypes.CLOSE_MODAL_SUMMARY:
      return false;

    default:
      return state;
  }
};
