import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import PropTypes from 'prop-types';
import style from './TrainingPage.module.css';
import PanelOfTimers from '../../components/Timer/PanelOfTimers';
import Results from '../../components/Results/Results';
import ModalCongrats from '../../components/ModalCongrats/ModalCongrats';
import Workout from '../../components/Workout/Workout';
import Goal from '../../components/Goal/Goal';
import Chart from '../../components/Chart/Chart';
import WorkoutInfo from '../../components/WorkoutInfo/WorkoutInfo';
import CreateTraningGoal from '../../components/CreateTraningGoal/CreateTraningGoal';
import { getTrainingFromServer, finishTraining } from '../../services/API';
// import { booksOperation } from '../../redux/books/BooksOperations';

import { closeCongratsModal } from '../../redux/modals/modalsActions';

const TrainingPage = () => {
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
  const haveTraining = useSelector(state => state.training.trainingId);
  const trainingId = useSelector(state => state.training.trainingId);
  const modalCongratsOpen = useSelector(
    state => state.isModalsOpen.congratsModalReducer,
  );
  // const modalCongratsClose = useSelector(
  //   state => state.isModalsOpen.congratsModalReducer,
  // );

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

  const handleCloseCongrats = () => {
    dispatch(finishTraining(trainingId, token, credentials));
    dispatch(closeCongratsModal());
  };

  // effects
  useEffect(() => {
    dispatch(getTrainingFromServer(token));
  }, []);

  return (
    <div className={style.container}>
      {' '}
      {modalCongratsOpen && (
        <ModalCongrats handleClick={handleCloseCongrats} />
      )}{' '}
      {haveTraining ? (
        <div className={style.wrapper}>
          <PanelOfTimers />
          <Goal />
          <WorkoutInfo />
          <Results training={training} /> <Chart training={training} />{' '}
        </div>
      ) : (
        <div className={style.someContainer}>
          <Workout handleChangeToGoal={handleChangeToGoal} />{' '}
          <CreateTraningGoal
            style={{
              order: 2,
            }}
            {...goal}
          />{' '}
          {training.trainingId && <Chart training={training} />}{' '}
        </div>
      )}{' '}
    </div>
  );
};

// const mapStateToProps = state => ({
//   // modalCongratsOpen: state.componentController.modalCongratsOpen,
//   training: state.training,
// });

// TrainingPage.propTypes = {
//   modalCongratsOpen: PropTypes.bool.isRequired,
//   training: PropTypes.shape({
//     trainingId: PropTypes.string.isRequired,
//     isDone: PropTypes.bool.isRequired,
//     timeStart: PropTypes.any,
//     timeEnd: PropTypes.any,
//     avgReadPages: PropTypes.number,
//     booksCount: PropTypes.number,
//     unreadCount: PropTypes.number,
//   }).isRequired,
// };

export default TrainingPage;
