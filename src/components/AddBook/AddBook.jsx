/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useSelector, useDispatch } from 'react-redux';
import { postBook } from '../../redux/books/BooksOperations';
import { getUserToken } from '../../redux/selectors/sessionSelectors';
import styles from './AddBook.module.css';
import 'react-toastify/dist/ReactToastify.css';

const AddBook = () => {
  const token = useSelector(state => getUserToken(state));
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      bookName: '',
      bookAuthor: '',
      bookDate: new Date(),
      pagesAmount: '',
    },
    validationSchema: Yup.object({
      bookName: Yup.string()
        .min(1, 'ЗАПОВНІТЬ ПОЛЕ')
        .max(50, 'ЗАНАДТО ДОВГА НАЗВА')
        .matches(/^(?! )(?!-).*$/, 'НЕ МОЖЕ ПОЧИНАТИСЯ З ПРОБІЛУ/ДЕФІСУ')
        .required('ЗАПОВНІТЬ ПОЛЕ'),
      bookAuthor: Yup.string()
        .min(1, 'ЗАПОВНІТЬ ПОЛЕ')
        .max(50, 'ЗАНАДТО ДОВГА НАЗВА')
        .matches(
          /^(?! )(?!-)(?!(?:.*\d)).*$/,
          'НЕ МОЖЕ ПОЧИНАТИСЯ З ПРОБІЛУ/ДЕФІСУ ТА МІСТИТИ ЦИФРИ',
        )
        .required('ЗАПОВНІТЬ ПОЛЕ'),
      pagesAmount: Yup.string()
        .min(1, 'ЗАПОВНІТЬ ПОЛЕ')
        .max(4, 'ЗАНАДТО БАГАТО СТОРІНОК')
        .required('ЗАПОВНІТЬ ПОЛЕ'),
    }),
    onSubmit: (values, { resetForm }) => {
      // alert(JSON.stringify(values, null, 2));
      if (values.pagesAmount <= 0) return;
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

  const [toastId, setToastId] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'bookName' && !value.match(/^(?! )(?!-).*$/)) {
      setToastId(name);
      toast('НЕ МОЖЕ ПОЧИНАТИСЯ З ПРОБІЛУ/ДЕФІСУ', {
        type: 'error',
        toastId,
      });
    }
    if (name === 'bookAuthor' && !value.match(/^(?! )(?!-)(?!(?:.*\d)).*$/)) {
      setToastId(name);
      toast('НЕ МОЖЕ ПОЧИНАТИСЯ З ПРОБІЛУ/ДЕФІСУ ТА МІСТИТИ ЦИФРИ', {
        type: 'error',
        toastId,
      });
    }
    if (name === 'pagesAmount' && value.length > 4) {
      setToastId(name);
      toast('ЗАНАДТО БАГАТО СТОРІНОК', {
        type: 'error',
        toastId,
      });
    }

    formik.handleChange(e);
  };

  return (
    <>
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
            onChange={handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.bookName && formik.errors.bookName ? (
            <span className={styles.bookNameError}>
              {/* {formik.errors.bookName} */}
            </span>
          ) : null}
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
              onChange={handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.bookAuthor && formik.errors.bookAuthor ? (
              <span className={styles.bookAuthorError}>
                {/* {formik.errors.bookAuthor} */}
              </span>
            ) : null}
          </label>
          <label htmlFor="bookDate" className={styles.labelYear}>
            <div className={styles.inputTitle}>Рік випуску</div>
            <MuiPickersUtilsProvider utils={DateFnsUtils} id="bookDate">
              <DatePicker
                value={formik.values.bookDate}
                onChange={date => formik.setFieldValue('bookDate', date)}
                className={styles.inputData}
                InputProps={{ className: styles.inputData }}
                views={['year']}
                invalidDateMessage=""
                disableFuture
                autoOk
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
              onChange={handleChange}
              onBlur={formik.handleBlur}
              min="0"
              required
            />
            {formik.touched.pagesAmount && formik.errors.pagesAmount ? (
              <span className={styles.pagesAmountError}>
                {/* {formik.errors.pagesAmount} */}
              </span>
            ) : null}
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
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        closeOnClick
        pauseOnHover={false}
      />
    </>
  );
};

export default AddBook;
