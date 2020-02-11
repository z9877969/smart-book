import React from 'react';
import style from './TrainingTableInfo.module.css';

const books = [
  {
    id: 'id1',
    title: 'jhgth',
    author: 'fhbfbgh gbf',
    year: '1954',
    pagesCount: 10,
  },
  {
    id: 'id2',
    title: 'jhdrfgthygth',
    author: 'fhbfbgh gbf',
    year: '1954',
    pagesCount: 10,
  },
];

const TrainingTableInfo = () => {
  return (
    <div>
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
          {books.length > 0
            ? books.map(el => (
                <li key={el._id} className={style.bookListItem}>
                  <input
                    className={style.input}
                    type="checkbox"
                    name={el._id}
                    value={el._id}
                    id={el.title}
                  />
                  <label htmlFor={el.title} className={style.label}>
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
                  </label>
                </li>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
};

export default TrainingTableInfo;
