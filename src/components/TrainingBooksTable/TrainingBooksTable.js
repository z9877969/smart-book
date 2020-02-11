import React from 'react';
import PropTypes from 'prop-types';
import style from './TrainingBooksTable.module.css';

const TrainingPageTable = ({ children }) => {
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
      <ul className={style.bookList}>{children}</ul>
    </div>
  );
};

TrainingPageTable.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TrainingPageTable;
