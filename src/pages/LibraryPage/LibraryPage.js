import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AddBook from '../../components/AddBook/AddBook';
import BooksList from '../../components/BooksList/BooksList';
import SummaryModal from '../../components/SummaryModal/SummaryModal';
import { booksOperation } from '../../redux/books/BooksOperations';
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

  // effects
  useEffect(() => {
    dispatch(booksOperation(token));
  }, []);

  const { location } = props;
  useEffect(() => {
    dispatch(addLocation(location.pathname));
  }, [location.pathname]);

  return (
    <div className={styles.libraryPage__wrapper}>
      {isSummaryModalOpen && <SummaryModal />}

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
