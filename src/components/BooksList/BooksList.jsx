import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import StartingSteps from '../StartingSteps/StartingSteps';

import NowReadBooks from '../NowReadBooks/NowReadBooks';
import PlanReadBooks from '../PlanReadBooks/PlanReadBooks';
import ReadBooks from '../ReadBooks/ReadBooks';
import NextStepButton from '../NextStepButton/NextStepButton';

const BooksList = () => {
  const [planedBooks, setPlanedBooks] = useState([]);
  const [readBooks, setReadBooks] = useState([]);
  const [nowReadBooks, setNowReadBooks] = useState([]);
  const userHasTraining = useSelector(state => state.user.haveTraining);

  const books = useSelector(state => state.books);

  useEffect(() => {
    if (books) {
      setPlanedBooks([...books].filter(book => book.status === 'planned'));
      setReadBooks([...books].filter(book => book.status === 'readed'));
      setNowReadBooks([...books].filter(book => book.status === 'reading'));
    }
  }, [books]);

  return (
    <>
      {books.length > 0 ? (
        <>
          {!userHasTraining && <NextStepButton />}
          {!!planedBooks.length && <PlanReadBooks books={planedBooks} />}
          {!!nowReadBooks.length && <NowReadBooks books={nowReadBooks} />}
          {!!readBooks.length && <ReadBooks books={readBooks} />}
        </>
      ) : (
        <>
          <StartingSteps />
        </>
      )}
    </>
  );
};

export default BooksList;
