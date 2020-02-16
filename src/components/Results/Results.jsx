/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import { postResultsOnServer } from '../../redux/results/resultsActions';
import { getTrainingFromServer } from '../../services/API';
import {
  formatDate,
  formatTime,
  getLastTenReadPagesSortedByDateDesc,
} from './resHelpers';
import styles from './Results.module.css';

const Results = ({ training }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
  const [selectedPages, setSelectedPages] = useState('');
  const [trainingId, setTrainingId] = useState(training.trainingId);
  const [pagesReadResult, setPagesReadResult] = useState([]);

  const token = useSelector(state => state.session.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (training) {
      const {
        pagesReadResult: initPageReadResult,
        trainingId: initTrainingId,
      } = training;

      setTrainingId(initTrainingId);

      if (initPageReadResult.length !== pagesReadResult.length) {
        const lastTenPagesReadResult = getLastTenReadPagesSortedByDateDesc(
          initPageReadResult,
        );

        setPagesReadResult(lastTenPagesReadResult);
      }
    }
  }, [training]);

  const handleDateInput = date => {
    setSelectedDate(date);
  };

  const handlePagesInput = ({ target }) => {
    setSelectedPages(target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!trainingId) {
      console.log('Please, create workout!!!');
      return;
    }

    if (selectedPages.length === 0 || Number(selectedPages) <= 0) {
      console.log('Please, insert pages!!!');
    } else {
      // set pages result
      const addedResult = {
        date: new Date(selectedDate).toISOString(),
        count: Number(selectedPages),
      };

      await dispatch(postResultsOnServer(token, trainingId, addedResult));
      dispatch(getTrainingFromServer(token));

      // clear inputs
      setSelectedDate(new Date().toISOString());
      setSelectedPages('');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inner_container}>
        <h3 className={styles.title}>РЕЗУЛЬТАТИ</h3>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <p className={styles.input_title}>Дата</p>
              <DateTimePicker
                value={selectedDate}
                onChange={handleDateInput}
                showTodayButton
                ampm={false}
                disableFuture
                format="dd/MM/yyyy"
                InputProps={{
                  className: styles.picker,
                }}
              />
            </MuiPickersUtilsProvider>
          </label>
          <label className={styles.label}>
            <p className={styles.input_title}>Кількість сторінок</p>
            <input
              type="number"
              name="pages"
              className={styles.input}
              value={selectedPages}
              onChange={handlePagesInput}
            />
          </label>
          <input
            type="submit"
            className={styles.submit}
            value="Додати результат"
          />
        </form>

        <div className={styles.statistic}>
          <h3 className={styles.title_statistic}>
            <span className={styles.title_statisticText}>Статистика</span>
          </h3>
          <table className={styles.table}>
            <tbody>
              {pagesReadResult &&
                pagesReadResult.map(res => (
                  <tr className={styles.table_row} key={res._id}>
                    <td className={styles.table_date}>
                      {formatDate(res.date)}
                    </td>
                    <td className={styles.table_time}>
                      {formatTime(res.date)}
                    </td>
                    <td className={styles.table_pages}>
                      <p className={styles.table_pages_value}>{res.count}</p>
                      <p className={styles.table_pages_text}>стор.</p>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

Results.propTypes = {
  training: PropTypes.shape().isRequired,
};

export default Results;

// export const getItems = () => {

//   return async dispatch => {
//     function onSuccess(success) {
//       dispatch({ type: UPDATE_AJAX_PARAMS, payload:  success.data});
//     }

//     function onError(error) {
//       dispatch({ type: UPDATE_AJAX_PARAMS, error });
//     }

//     try {
//       const success = await axios.post( 'http://....');
//       return onSuccess(success);
//     } catch (error) {
//       return onError(error);
//     }

//   }
