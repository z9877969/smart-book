import React from 'react';
import { useSelector } from 'react-redux';
import style from './WorkoutInfo.module.css';
import TrainingBooksTable from '../TrainingBooksTable/TrainingBooksTable';
import TableItemInfo from '../TrainingBooksTable/TableItemInfo/TableItemInfo';

const WorkoutInfo = () => {
  const training = useSelector(state => state.training);
  const trainingBooks = training.books ? training.books : [];

  return (
    <div className={style.container}>
      <TrainingBooksTable>
        {trainingBooks.length > 0 &&
          trainingBooks.map(el => (
            <TableItemInfo
              key={el.book.bookId}
              id={el.book.bookId}
              title={el.book.title}
              author={el.book.author}
              year={el.book.year}
              pagesCount={el.book.pagesCount}
            />
          ))}
      </TrainingBooksTable>
    </div>
  );
};

export default WorkoutInfo;
