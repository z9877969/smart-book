import React from 'react';
import PropTypes from 'prop-types';
import Timer from './Timer';
import Clock from './Clock';
import { endOfYearIso, changeDateFormatToMs } from './timerHelpers';
import css from './PanelOfTimers.module.css';

const PanelOfTimers = ({ dateOfEndISO, trainingFinished }) => {
  return (
    <div className={css.panel}>
      <Timer title="До закінчення року залишилось" finishDate={endOfYearIso} />
      {changeDateFormatToMs(dateOfEndISO) >= Date.now() ? (
        <Timer
          title="До досягнення мети залишилось"
          finishDate={dateOfEndISO}
        />
      ) : (
        <Clock
          title="До досягнення мети залишилось"
          dateOfEndISO={dateOfEndISO}
          finished={trainingFinished}
        />
      )}
    </div>
  );
};

PanelOfTimers.propTypes = {
  dateOfEndISO: PropTypes.string,
  trainingFinished: PropTypes.bool,
};

PanelOfTimers.defaultProps = {
  dateOfEndISO: '2020-02-13T17:05:00',
  trainingFinished: false, // for congratulation modal
};

export default PanelOfTimers;
