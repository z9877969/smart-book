import { ActionType } from './timerReducer';

export const actionTimerStop = () => ({
  type: ActionType.TIMER_STOP,
  payload: true,
});

export const actionTimerRun = () => ({
  type: ActionType.TIMER_RUN,
  payload: false,
});

export const actionIsTimerTimeEnded = flag => ({
  type: ActionType.IS_TIMER_TIME_ENDED,
  payload: flag,
});
