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
  const books = useSelector(state => state.books);
  const isSummaryModalOpen = useSelector(state => state.isSummaryModalOpen);

  useEffect(() => {
    dispatch(booksOperation(token));
  }, []);

  return (
    <div className={styles.libraryPage__wrapper}>
      {isSummaryModalOpen && <SummaryModal />}
      <AddBook />
      <BooksList books={books} />
    </div>
  );
};

export default LibraryPage;
