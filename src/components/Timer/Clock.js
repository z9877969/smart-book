import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getTimeTrainingAfterEndObj } from './timerHelpers';
import css from './Timer.module.css';

const zeroPad = value => (value < 10 ? `0${value}` : value);

const Clock = ({ finished }) => {
  const timeEndState = useSelector(state => state.training.timeEnd);
  const [date, setDate] = useState(getTimeTrainingAfterEndObj(timeEndState));

  useEffect(() => {
    if (!finished) {
      setInterval(() => {
        setDate(getTimeTrainingAfterEndObj(timeEndState));
      }, 1000);
    }
  }, []);

  return (
    timeEndState && (
      <div className={css.container}>
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
    )
  );
};

Clock.propTypes = {
  finished: PropTypes.bool,
};

Clock.defaultProps = {
  finished: false,
};

export default Clock;
