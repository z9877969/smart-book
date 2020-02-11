import React from 'react';
import styles from './Quote.module.css';

const Quote = props => {
  return (
    <div className={styles.wrapperQuote}>
      <p className={styles.quote}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima labore
        praesentium enim,jrenfekrfnjfnjkndkjnfkjd orengfernfeinrign jfdnjfd
        nrfgeoigr rneogreg
      </p>
      <p className={styles.quoteAuthor}>Author</p>
    </div>
  );
};

export default Quote;
