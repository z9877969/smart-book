import React from 'react';
import { useSelector } from 'react-redux';
import Timer from './Timer';
import ToAfterTimer from './ToAfterTimer';
import { endOfYearIso } from './timerHelpers';
import css from './PanelOfTimers.module.css';

const PanelOfTimers = () => {
  // selectors
  const isTimerStop = useSelector(state => state.timer.isTimerStop);
  const timeEndState = useSelector(state => state.training.timeEnd);

  return (
    <div className={css.container}>
      <div className={css.panel}>
        <Timer
          title="До закінчення року залишилось"
          finishDate={endOfYearIso}
        />
        {timeEndState && (
          <div className={css.container}>
            <ToAfterTimer
              title="До досягнення мети залишилось"
              timerTimeFinish={timeEndState}
              isTimerStop={isTimerStop}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PanelOfTimers;
