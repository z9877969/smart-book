import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getTimeTrainingAfterEndObj } from './timerHelpers';
import css from './Timer.module.css';

const zeroPad = value => (value < 10 ? `0${value}` : value);

const Clock = ({ title, dateOfEndISO, finished }) => {
  const [date, setDate] = useState(getTimeTrainingAfterEndObj(dateOfEndISO));

  useEffect(() => {
    if (!finished) {
      setInterval(() => {
        setDate(getTimeTrainingAfterEndObj(dateOfEndISO));
      }, 1000);
    }
  }, []);

  return (
    <div className={css.container}>
      <h2 className={css.title}>{title}</h2>
      <div className={css.timerPanel}>
        <span>-</span>
        <p>
          <span className={css.value}> {date.day}</span>
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
  );
};

Clock.propTypes = {
  title: PropTypes.string.isRequired,
  dateOfEndISO: PropTypes.func.isRequired,
  finished: PropTypes.bool,
};

Clock.defaultProps = {
  finished: false,
};

export default Clock;
