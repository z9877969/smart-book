import { ActionType } from './timerReducer';

export const actionTimerStop = () => ({
  type: ActionType.TIMER_STOP,
  payload: true,
});

export const actionTimerRun = () => ({
  type: ActionType.TIMER_RUN,
  payload: false,
});
