import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxSharp from '@material-ui/icons/CheckBoxSharp';
// import CheckBoxIcon from '@material-ui/icons/CheckBox';
import PropTypes from 'prop-types';
import { getUserToken } from '../../../redux/selectors/sessionSelectors';
import { bookUpdate } from '../../../redux/books/BooksOperations';
import { updateTraining } from '../../../services/API';
import { openCongratsModal } from '../../../redux/modals/modalsActions';
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
  // console.log(training);
  // const isCongratsOpen = useSelector(
  //   state => state.isModalsOpen.congratsModalReducer,
  // );
  // console.log('isCongratsOpen', isCongratsOpen);

  // helpers
  const pagesReadResult = pagesReadResultArr
    ? [...pagesReadResultArr].reduce((acc, el) => acc + el.count, 0)
    : 0;

  const trainingBooksArr = useSelector(state => [...state.training.books]);

  const trainingBook = idBook => {
    return trainingBooksArr.find(bookObj => bookObj.book.bookId === idBook)
      .book;
  };

  const booksFilterByStatus = statusBook => {
    const bookIdArr = trainingBooksArr.map(bookObj => bookObj.book.bookId);

    return [...books]
      .filter(
        bookObj =>
          bookIdArr.find(idBook => idBook === bookObj._id) === bookObj._id,
      )
      .filter(bookObj => bookObj.status === statusBook);
  };

  const canCheckTrainingBook = () => {
    const readedTrainingBooksFromBooks = booksFilterByStatus('readed');

    if (
      readedTrainingBooksFromBooks.length === 0 &&
      pagesReadResult >= bookPagesCount
    )
      return true;
    if (
      readedTrainingBooksFromBooks.length > 0 &&
      pagesReadResult >=
        [...readedTrainingBooksFromBooks].reduce(
          (acc, bookB) => acc + trainingBook(bookB._id).pagesCount,
          0,
        ) +
          trainingBook(id).pagesCount
    )
      return true;

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
    } else if (book.status === 'readed') {
      // book.status = 'reading';
      // dispatch(bookUpdate(token, book));
      // setToggleInput(false);
    }

    if (booksFilterByStatus('readed').length === trainingBooksArr.length) {
      dispatch(openCongratsModal());
    }
  };

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
