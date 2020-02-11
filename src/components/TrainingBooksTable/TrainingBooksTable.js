/* eslint-disable no-underscore-dangle */
import React from 'react';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import PropTypes from 'prop-types';
import style from './TrainingBooksTable.module.css';

const TrainingPageTable = ({ books, deleteBook }) => {
  return (
    <div className={style.table}>
      <div className={style.tableHeader}>
        <div className={style.columnTitle}>
          <p className={style.headerTitle}>Назва книги</p>
        </div>
        <div className={style.columnAuthor}>
          <p className={style.headerTitle}>Автор</p>
        </div>
        <div className={style.columnYear}>
          <p className={style.headerTitle}>Рiк</p>
        </div>
        <div className={style.columnPages}>
          <p className={style.headerTitle}>Стор.</p>
        </div>
      </div>
      <ul className={style.bookList}>
        {books.length > 0 ? (
          books.map(el => (
            <li key={el._id} className={style.bookListItem}>
              <MenuBookIcon className={style.iconBook} />
              <div className={style.bookListItemBody}>
                <p className={style.bookTitle}>{el.title}</p>
                <div className={`${style.bookInfo} ${style.bookAuthor}`}>
                  <p className={style.bookName}>Автор:</p>
                  <p className={style.bookData}>{el.author}</p>
                </div>
                <div className={`${style.bookInfo} ${style.bookYear}`}>
                  <p className={style.bookName}>Рiк:</p>
                  <p className={style.bookData}>{el.year}</p>
                </div>
                <div className={`${style.bookInfo} ${style.bookPages}`}>
                  <p className={style.bookName}>Стор.:</p>
                  <p className={style.bookData}>{el.pagesCount}</p>
                </div>
              </div>
              <button
                type="button"
                className={style.btnDelete}
                onClick={() => deleteBook(el._id)}
              >
                <DeleteOutlineIcon className={style.iconDelete} />
              </button>
            </li>
          ))
        ) : (
          <li className={style.bookListIte}>
            <MenuBookIcon className={style.iconBook} />
            ...
          </li>
        )}
      </ul>
    </div>
  );
};

TrainingPageTable.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
      pagesCount: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  deleteBook: PropTypes.func.isRequired,
};

export default TrainingPageTable;
