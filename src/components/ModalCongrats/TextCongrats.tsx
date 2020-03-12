import React from 'react';
import styles from './ModalCongrats.module.css';

const TextCongrats: React.FC = () => (
  <p className={styles.text}>
    ВІТАЄМО! YOU ARE THE BEST!
    <br />
    ЦІЛЬ ДОСЯГНУТА ВСЕ ПРОЧИТАНО В ВИЗНАЧЕНИЙ СТРОК.
    {/* <br />  */}
    МОЖНА РОЗПОЧИНАТИ НОВЕ ТРЕНУВАННЯ.
    {/* Ти молодчина,
    <br />
    просто супер! */}
  </p>
);

export default TextCongrats;
