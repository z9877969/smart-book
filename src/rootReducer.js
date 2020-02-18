import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import backdropReducer from './components/Backdrop/backdropReducer';
import { user, sessionReducer } from './redux/login/loginReducers';
import booksReducer from './redux/books/booksReducer';
import componentController from './redux/componentController/componentControllerReducer';
import trainingReducer from './redux/training/trainingReducer';
import { summaryModalReducer } from './redux/summaryModal/summaryModalReducer';
import loaderReducers from './redux/loader/loaderReducers';
import { userTrainingReducer } from './redux/userTraining/userTrainingReducer';
import updatedBookReducer from './redux/updatedBook/updatedBookReducer';

const sessionPersistConfig = {
  key: 'session',
  storage,
  whitelist: ['token'],
};

const rootReducer = combineReducers({
  user,
  books: booksReducer,
  session: persistReducer(sessionPersistConfig, sessionReducer),
  isModalOpen: backdropReducer,
  componentController,
  training: trainingReducer,
  isSummaryModalOpen: summaryModalReducer,
  loader: loaderReducers,
  userTraining: userTrainingReducer,
  updatedBook: updatedBookReducer,
});

export default rootReducer;
