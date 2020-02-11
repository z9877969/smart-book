import { summaryModalActionTypes } from './summaryModalReducer';

export const openModalSummary = () => ({
  type: summaryModalActionTypes.OPEN_MODAL_SUMMARY,
});

export const closeModalSummary = () => ({
  type: summaryModalActionTypes.CLOSE_MODAL_SUMMARY,
});
