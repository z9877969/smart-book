import React from 'react';
import Countdown, { zeroPad } from 'react-countdown-now';
import PropTypes from 'prop-types';
import Clock from './Clock';
import { changeDateFormatToMs } from './timerHelpers';
import css from './Timer.module.css';

const Timer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return <Clock />;
  }
  return (
    <div>
      <div className={css.timerPanel}>
        <p>
          <span className={css.value}>{days}</span>
          <span className={css.units}>дн</span>
        </p>
        <span>:</span>
        <p>
          <span className={css.value}>{zeroPad(hours)}</span>
          <span className={css.units}>год</span>
        </p>
        <span>:</span>
        <p>
          <span className={css.value}>{zeroPad(minutes)}</span>
          <span className={css.units}>хв</span>
        </p>
        <span>:</span>
        <p>
          <span className={css.value}>{zeroPad(seconds)}</span>
          <span className={css.units}>сек</span>
        </p>
      </div>
    </div>
  );
};

const Counter = ({ finishDate, title }) => {
  return (
    <div className={css.container}>
      <h2 className={css.title}>{title}</h2>
      <Countdown date={changeDateFormatToMs(finishDate)} renderer={Timer} />
    </div>
  );
};

Timer.propTypes = {
  days: PropTypes.string.isRequired,
  hours: PropTypes.string.isRequired,
  minutes: PropTypes.string.isRequired,
  seconds: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};

Counter.propTypes = {
  finishDate: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Counter;
