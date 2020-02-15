/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import { postResultsOnServer } from '../../redux/results/resultsActions';
import { getTrainingFromServer } from '../../services/API';

import styles from './Results.module.css';

function formatDate(date) {
  let dd = new Date(date).getDate();
  if (dd < 10) dd = `0${dd}`;
  let mm = new Date(date).getMonth() + 1;
  if (mm < 10) mm = `0${mm}`;
  const yyyy = new Date(date).getFullYear();
  return `${dd}.${mm}.${yyyy}`;
}
function formatTime(date) {
  let hh = new Date(date).getHours();
  if (hh < 10) hh = `0${hh}`;
  let mm = new Date(date).getMinutes();
  if (mm < 10) mm = `0${mm}`;
  let ss = new Date(date).getSeconds();
  if (ss < 10) ss = `0${ss}`;
  return `${hh}:${mm}:${ss}`;
}

class Results extends PureComponent {
  state = {
    selectedDate: new Date().toISOString(),
    selectedPages: '',
    trainingId: '',
    pagesReadResult: '',
  };

  componentDidMount() {
    console.log('CDM. props: ', this.props);
    console.log('CDM. props.training: ', this.props.training);
    const { token, training } = this.props;
    const { pagesReadResult: componentPagesReadResult } = this.state;

    const {
      pagesReadResult: initPageReadResult,
      trainingId: initTrainingId,
    } = training;

    this.setState({ trainingId: initTrainingId });

    if (initPageReadResult.length !== componentPagesReadResult.length) {
      const lastTenPagesReadResult = [...initPageReadResult].sort((a, b) =>
        a.date > b.date ? -1 : 1,
      );
      lastTenPagesReadResult.length = 10;

      this.setState({ pagesReadResult: lastTenPagesReadResult });
    }
  }

  componentDidUpdate(prevProps) {
    const { token, training, getTrainingFromServer } = this.props;

    console.log('training: ', training);
    console.log('prevState.training: ', prevProps.training);

    // if (training !== prevProps.training) {
    //   getTrainingFromServer(token);
    // }
  }

  handleDateInput = date => {
    console.log(date.toISOString());
    this.setState({ selectedDate: date.toISOString() });
  };

  handlePagesInput = ({ target }) => {
    this.setState({ selectedPages: target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { token, postResultsOnServer } = this.props;
    const { trainingId, selectedPages, selectedDate } = this.state;
    if (!trainingId) {
      console.log('Please, create workout!!!');
    } else if (selectedPages.length === 0 || Number(selectedPages) <= 0) {
      console.log('Please, insert pages!!!');
    } else {
      const addedResult = {
        date: new Date(selectedDate).toISOString(),
        count: Number(selectedPages),
      };
      console.log(addedResult);
      postResultsOnServer(token, trainingId, addedResult);
    }
  };

  render() {
    const { selectedDate, selectedPages, pagesReadResult } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.inner_container}>
          <h3 className={styles.title}>РЕЗУЛЬТАТИ</h3>

          <form className={styles.form} onSubmit={this.handleSubmit}>
            <label className={styles.label}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <p className={styles.input_title}>Дата</p>
                <DateTimePicker
                  value={selectedDate}
                  onChange={this.handleDateInput}
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
                onChange={this.handlePagesInput}
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
  }
}

const mapStateToProps = state => ({
  token: state.session.token,
  training: state.training,
});

const mapDispatchToProps = dispatch => ({
  postResultsOnServer: (token, id, result) =>
    dispatch(postResultsOnServer(token, id, result)),
  getTrainingFromServer: token => dispatch(getTrainingFromServer(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Results);
