/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './NowReadBooks.module.css';
import img from './icon_library.png';

const NowReadBooks = ({ books }) => {
  return (
    <>
      {books ? (
        <div>
          <div className={styles.conteiner}>
            <h2 className={styles.tittle}>Читаю</h2>

            <ul>
              {books.map(book => (
                <li className={styles.item} key={book._id}>
                  <div className={styles.display}>
                    <img src={img} alt="book-icon" className={styles.icon} />
                    <h2 className={styles.cardTitle}>{book.title}</h2>
                  </div>

                  <div className={styles.table}>
                    <div className={styles.wrapper_mob}>
                      <div className={styles.label}>Автор:</div>
                      <div className={styles.quantity}>{book.author}</div>
                    </div>
                    <div className={styles.wrapper_mob}>
                      <div className={styles.label}>Рік:</div>
                      <div className={styles.quantity_year}>{book.year}</div>
                    </div>
                    <div className={styles.wrapper_mob}>
                      <div className={styles.label}>Стор.:</div>
                      <div className={styles.quantity}>{book.pagesCount}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.tablet}>
            <div className={styles.wrapper}>
              <div className={styles.wrapper_text}>
                <h2 className={styles.tittle__tablet}>Читаю</h2>
                <p className={styles.text__name_book}>Назва книги</p>
                <p className={styles.text__avtor}>Автор</p>
                <p className={styles.text__year}>Рік</p>
                <p className={styles.text__page}>Стор.</p>
              </div>
              <ul className={styles.read__book}>
                {books &&
                  books.map(book => (
                    <li className={styles.list_tablet} key={book._id}>
                      <img
                        src={img}
                        alt="book-icon"
                        className={styles.icon__tablet}
                      />

                      <div className={styles.flex}>
                        <div className={styles.name_book}>
                          <p className={styles.p_name_book}>{book.title}</p>
                        </div>
                        <div className={styles.author}>
                          <p className={styles.p_avtor}>{book.author}</p>
                        </div>
                        <div className={styles.year}>{book.year}</div>
                        <div className={styles.page}>
                          {book.page ? book.year : '-'}
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

NowReadBooks.propTypes = {
  books: PropTypes.node,
};

NowReadBooks.defaultProps = {
  books: null,
};

export default NowReadBooks;
