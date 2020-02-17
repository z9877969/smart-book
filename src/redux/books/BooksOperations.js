import axios from 'axios';
import {
  BooksRequest,
  BooksSuccess,
  BooksError,
  BookDelete,
  BookUpdate,
  AddBook,
  BookUpdateStart,
} from './booksActions';

export const booksOperation = token => dispatch => {
  dispatch(BooksRequest());
  axios
    .get(`${process.env.REACT_APP_BASE_API_URL}/books`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      dispatch(BooksSuccess(res.data.books));
    })
    .catch(err => {
      dispatch(BooksError(err));
    });
};

export const bookDelete = (token, id) => dispatch => {
  axios
    .delete(`${process.env.REACT_APP_BASE_API_URL}/books`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      dispatch(BookDelete(res.data.books.filter(book => book.id !== id)));
    })
    .catch(err => {
      dispatch(BooksError(err));
    });
};

export const bookUpdate = (token, book) => dispatch => {
  dispatch(BookUpdateStart());
  const id = book._id;
  const data = book;
  axios
    .patch(`${process.env.REACT_APP_BASE_API_URL}/books/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(dispatch(BookUpdate(book)))
    .catch(err => {
      dispatch(BooksError(err));
    });
};

export const postBook = (book, token) => dispatch => {
  axios
    .post(`${process.env.REACT_APP_BASE_API_URL}/books/create`, book, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      if (response.status === 201) dispatch(AddBook(response.data.book));
    })
    .catch(error => dispatch(BooksError(error)));
};
