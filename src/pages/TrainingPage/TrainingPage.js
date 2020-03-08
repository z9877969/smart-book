import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
// import { tr } from 'date-fns/locale';
import PanelOfTimers from '../../components/Timer/PanelOfTimers';
import Results from '../../components/Results/Results';
import ModalCongrats from '../../components/ModalCongrats/ModalCongrats';
import Workout from '../../components/Workout/Workout';
import Goal from '../../components/Goal/Goal';
import Chart from '../../components/Chart/Chart.tsx';
import WorkoutInfo from '../../components/WorkoutInfo/WorkoutInfo';
import CreateTraningGoal from '../../components/CreateTraningGoal/CreateTraningGoal';
import {
  getTrainingFromServer,
  finishTraining,
  refreshUser,
} from '../../services/API';
import {
  closeCongratsModal,
  openCongratsModal,
} from '../../redux/modals/modalsActions';
import { booksOperation, bookUpdate } from '../../redux/books/BooksOperations';
import {
  actionTimerStop,
  actionTimerRun,
  actionIsTimerTimeEnded,
} from '../../redux/timer/timerAction';
import { addLocation } from '../../redux/lastLocation/lastLocationAction';

import {
  getPagesResult,
  getTrainingBookIdsArr,
  booksFilterByStatus,
} from '../../components/TrainingBooksTable/helpersTrainingBooks';

import style from './TrainingPage.module.css';

const TrainingPage = props => {
  const dispatch = useDispatch();

  // state
  const [goal, setGoal] = useState({
    startTime: moment(),
    finishTime: moment().add(1, 'days'),
    countBooks: 0,
  });

  // selectors
  const token = useSelector(state => state.session.token);
  const training = useSelector(state => state.training);
  const modalCongratsOpen = useSelector(
    state => state.isModalsOpen.congratsModalReducer,
  );
  const books = useSelector(state => state.books);
  const pagesReadResultArr = useSelector(
    state => state.training.pagesReadResult,
  );

  // helpers
  const credentials = {
    isDone: true,
  };
  const pagesReadResult = getPagesResult(pagesReadResultArr);

  // handlers
  const handleChangeToGoal = field => {
    setGoal({
      ...goal,
      ...field,
    });
  };

  const handleCloseCongrats = async () => {
    await dispatch(finishTraining(training.trainingId, token, credentials));
    dispatch(closeCongratsModal());
    await dispatch(refreshUser(token));
    dispatch(actionTimerRun());
    dispatch(actionIsTimerTimeEnded(false));
  };

  // effects
  useEffect(() => {
    if (!books || !books.length) {
      dispatch(booksOperation(token)); // update books&training
    } else if (!training.trainingId) {
      dispatch(getTrainingFromServer(token)); // update only training when books are available
    }
  }, []);

  const { location } = props;
  useEffect(() => {
    dispatch(addLocation(location.pathname));
  }, [location.pathname]);

  // open modalCongrats if all pages was read & toggle reading book to read
  const booksTrainingIdsArr = training.trainingId
    ? getTrainingBookIdsArr(training.books)
    : [];
  const booksReading = booksFilterByStatus('reading', booksTrainingIdsArr, [
    ...books,
  ]);

  useEffect(() => {
    if (pagesReadResult && pagesReadResult >= training.allPagesCount) {
      [...booksReading].forEach(book => {
        /* eslint no-param-reassign: "error" */
        book.status = 'readed';
        dispatch(bookUpdate(token, book));
      });
      dispatch(openCongratsModal());
      dispatch(actionTimerStop());
    }
  }, [training.pagesReadResult]);

  return (
    <div className={style.container}>
      {modalCongratsOpen && <ModalCongrats handleClick={handleCloseCongrats} />}
      {training && training.trainingId ? (
        <div className={style.wrapper}>
          <PanelOfTimers />
          <Goal />
          <WorkoutInfo />
          <Results training={training} />
          <Chart training={training} />
        </div>
      ) : (
        <div className={style.someContainer}>
          <CreateTraningGoal
            style={{
              order: 2,
            }}
            {...goal}
          />
          <Workout handleChangeToGoal={handleChangeToGoal} />
          {training.trainingId && <Chart training={training} />}
        </div>
      )}
    </div>
  );
};

TrainingPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
};

TrainingPage.defaultProps = {
  location: '/training',
};

export default withRouter(TrainingPage);
