import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './LibraryPage.module.css';
import AddBook from '../../components/AddBook/AddBook';
import BooksList from '../../components/BooksList/BooksList';
import { booksOperation } from '../../redux/books/BooksOperations';
import SummaryModal from '../../components/SummaryModal/SummaryModal';

const LibraryPage = () => {
  const token = useSelector(state => state.session.token);
  const dispatch = useDispatch();
  const book = useSelector(state => state.books);
  const isSummaryModalOpen = useSelector(
    state => state.isModalsOpen.summaryModalReducer,
  );

  useEffect(() => {
    dispatch(booksOperation(token));
  }, []);

  return (
    <div className={styles.libraryPage__wrapper}>
      {isSummaryModalOpen && <SummaryModal />}
      <AddBook />
      <BooksList books={book} />
    </div>
  );
};

export default LibraryPage;
