import { ActionBooks } from './booksActions';

const booksReducer = (state = [], { type, payload }) => {
  switch (type) {
    case ActionBooks.BOOKS_SUCCESS:
    case ActionBooks.BOOKS_ERROR:
      return payload;
    case ActionBooks.BOOK_DELETE:
      return state.filter(book => book.id !== payload);
    case ActionBooks.BOOK_UPDATE: {
      return state.map(book => book.id === payload);
    }
    case ActionBooks.ADD_BOOK:
      return [...state, payload];
    default:
      return state;
  }
};

export default booksReducer;
