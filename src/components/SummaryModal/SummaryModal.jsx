import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Rating from '@material-ui/lab/Rating';
import styles from './SummaryModal.module.css';
import { closeModalSummary } from '../../redux/summaryModal/summaryModalActions';
import { ActionRemoveUpdatedBook } from '../../redux/updatedBook/updatedBookActions';
import { bookUpdate } from '../../redux/books/BooksOperations';
import { getUserToken } from '../../redux/selectors/sessionSelectors';

const SummaryModal = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => getUserToken(state));
  const updatedBookId = useSelector(state => state.updatedBook);
  const books = useSelector(state => state.books);
  const updatedBook = books.find(book => updatedBookId === book._id);

  const { _id, comment, rating } = updatedBook;
  const [enteredComment, setEnteredComment] = useState(comment);
  const [enteredRating, setEnteredRating] = useState(rating);

  const handleTextInput = e => {
    setEnteredComment(e.target.value);
  };
  const handleRatingUpdate = (e, value) => {
    setEnteredRating(value);
  };

  const handleClick = ({ target }) => {
    dispatch(closeModalSummary());
    if (target.name === 'back') {
      dispatch(closeModalSummary());
      dispatch(ActionRemoveUpdatedBook());
    } else if (target.name === 'save') {
      const bookToUpdate = updatedBook;
      bookToUpdate.rating = enteredRating;
      bookToUpdate.comment = enteredComment;
      dispatch(bookUpdate(token, bookToUpdate));
      dispatch(ActionRemoveUpdatedBook());
    }
  };

  const handleEsc = e => {
    if (e.keyCode === 27) dispatch(closeModalSummary());
  };

  useEffect(() => {
    window.addEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <div className={styles.summaryModal}>
      <div className={styles.modal}>
        <p className={styles.text}>Обрати рейтинг книги</p>
        <div className={styles.quantity}>
          <Rating
            name={_id}
            size="small"
            value={enteredRating}
            onChange={(event, value) => handleRatingUpdate(event, value)}
          />
        </div>
        <p className={styles.resume}>Резюме</p>
        <textarea
          className={styles.text_area}
          name="text"
          placeholder="|..."
          value={enteredComment}
          onChange={handleTextInput}
        />
        <div className={styles.buttonContainer}>
          <button type="button" name="back" onClick={handleClick}>
            Назад
          </button>
          <button type="button" name="save" onClick={handleClick}>
            Зберегти
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryModal;
