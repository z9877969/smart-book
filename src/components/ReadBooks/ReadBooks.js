import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Rating from '@material-ui/lab/Rating';
import { useDispatch } from 'react-redux';
import styles from './ReadBooks.module.css';
import { openModalSummary } from '../../redux/summaryModal/summaryModalActions';
import img from './images/library.png';

const ReadBooks = ({ books }) => {
  const [value, setValue] = useState(null);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(openModalSummary());
  };

  return (
    <>
      {books ? (
        <div>
          <div className={styles.conteiner}>
            <h1 className={styles.title}>Прочитано</h1>
            <ul className={styles.cardBook}>
              {books.map(book => (
                <li className={styles.item} key={book.id}>
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
                    </div>{' '}
                    <div className={styles.wrapper_mob}>
                      <div className={styles.label}>Рейтинг:</div>
                      <div className={styles.quantity}>
                        <Rating
                          name="simple-controlled "
                          size="small"
                          value={value}
                          onChange={newValue => {
                            setValue(newValue);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    className={
                      book.comment ? styles.button__orange : styles.button__grey
                    }
                    type="button"
                    onClick={handleClick}
                  >
                    Резюме
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.tablet}>
            <div className={styles.wrapper}>
              <div className={styles.wrapper_text}>
                <h2 className={styles.tittle__tablet}>Прочитано</h2>
                <p className={styles.text__name_book}>Назва книги</p>
                <p className={styles.text__avtor}>Автор</p>
                <p className={styles.text__year}>Рік</p>
                <p className={styles.text__page}>Стор.</p>
                <p className={styles.text__rating}>Рейтинг</p>
                <p className={styles.text__rating_book}>Рейтинг книги</p>
              </div>
              <ul className={styles.read__book}>
                {books.map(book => (
                  <li className={styles.list_tablet} key={book.id}>
                    <img
                      src={img}
                      alt="book-icon"
                      className={styles.icon__tablet}
                    />

                    <div className={styles.table_book}>
                      <div className={styles.name_book}>
                        <p className={styles.p_name_book}>{book.title}</p>
                      </div>
                      <div className={styles.avtor}>
                        <p className={styles.p_avtor}>{book.author}</p>
                      </div>
                      <div className={styles.year}>{book.year}</div>
                      <div className={styles.page}>{book.pagesCount}</div>
                      <div className={styles.rating}>
                        <Rating
                          name="simple-controlled"
                          size="small"
                          value={value}
                          onChange={newValue => {
                            setValue(newValue);
                          }}
                        />
                      </div>
                    </div>
                    <button
                      className={
                        book.comment
                          ? styles.button__tablet_orange
                          : styles.button__tablet_grey
                      }
                      type="button"
                      onClick={handleClick}
                    >
                      Резюме
                    </button>
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

ReadBooks.defaultProps = {
  books: null,
};
ReadBooks.propTypes = {
  books: PropTypes.arrayOf(),
};

export default ReadBooks;
