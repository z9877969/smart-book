export const ActionType = {
  OPEN_MODAL_CONGRATS: 'OPEN_MODAL_CONGRATS',
};

export const openModalCongrats = pages => ({
  type: ActionType.OPEN_MODAL_CONGRATS,
  payload: pages,
});
