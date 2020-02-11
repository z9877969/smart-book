import React from 'react';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@material-ui/icons/CheckBox';
import PropTypes from 'prop-types';
import style from './TableItemInfo.module.css';

const TableItemInfo = ({ id, title, author, year, pagesCount }) => {
  return (
    <li key={id} className={style.bookListItem}>
      <input
        className={style.input}
        type="checkbox"
        name={id}
        value={id}
        id={title}
      />
      <label htmlFor={title} className={style.label}>
        <CheckBoxOutlineBlankIcon className={style.icon} />
        {/* <CheckBoxIcon className={style.icon} /> */}
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
      </label>
    </li>
  );
};

TableItemInfo.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  pagesCount: PropTypes.number.isRequired,
};

export default TableItemInfo;
