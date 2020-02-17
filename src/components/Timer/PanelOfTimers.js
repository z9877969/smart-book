import React from 'react';
import { useSelector } from 'react-redux';
import Timer from './Timer';
import { endOfYearIso } from './timerHelpers';
import css from './PanelOfTimers.module.css';

const PanelOfTimers = () => {
  const timeEndState = useSelector(state => state.training.timeEnd);

  return (
    <div className={css.panel}>
      <Timer title="До закінчення року залишилось" finishDate={endOfYearIso} />
      {timeEndState && (
        <Timer
          title="До досягнення мети залишилось"
          finishDate={timeEndState}
        />
      )}
    </div>
  );
};

export default PanelOfTimers;
