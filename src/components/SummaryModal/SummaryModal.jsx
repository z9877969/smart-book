import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './SummaryModal.module.css';
import { closeModalSummary } from '../../redux/modals/modalsActions';

const SummaryModal = () => {
  const dispatch = useDispatch();

  const handleClick = ({ target }) => {
    dispatch(closeModalSummary());
    if (target.name === 'back') {
      dispatch(closeModalSummary());
    } else if (target.name === 'save') {
      //   dispatch(logOut(token));
      //   dispatch(closeModalSummary());
      // onLogout(); // .then(() => closeModal()) - onLogout - операция разлогинивания которая возвращает промис
    }
  };

  const handleEsc = e => {
    if (e.keyCode === 27) dispatch(closeModalSummary());
  };

  useEffect(() => {
    window.addEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <div className={styles.summaryModal}>
      <div className={styles.modal}>
        <p className={styles.text}>Обрати рейтинг книги</p>
        <p className={styles.resume}>Резюме</p>
        <textarea className={styles.text_area} name="text" placeholder="|..." />
        <div className={styles.buttonContainer}>
          <button type="button" name="back" onClick={handleClick}>
            Назад
          </button>
          <button type="button" name="save" onClick={handleClick}>
            Зберегти
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryModal;
