import React from 'react';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import PropTypes from 'prop-types';
import style from './TableItemCreate.module.css';

const TableItemCreate = ({
  id,
  title,
  author,
  year,
  pagesCount,
  deleteBook,
}) => {
  return (
    <li key={id} className={style.bookListItem}>
      <MenuBookIcon className={style.iconBook} />
      <div className={style.bookListItemBody}>
        <p className={style.bookTitle}>{title}</p>
        <div className={`${style.bookInfo} ${style.bookAuthor}`}>
          <p className={style.bookName}>Автор:</p>
          <p className={style.bookData}>{author}</p>
        </div>
        <div className={`${style.bookInfo} ${style.bookYear}`}>
          <p className={style.bookName}>Рiк:</p>
          <p className={style.bookData}>{year}</p>
        </div>
        <div className={`${style.bookInfo} ${style.bookPages}`}>
          <p className={style.bookName}>Стор.:</p>
          <p className={style.bookData}>{pagesCount}</p>
        </div>
      </div>
      <button
        type="button"
        className={style.btnDelete}
        onClick={() => deleteBook(id)}
      >
        <DeleteOutlineIcon className={style.iconDelete} />
      </button>
    </li>
  );
};

TableItemCreate.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  pagesCount: PropTypes.number.isRequired,
  deleteBook: PropTypes.func.isRequired,
};

export default TableItemCreate;
