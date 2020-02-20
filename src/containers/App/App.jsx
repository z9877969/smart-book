import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Auth from '../../pages/Auth/Auth';
import LibraryPage from '../../pages/LibraryPage/LibraryPage';
import TrainingPage from '../../pages/TrainingPage/TrainingPage';
import Header from '../../components/Header/Header';
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';
import StartPage from '../../components/StartPage/StartPage';

import Loader from '../../components/Loader/LoaderContainer';

import { refreshUser } from '../../services/API';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser(), []);
  });

  return (
    <>
      <CssBaseline />
      <Header />
      <Loader />

      <Switch>
        <Route path="/registration" exact component={Auth} />
        <Route path="/login" component={Auth} />
        <ProtectedRoute
          component={LibraryPage}
          path="/library"
          redirectTo="/library"
        />
        <ProtectedRoute
          component={TrainingPage}
          path="/training"
          redirectTo="/training"
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
