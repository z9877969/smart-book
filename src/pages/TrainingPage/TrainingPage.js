import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PanelOfTimers from '../../components/Timer/PanelOfTimers';
import Results from '../../components/Results/Results';
import ModalCongrats from '../../components/ModalCongrats/ModalCongrats';
import Workout from '../../components/Workout/Workout';
import Goal from '../../components/Goal/Goal';
import Chart from '../../components/Chart/Chart';
import WorkoutInfo from '../../components/WorkoutInfo/WorkoutInfo';
import CreateTraningGoal from '../../components/CreateTraningGoal/CreateTraningGoal';
import {
  getTrainingFromServer,
  finishTraining,
  refreshUser,
} from '../../services/API';
import { closeCongratsModal } from '../../redux/modals/modalsActions';
import { booksOperation } from '../../redux/books/BooksOperations';
import { addLocation } from '../../redux/lastLocation/lastLocationAction';
import style from './TrainingPage.module.css';

const TrainingPage = props => {
  const dispatch = useDispatch();

  // state
  const [goal, setGoal] = useState({
    startTime: new Date(),
    finishTime: new Date(),
    countBooks: 0,
  });

  // selectors
  const token = useSelector(state => state.session.token);
  const training = useSelector(state => state.training);
  const modalCongratsOpen = useSelector(
    state => state.isModalsOpen.congratsModalReducer,
  );
  const books = useSelector(state => state.books);

  // helpers
  const credentials = {
    isDone: true,
  };

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
  };

  // effects
  useEffect(() => {
    if (!books || !books.length) {
      dispatch(booksOperation(token)); // update books&training
    } else if (!training.trainingId) {
      dispatch(getTrainingFromServer(token)); // update only training as books are available
    }
  }, []);

  const { location } = props;
  useEffect(() => {
    dispatch(addLocation(location.pathname));
  }, [location.pathname]);

  return (
    <div className={style.container}>
      {' '}
      {modalCongratsOpen && (
        <ModalCongrats handleClick={handleCloseCongrats} />
      )}{' '}
      {training && training.trainingId ? (
        <div className={style.wrapper}>
          <PanelOfTimers />
          <Goal />
          <WorkoutInfo />
          <Results training={training} /> <Chart training={training} />{' '}
        </div>
      ) : (
        <div className={style.someContainer}>
          <CreateTraningGoal
            style={{
              order: 2,
            }}
            {...goal}
          />{' '}
          <Workout handleChangeToGoal={handleChangeToGoal} />{' '}
          {training.trainingId && <Chart training={training} />}{' '}
        </div>
      )}{' '}
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
