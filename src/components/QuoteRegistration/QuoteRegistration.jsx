import React from 'react';
import styles from './QuoteRegistration.module.css';

const QuoteRegistration = () => (
  <div className={styles.wrapperQuote}>
    <h1 className={styles.quoteTitle}>Books Reading</h1>
    <h2 className={styles.quoteSubtitle}>Допоможе вам</h2>
    <ul className={styles.helpList}>
      <li className={styles.helpListItem}>Швидше сформулювати свою ціль і розпочати читати</li>
      <li className={styles.helpListItem}>Пропорційно розподілити навантаження на кожний день</li>
      <li className={styles.helpListItem}>Відстежувати особистий успіх</li>
    </ul>

    <h2 className={styles.quoteSubtitle}>Також ви зможете</h2>

    <ul className={styles.canList}>
      <li className={styles.canListItem}>Формувати особисту думку незалежну від інших</li>
      <li className={styles.canListItem}>Підвищити свої професійні якості опираючись на нові знання</li>
      <li className={styles.canListItem}>Стати цікавим співрозмовником</li>
    </ul>
  </div>
);

export default QuoteRegistration;
