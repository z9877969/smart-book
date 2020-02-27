export const ActionType = {
  TIMER_STOP: 'TIMER_STOP',
  TIMER_RUN: 'TIMER_RUN',
};

export const timerReducer = (state = false, { type, payload }) => {
  switch (type) {
    case ActionType.TIMER_STOP:
    case ActionType.TIMER_RUN:
      return payload;

    // return payload;
    default:
      return state;
  }
};
