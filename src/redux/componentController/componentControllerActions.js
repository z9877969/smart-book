export const ActionType = {
  OPEN_MODAL_CONGRATS: 'OPEN_MODAL_CONGRATS',
  CLOSE_MODAL_CONGRATS: 'CLOSE_MODAL_CONGRATS',
};

export const openModalCongrats = pages => ({
  type: ActionType.OPEN_MODAL_CONGRATS,
  payload: pages,
});

export const closeModalCongrats = () => ({
  type: ActionType.CLOSE_MODAL_CONGRATS,
});
