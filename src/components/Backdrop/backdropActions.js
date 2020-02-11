import { backdropActionTypes } from './backdropReducer';

export const openModal = () => ({
  type: backdropActionTypes.OPEN_MODAL,
});

export const closeModal = () => ({
  type: backdropActionTypes.CLOSE_MODAL,
});
