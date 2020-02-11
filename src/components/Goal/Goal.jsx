import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './Goal.module.css';
import moment from 'moment';

const Goal = () => {
  const training = useSelector(state => state.training);
  const start = moment('2019-12-08T13:56:30+02:00').dayOfYear();
  const finish = moment('2019-12-15T13:56:30+02:00').dayOfYear();
  const leftDays = finish - start;
  // let isThisStatPage = !!(training != null && training.unreadCount);
  let isThisStatPage = !!(training && training.unreadCount);
  console.log(isThisStatPage);
  // console.log(leftDays);
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
          {training && training.unreadCount && (
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
// Goal.propTypes = {
//   isThisStatPage: PropTypes.bool,
// };

// Goal.defaultProps = {
//   isThisStatPage: true,
// };

export default Goal;
