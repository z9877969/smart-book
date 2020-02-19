import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PanelOfTimers from '../../components/Timer/PanelOfTimers';
import Results from '../../components/Results/Results';
import ModalCongrats from '../../components/ModalCongrats/ModalCongrats';
import Workout from '../../components/Workout/Workout';
import Goal from '../../components/Goal/Goal';
import Chart from '../../components/Chart/Chart';
import WorkoutInfo from '../../components/WorkoutInfo/WorkoutInfo';
import CreateTraningGoal from '../../components/CreateTraningGoal/CreateTraningGoal';
import { getTrainingFromServer, finishTraining } from '../../services/API';
import { closeCongratsModal } from '../../redux/modals/modalsActions';
import { booksOperation } from '../../redux/books/BooksOperations';
import style from './TrainingPage.module.css';

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
  const modalCongratsOpen = useSelector(
    state => state.isModalsOpen.congratsModalReducer,
  );

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
    dispatch(finishTraining(training.trainingId, token, credentials));
    dispatch(closeCongratsModal());
  };

  // effects
  useEffect(() => {
    dispatch(getTrainingFromServer(token));
    dispatch(booksOperation(token));
  }, []);

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

export default TrainingPage;
