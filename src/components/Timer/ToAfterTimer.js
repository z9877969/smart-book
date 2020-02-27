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

const ToAfterTimer = ({ timerTimeFinish, timerStop, title }) => {
  const [date, setDate] = useState(getTimeTrainingAfterEndObj(timerTimeFinish));
  const isTimerTimeEnded = Date.parse(timerTimeFinish) - Date.now() < 0;

  useEffect(() => {
    // console.log('!timerStop_out :', !timerStop);
    if (!timerStop) {
      // console.log('!timerStop_in :', !timerStop);
      setInterval(() => {
        setDate(getTimeTrainingAfterEndObj(timerTimeFinish, isTimerTimeEnded));
      }, 1000);
    }
  }, [timerStop]);

  return (
    timerTimeFinish && (
      <div className={css.container}>
        <h2 className={css.title}>{title}</h2>
        <div className={css.timerPanel}>
          {isTimerTimeEnded && <span>-</span>}
          <p>
            <span className={css.value}>{date.day}</span>
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
  timerStop: PropTypes.bool.isRequired,
  timerTimeFinish: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

ToAfterTimer.defaultProps = {
  // timerTimeFinish: '2020-02-26T22:06:00',
  // timerStop: false,
  // isTimerTimeEnded: false,
};

export default ToAfterTimer;
