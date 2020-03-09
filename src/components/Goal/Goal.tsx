import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import styles from './Goal.module.css';

//interfaces
interface State {
  training?: Training;
}
interface Training {
  timeStart?: number;
  timeEnd?: number;
  unreadCount?: number;
  booksCount?: number;
}

const Goal: React.FC = () => {
  const training: Training = useSelector<State>(
    state => state.training,
  ) as Training;
  const start = moment(training.timeStart).dayOfYear();
  // const finish = moment('2019-12-15T13:56:30+02:00').dayOfYear();
  const finish = moment(training.timeEnd).dayOfYear();
  const leftDays = finish - start;

  const isThisStatPage = !!(
    training &&
    training.unreadCount &&
    training.unreadCount > 0
  );

  return (
    <>
      <div
        className={
          isThisStatPage ? styles.goalContainerStat : styles.goalContainer
        }
      >
        <div
          className={
            isThisStatPage ? styles.goalTitleBoxStat : styles.goalTitleBox
          }
        >
          <p className={styles.goalTitle}>Моя мета прочитати</p>
        </div>
        <div
          className={
            isThisStatPage ? styles.goalBodyBoxStat : styles.goalBodyBox
          }
        >
          <div
            className={
              isThisStatPage ? styles.goalDigitsBoxStat : styles.goalDigitsBox
            }
          >
            <p
              className={
                isThisStatPage ? styles.goalDigitsStat : styles.goalDigits
              }
            >
              {training ? training.booksCount : '0'}
            </p>
            <p
              className={isThisStatPage ? styles.goalTextStat : styles.goalText}
            >
              Кількість книжок
            </p>
          </div>
          <div
            className={
              isThisStatPage ? styles.goalDigitsBoxStat : styles.goalDigitsBox
            }
          >
            <p
              className={
                isThisStatPage ? styles.goalDigitsStat : styles.goalDigits
              }
            >
              {leftDays}
            </p>
            <p
              className={isThisStatPage ? styles.goalTextStat : styles.goalText}
            >
              Кількість днів
            </p>
          </div>
          {training && training.unreadCount && training.unreadCount > 0 && (
            <div
              className={
                isThisStatPage ? styles.goalDigitsBoxStat : styles.goalDigitsBox
              }
            >
              <p
                className={
                  isThisStatPage
                    ? styles.goalDigitsStatLast
                    : styles.goalDigitsStat
                }
              >
                {training.unreadCount}
              </p>
              <p
                className={
                  isThisStatPage ? styles.goalTextStat : styles.goalText
                }
              >
                Залишилось <br /> книжок
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
Goal.propTypes = {
  isThisStatPage: PropTypes.bool,
};

Goal.defaultProps = {
  isThisStatPage: true,
};

export default Goal;
