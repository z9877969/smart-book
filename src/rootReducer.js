import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import backdropReducer from './components/Backdrop/backdropReducer';
import { user, sessionReducer } from './redux/login/loginReducers';
import booksReducer from './redux/books/booksReducer';
import componentController from './redux/componentController/componentControllerReducer';
import trainingReducer from './redux/training/trainingReducer';
import { modalReducers } from './redux/modals/modalsReducer';
import loaderReducers from './redux/loader/loaderReducers';
import { userTrainingReducer } from './redux/userTraining/userTrainingReducer';
import updatedBookReducer from './redux/updatedBook/updatedBookReducer';

const sessionPersistConfig = {
  key: 'session',
  storage,
  whitelist: ['token'],
};

// const booksPersistConfig = {
//   key: 'books',
//   storage,
//   whitelist: ['books'],
// };

const rootReducer = combineReducers({
  user,
  books: booksReducer,
  // books: persistReducer(booksPersistConfig, booksReducer),
  session: persistReducer(sessionPersistConfig, sessionReducer),
  isModalOpen: backdropReducer,
  componentController,
  training: trainingReducer,
  isModalsOpen: modalReducers,
  loader: loaderReducers,
  userTraining: userTrainingReducer,
  updatedBook: updatedBookReducer,
});

export default rootReducer;
