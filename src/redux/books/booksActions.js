export const ActionBooks = {
  BOOKS_REQUEST: 'BOOKS_REQUEST',
  BOOKS_SUCCESS: 'BOOKS_SUCCESS',
  BOOKS_ERROR: 'BOOKS_ERROR',
  BOOK_DELETE: 'BOOK_DELETE',
  BOOK_UPDATE_START: 'BOOK_UPDATE_START',
  BOOK_UPDATE: 'BOOK_UPDATE',
  BOOK_UPDATE_ERROR: 'BOOK_UPDATE_ERROR',
  ADD_BOOK: 'ADD_BOOK',
};

export const BooksRequest = () => ({
  type: ActionBooks.BOOKS_REQUEST,
});

export const BooksSuccess = res => ({
  type: ActionBooks.BOOKS_SUCCESS,
  payload: res,
});

export const BooksError = error => ({
  type: ActionBooks.BOOKS_ERROR,
  payload: error,
});

export const BookDelete = id => ({
  type: ActionBooks.BOOK_DELETE,
  payload: id,
});

export const BookUpdate = book => {
  return {
    type: ActionBooks.BOOK_UPDATE,
    payload: book,
  };
};
export const BookUpdateStart = () => {
  return {
    type: ActionBooks.BOOK_UPDATE_START,
  };
};

export const AddBook = book => ({
  type: ActionBooks.ADD_BOOK,
  payload: book,
});
