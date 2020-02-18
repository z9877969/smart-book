import { ActionUpdatedBook } from './updatedBookActions';

const updatedBookReducer = (state = null, { type, payload }) => {
  switch (type) {
    case ActionUpdatedBook.SET_BOOK:
      return payload;
    case ActionUpdatedBook.REMOVE_BOOK:
      return null;
    default:
      return state;
  }
};

export default updatedBookReducer;
