/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
// import PropTypes from 'prop-types';
import moment from 'moment';
import styles from './Goal.module.css';

const CreateTraningGoal = ({ startTime, finishTime, countBooks }) => {
  const training = useSelector(state => state.training);
  const start = moment(startTime).dayOfYear();
  const finish = moment(finishTime).dayOfYear();
  const leftDays = finish - start;
  // let isThisStatPage = !!(training != null && training.unreadCount);
  const isThisStatPage = false;
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
              {countBooks && countBooks}
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

export default CreateTraningGoal;
