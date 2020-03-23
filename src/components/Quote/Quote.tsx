import React from 'react';
import styles from './Quote.module.css';

const Quote: React.FC = () => {
  return (
    <div className={styles.wrapperQuote}>
      <p className={styles.quote}>
        Книги — это корабли мысли, странствующие по волнам времени и бережно
        несущие свой драгоценный груз от поколения к поколению.
      </p>
      <p className={styles.quoteAuthor}>Бэкон Ф.</p>
    </div>
  );
};

export default Quote;
