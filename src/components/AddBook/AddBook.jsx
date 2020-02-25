import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useSelector, useDispatch } from 'react-redux';
import { postBook } from '../../redux/books/BooksOperations';
import { getUserToken } from '../../redux/selectors/sessionSelectors';
import styles from './AddBook.module.css';
import { useFormik } from 'formik';

const AddBook = () => {
  const token = useSelector(state => getUserToken(state));
  const dispatch = useDispatch();
  // const [bookName, setbookName] = useState('');
  // const [bookAuthor, setbookAuthor] = useState('');
  // const [bookDate, setbookDate] = useState(Date.now());
  // const [pagesAmount, setpagesAmount] = useState('');
  const formik = useFormik({
    initialValues: {
      bookName: '',
      bookAuthor: '',
      bookDate: Date.now(),
      pagesAmount: '',
    },
    onSubmit: (values, { resetForm }) => {
      // alert(JSON.stringify(values, null, 2));
      const book = {
        title: values.bookName,
        year: new Date(values.bookDate).getFullYear(),
        pagesCount: values.pagesAmount,
      };
      if (values.bookAuthor.trim().length) book.author = values.bookAuthor;
      dispatch(postBook(book, token));
      resetForm();
    },
  });

  // const getInputValue = ({ target }) => {
  //   if (target.name === 'bookName') {
  //     setbookName(target.value);
  //     return;
  //   }
  //   if (target.name === 'bookAuthor') {
  //     setbookAuthor(target.value);
  //     return;
  //   }
  //   if (target.name === 'pagesAmount') {
  //     setpagesAmount(Number(target.value));
  //   }
  // };

  // const handleDateInput = date => {
  //   setbookDate(date);
  // };

  // const createBook = event => {
  //   event.preventDefault();
  //   if (pagesAmount <= 0) return;
  //   const book = {
  //     title: bookName,
  //     year: new Date(bookDate).getFullYear(),
  //     pagesCount: pagesAmount,
  //   };
  //   if (bookAuthor.trim().length) book.author = bookAuthor;
  //   dispatch(postBook(book, token));

  //   setbookName('');
  //   setbookAuthor('');
  //   setbookDate(Date.now());
  //   setpagesAmount('');
  // };

  return (
    <form className={styles.addBookForm} onSubmit={formik.handleSubmit}>
      <label htmlFor="bookName" className={styles.labelTitle}>
        <div className={styles.inputTitle}>Назва книги</div>
        <input
          type="text"
          name="bookName"
          value={formik.values.bookName}
          id="bookName"
          placeholder="..."
          className={styles.inputData}
          onChange={formik.handleChange}
          required
        />
      </label>
      <div className={styles.tabletWrapper}>
        <label htmlFor="bookAuthor" className={styles.labelAutor}>
          <div className={styles.inputTitle}>Автор книги</div>
          <input
            type="text"
            name="bookAuthor"
            value={formik.values.bookAuthor}
            id="bookAuthor"
            placeholder="..."
            className={styles.inputData}
            onChange={formik.handleChange}
            required
          />
        </label>
        <label htmlFor="bookDate" className={styles.labelYear}>
          <div className={styles.inputTitle}>Рік випуску</div>
          <MuiPickersUtilsProvider utils={DateFnsUtils} id="bookDate">
            <DatePicker
              value={formik.values.bookDate}
              onChange={formik.handleChange}
              className={styles.inputData}
              InputProps={{ className: styles.inputData }}
              views={['year']}
              invalidDateMessage=""
              disableFuture
            />
          </MuiPickersUtilsProvider>
        </label>
        <label htmlFor="pagesAmount" className={styles.labelPages}>
          <div className={styles.inputTitle}>Кількість сторінок</div>
          <input
            type="number"
            name="pagesAmount"
            value={formik.values.pagesAmount}
            id="pagesAmount"
            placeholder="..."
            className={styles.inputData}
            onChange={formik.handleChange}
            min="0"
            required
          />
        </label>
      </div>
      <label htmlFor="addBtn">
        <input
          type="submit"
          value="Додати"
          id="addBtn"
          className={styles.addBtn}
        />
      </label>
    </form>
  );
};

export default AddBook;
