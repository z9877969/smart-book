export const ActionUpdatedBook = {
  SET_BOOK: 'SET_BOOK',
  REMOVE_BOOK: 'REMOVE_BOOK',
};

export const ActionSetUpdatedBook = book => ({
  type: ActionUpdatedBook.SET_BOOK,
  payload: book,
});

export const ActionRemoveUpdatedBook = () => ({
  type: ActionUpdatedBook.REMOVE_BOOK,
});
