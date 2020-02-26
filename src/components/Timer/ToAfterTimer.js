import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getTimeTrainingAfterEndObj } from './timerHelpers';
import css from './Timer.module.css';

const zeroPad = value => {
  if (value < 0) {
    const dateValue = -value;
    return dateValue < 10 ? `0${dateValue}` : dateValue;
  }
  if (value >= 0) return value < 10 ? `0${value}` : value;
  return true;
};

const ToAfterTimer = ({ timerStop, isTimerTimeEnded, title }) => {
  // const timeEndState = useSelector(state => state.training.timeEnd);
  const timeEndState = '2020-02-26T19:30:11';
  const [date, setDate] = useState(getTimeTrainingAfterEndObj(timeEndState));

  useEffect(() => {
    if (!timerStop) {
      setInterval(() => {
        setDate(getTimeTrainingAfterEndObj(timeEndState, isTimerTimeEnded));
      }, 1000);
    }
  }, []);

  return (
    timeEndState && (
      <div className={css.container}>
        <h2 className={css.title}>{title}</h2>
        <div className={css.timerPanel}>
          {isTimerTimeEnded && <span>-</span>}
          <p>
            <span className={css.value}>
              {' '}
              {isTimerTimeEnded ? date.day : -date.day}
            </span>
            <span className={css.units}>дн</span>
          </p>
          <span>:</span>
          <p>
            <span className={css.value}>{zeroPad(date.hour)}</span>
            <span className={css.units}>год</span>
          </p>
          <span>:</span>
          <p>
            <span className={css.value}>{zeroPad(date.min)}</span>
            <span className={css.units}>хв</span>
          </p>
          <span>:</span>
          <p>
            <span className={css.value}>{zeroPad(date.sec)}</span>
            <span className={css.units}>сек</span>
          </p>
        </div>
      </div>
    )
  );
};

ToAfterTimer.propTypes = {
  timerStop: PropTypes.bool,
  isTimerTimeEnded: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

ToAfterTimer.defaultProps = {
  timerStop: false,
  isTimerTimeEnded: false,
};

export default ToAfterTimer;
