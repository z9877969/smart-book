import { modalActionTypes } from './modalsReducer';

export const openModalSummary = () => ({
  type: modalActionTypes.OPEN_MODAL_SUMMARY,
});

export const closeModalSummary = () => ({
  type: modalActionTypes.CLOSE_MODAL_SUMMARY,
});

export const openCongratsModal = () => ({
  type: modalActionTypes.OPEN_CONGRATS_SUMMARY,
});

export const closeCongratsModal = () => ({
  type: modalActionTypes.CLOSE_CONGRATS_SUMMARY,
});
