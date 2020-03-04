import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import backdropReducer from './redux/backdrop/backdropReducer';
import { user, sessionReducer } from './redux/login/loginReducers';
import booksReducer from './redux/books/booksReducer';
import componentController from './redux/componentController/componentControllerReducer';
import trainingReducer from './redux/training/trainingReducer';
import { modalReducers } from './redux/modals/modalsReducer';
import loaderReducers from './redux/loader/loaderReducers';
import { userTrainingReducer } from './redux/userTraining/userTrainingReducer';
import updatedBookReducer from './redux/updatedBook/updatedBookReducer';
import locationReducer from './redux/lastLocation/lastLocationReducer';
import { timerReducer } from './redux/timer/timerReducer';

const sessionPersistConfig = {
  key: 'session',
  storage,
  whitelist: ['token'],
};

const locationPersistConfig = {
  key: 'location',
  storage,
};

const rootReducer = combineReducers({
  user,
  books: booksReducer,
  session: persistReducer(sessionPersistConfig, sessionReducer),
  isModalOpen: backdropReducer,
  componentController,
  training: trainingReducer,
  isModalsOpen: modalReducers,
  loader: loaderReducers,
  userTraining: userTrainingReducer,
  updatedBook: updatedBookReducer,
  lastLocation: persistReducer(locationPersistConfig, locationReducer),
  timer: timerReducer,
});

export default rootReducer;
