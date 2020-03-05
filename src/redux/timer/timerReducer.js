import { combineReducers } from 'redux';

export const ActionType = {
  TIMER_STOP: 'TIMER_STOP',
  TIMER_RUN: 'TIMER_RUN',
  IS_TIMER_TIME_ENDED: 'IS_TIMER_TIME_ENDED',
};

export const isTimerStopReducer = (state = false, { type, payload }) => {
  switch (type) {
    case ActionType.TIMER_STOP:
    case ActionType.TIMER_RUN:
      return payload;
    default:
      return state;
  }
};

export const isTimerTimeEndedReducer = (state = false, { type, payload }) => {
  switch (type) {
    case ActionType.IS_TIMER_TIME_ENDED:
      return payload;
    default:
      return state;
  }
};

export const timerReducer = combineReducers({
  isTimerStop: isTimerStopReducer,
  isTimerTimeEnded: isTimerTimeEndedReducer,
});
