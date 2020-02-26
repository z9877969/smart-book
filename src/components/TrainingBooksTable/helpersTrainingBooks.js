export const getPagesResult = pagesArr =>
  pagesArr ? [...pagesArr].reduce((acc, el) => acc + el.count, 0) : 0;

export const getTrainingBook = (idBook, booksArr) =>
  booksArr.find(bookObj => bookObj.book.bookId === idBook).book;

export const getTrainingBookIdsArr = trainingBooksArr =>
  [...trainingBooksArr].map(bookObj => bookObj.book.bookId);

export const booksFilterByStatus = (
  statusBook,
  trainingBookIdsArr,
  booksAllArr,
) =>
  [...booksAllArr]
    .filter(
      bookObj =>
        trainingBookIdsArr.find(idBook => idBook === bookObj._id) ===
        bookObj._id,
    )
    .filter(bookObj => bookObj.status === statusBook);
