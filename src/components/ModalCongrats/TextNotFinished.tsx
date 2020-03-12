import React from 'react';
import styles from './ModalCongrats.module.css';

const NotFinishedText: React.FC = () => (
  <p className={styles.text}>
    Ти молодчина,
    <br /> але потрібно швидше!
    <br /> Наступного разу тобі все вдасться
  </p>
);

export default NotFinishedText;
