import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Auth from '../../pages/Auth/Auth';
import LibraryPage from '../../pages/LibraryPage/LibraryPage';
import TrainingPage from '../../pages/TrainingPage/TrainingPage';
import Header from '../../components/Header/Header';
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';
import StartPage from '../../components/StartPage/StartPage';
import Loader from '../../components/Loader/LoaderContainer';
import ModalNotFinishedTraining from '../../components/ModalNotFinishedTraining/ModalNotFinishedTraining';

import { refreshUser } from '../../services/API';
import { openModalNotFinished } from '../../redux/modals/modalsActions';
import { actionIsTimerTimeEnded } from '../../redux/timer/timerAction';
// import { timeEndState } from '../../components/Timer/timerHelpers';

function App() {
  const dispatch = useDispatch();
  
  // selectors
  const token = useSelector(state => state.session.token);
  const user = useSelector(state => state.user);
  const isTimeEnded = useSelector(state => state.timer.isTimerTimeEnded);
  const timeEndState = useSelector(state => state.training.timeEnd);
  const training = useSelector(state => state.training);
  const isOpenModalNotFinished = useSelector(state => state.isModalsOpen.notFinishedModalReducer);

  // effects  
  useEffect(() => {
    dispatch(refreshUser(token));
  }, []);

  // handle if timer pass from 0 on TrainingPage
  useEffect(() => {
    if(isTimeEnded && user && user.haveTraining){ 
      console.log('isTimeEnded', isTimeEnded);
      dispatch(openModalNotFinished()) 
    }
  }, [isTimeEnded]);

  // handle if user login or refresh app
  useEffect(() => {
    const isTimerTimeEnded = timeEndState ? Date.parse(timeEndState) - Date.now() < 0 : false;
    console.log('isTimerTimeEnded_training.trainingId:', isTimerTimeEnded);
    dispatch(actionIsTimerTimeEnded(isTimerTimeEnded));
  }, [training.trainingId])


  return (
    <>
      <Loader />      
      {isOpenModalNotFinished && <ModalNotFinishedTraining />}
      <CssBaseline />
      <Header />

      <Switch>
        <Route path="/registration" exact component={Auth} />
        <Route path="/login" component={Auth} />
        <ProtectedRoute
          component={LibraryPage}
          path="/library"
          redirectTo="/login"
        />
        <ProtectedRoute
          component={TrainingPage}
          path="/training"
          redirectTo="/login"
        />
        <Route path="/" component={StartPage} />
        <Route path="*">
          <div>create page for 404</div>
        </Route>
      </Switch>
      {/* ... bottom place your components */}
    </>
  );
}

export default App;
