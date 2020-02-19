import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxSharp from '@material-ui/icons/CheckBoxSharp';
import PropTypes from 'prop-types';
import { getUserToken } from '../../../redux/selectors/sessionSelectors';
import { bookUpdate } from '../../../redux/books/BooksOperations';
import { updateTraining, getTrainingFromServer } from '../../../services/API';
import { openCongratsModal } from '../../../redux/modals/modalsActions';
import {
  getPagesResult,
  getTrainingBook,
  getTrainingBookIdsArr,
  booksFilterByStatus,
} from '../helpersTrainingBooks';
import style from './TableItemInfo.module.css';

const TableItemInfo = ({ id, title, author, year, pagesCount }) => {
  const dispatch = useDispatch();

  // basic selectors
  const token = useSelector(state => getUserToken(state));
  const books = useSelector(state => state.books);
  const training = useSelector(state => state.training);

  const book = books.find(bookObj => bookObj._id === id);
  const status = book ? book.status : '';

  // state
  const [toggleInput, setToggleInput] = useState(status === 'readed');
  const [bookId, setBookId] = useState('');

  // selectors advanced
  const pagesReadResultArr = useSelector(
    state => state.training.pagesReadResult,
  );
  const bookPagesCount = useSelector(
    state =>
      state.training.books.find(bookObj => bookObj.book.bookId === id).book
        .pagesCount,
  );
  const trainingBooksArr = useSelector(state => [...state.training.books]);

  // helpers
  const pagesReadResult = getPagesResult(pagesReadResultArr);
  const trainingBook = getTrainingBook(id, trainingBooksArr);
  const trainingBookIdsArr = getTrainingBookIdsArr(trainingBooksArr);
  const trainingBooksReading = booksFilterByStatus(
    'reading',
    trainingBookIdsArr,
    books,
  );

  const canCheckTrainingBook = () => {
    const readedTrainingBooksFromBooks = booksFilterByStatus(
      'readed',
      trainingBookIdsArr,
      books,
    );

    if (
      readedTrainingBooksFromBooks.length === 0 &&
      pagesReadResult >= bookPagesCount
    )
      return true;
    if (
      readedTrainingBooksFromBooks.length > 0 &&
      pagesReadResult >=
        [...readedTrainingBooksFromBooks].reduce(
          (acc, bookB) =>
            acc + getTrainingBook(bookB._id, trainingBooksArr).pagesCount,
          0,
        ) +
          trainingBook.pagesCount
    ) {
      return true;
    }
    return false;
  };

  // handlers
  const handleInputToggle = ({ target }) => {
    const { name } = target;
    const idBook = name;

    setBookId(idBook);

    if (book.status === 'reading' && canCheckTrainingBook()) {
      book.status = 'readed';
      dispatch(bookUpdate(token, book));
      setToggleInput(true);
      const trainingData = {
        trainingId: training.trainingId,
        unreadCount: training.unreadCount - 1,
      };
      dispatch(updateTraining(trainingData, token));
    }
    // else if (book.status === 'readed') {
    //   // <-- to comment for uncheck input
    //   book.status = 'reading'; // <-- to comment for uncheck input
    //   dispatch(bookUpdate(token, book)); // <-- to comment for uncheck input
    //   setToggleInput(false); // <-- to comment for uncheck input
    // } // <-- to comment for uncheck input
  };

  // effects
  // listener for updating training.unreadCount
  useEffect(() => {
    if (trainingBooksReading && !trainingBooksReading.length) {
      dispatch(getTrainingFromServer(token));
    }
  }, [toggleInput]);

  useEffect(() => {
    if (training && !training.unreadCount) {
      dispatch(openCongratsModal());
    }
  }, [training.unreadCount]);

  return (
    <li key={id} className={style.bookListItem}>
      <input
        className={style.input}
        type="checkbox"
        name={bookId}
        value={toggleInput}
        id={title}
        onClick={handleInputToggle}
      />
      <label htmlFor={title} className={style.label}>
        {!toggleInput ? (
          <CheckBoxOutlineBlankIcon className={style.icon} />
        ) : (
          <CheckBoxSharp className={style.icon} />
        )}
        <div className={style.bookListItemBody}>
          <p className={style.bookTitle}>{title}</p>
          <div className={`${style.bookInfo} ${style.bookAuthor}`}>
            <p className={style.bookName}>Автор:</p>
            <p className={style.bookData}>{author}</p>
          </div>
          <div className={`${style.bookInfo} ${style.bookYear}`}>
            <p className={style.bookName}>Рiк:</p>
            <p className={style.bookData}>{year}</p>
          </div>
          <div className={`${style.bookInfo} ${style.bookPages}`}>
            <p className={style.bookName}>Стор.:</p>
            <p className={style.bookData}>{pagesCount}</p>
          </div>
        </div>
      </label>
    </li>
  );
};

TableItemInfo.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  pagesCount: PropTypes.number.isRequired,
};

export default TableItemInfo;
