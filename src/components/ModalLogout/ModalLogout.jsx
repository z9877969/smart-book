import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styles from './ModalLogout.module.css';
import { closeModal } from '../Backdrop/backdropActions';
import { logOut } from '../../services/API';
import { getUserToken } from '../../redux/selectors/sessionSelectors';

const ModalLogout = props => {
  const dispatch = useDispatch();
  const token = useSelector(state => getUserToken(state));

  const {history} = props;

  const handleClick = ({ target }) => {
    if (target.name === 'cancel') {
      dispatch(closeModal());
    } else if (target.name === 'logout') {
      dispatch(logOut(token));
      dispatch(closeModal());
      history.replace('/login');
      // onLogout(); // .then(() => closeModal()) - onLogout - операция разлогинивания которая возвращает промис
    }
  };

  const handleEsc = e => {
    if (e.keyCode === 27) dispatch(closeModal());
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
    <div className={styles.modal}>
      <p className={styles.text}>
        Якщо Ви вийдете з програми незбережені дані будуть втрачені
      </p>
      <div className={styles.buttonContainer}>
        <button type="button" name="cancel" onClick={handleClick}>
          Відміна
        </button>
        <button type="button" name="logout" onClick={handleClick}>
          Вийти
        </button>
      </div>
    </div>
  );
};

export default withRouter(ModalLogout);
