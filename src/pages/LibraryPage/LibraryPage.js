import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AddBook from '../../components/AddBook/AddBook';
import BooksList from '../../components/BooksList/BooksList';
import SummaryModal from '../../components/SummaryModal/SummaryModal';
import ModalNotFinished from '../../components/ModalCongrats/ModalCongrats';
import { getLocalTime } from '../../components/Timer/timerHelpers';
import { booksOperation } from '../../redux/books/BooksOperations';
import {
  openModalNotFinished,
  closeModalNotFinished,
} from '../../redux/modals/modalsActions';
import { addLocation } from '../../redux/lastLocation/lastLocationAction';
import styles from './LibraryPage.module.css';

const LibraryPage = props => {
  const dispatch = useDispatch();

  // selectors
  const token = useSelector(state => state.session.token);
  const books = useSelector(state => state.books);
  const isSummaryModalOpen = useSelector(
    state => state.isModalsOpen.summaryModalReducer,
  );
  const isOpenModalFinished = useSelector(
    state => state.isModalsOpen.notFinishedModalReducer,
  );
  const hasUserTraining = useSelector(state => state.session.haveTraining);
  const timeEndTrainingUTC = useSelector(state => state.training.timeEnd);

  // helpers
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
  }, []);

  useEffect(() => {
    if (Date.parse(timeEndLocal) && Date.now() > Date.parse(timeEndLocal)) {
      dispatch(openModalNotFinished());
    }
  }, [hasUserTraining]);

  const { location } = props;
  useEffect(() => {
    dispatch(addLocation(location.pathname));
  }, [location.pathname]);

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

LibraryPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
};

LibraryPage.defaultProps = {
  location: '/library',
};

export default withRouter(LibraryPage);
