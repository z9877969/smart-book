import { ActionBooks } from './booksActions';

const booksReducer = (state = [], { type, payload }) => {
  switch (type) {
    case ActionBooks.BOOKS_SUCCESS:
    case ActionBooks.BOOKS_ERROR:
      return payload;
    case ActionBooks.BOOK_DELETE:
      return state.filter(book => book._id !== payload);
    case ActionBooks.BOOK_UPDATE: {
      state.find(book => {
        if (book._id === payload._id) {
          const updatedBook = { ...book, ...payload };
          return updatedBook;
        }
        return book;
      });
      return [...state];
    }
    case ActionBooks.ADD_BOOK:
      return [...state, payload];
    default:
      return state;
  }
};

export default booksReducer;
