import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddBook from '../../components/AddBook/AddBook';
import BooksList from '../../components/BooksList/BooksList';
import SummaryModal from '../../components/SummaryModal/SummaryModal';
import ModalNotFinished from '../../components/ModalCongrats/ModalCongrats';
import { booksOperation } from '../../redux/books/BooksOperations';
import {
  openModalNotFinished,
  closeModalNotFinished,
} from '../../redux/modals/modalsActions';
import { getLocalTime } from '../../components/Timer/timerHelpers';
import styles from './LibraryPage.module.css';
import { getTrainingFromServer } from '../../services/API';

const LibraryPage = () => {
  const dispatch = useDispatch();

  // selectors
  const token = useSelector(state => state.session.token);
  // const auth = useSelector(state => state.session.authenticated);
  const books = useSelector(state => state.books);
  // const training = useSelector(state => state.training);
  const isSummaryModalOpen = useSelector(
    state => state.isModalsOpen.summaryModalReducer,
  );
  const isOpenModalFinished = useSelector(
    state => state.isModalsOpen.notFinishedModalReducer,
  );

  // helpers
  const timeEndTrainingUTC = useSelector(state => state.training.timeEnd);
  const timeEndLocal = timeEndTrainingUTC
    ? getLocalTime(timeEndTrainingUTC)
    : null;

  // handlers
  const handleModalNotFinishedClose = () => {
    dispatch(closeModalNotFinished());
  };

  // effects
  useEffect(() => {
    dispatch(booksOperation(token));
    dispatch(getTrainingFromServer(token));
  }, []);

  useEffect(() => {
    if (Date.parse(timeEndLocal) && Date.now() > Date.parse(timeEndLocal)) {
      dispatch(openModalNotFinished());
    }
  }, []);

  return (
    <div className={styles.libraryPage__wrapper}>
      {isSummaryModalOpen && <SummaryModal />}
      {isOpenModalFinished && (
        <ModalNotFinished handleClick={handleModalNotFinishedClose} />
      )}
      <AddBook />
      <BooksList books={books} />
    </div>
  );
};

export default LibraryPage;
