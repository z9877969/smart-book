import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styles from './ModalLogout.module.css';
import { closeModal } from '../../redux/backdrop/backdropActions';
import { logOut } from '../../services/API';
import { getUserToken } from '../../redux/selectors/sessionSelectors';
import { logoutLocation } from '../../redux/lastLocation/lastLocationAction';
import { logOutTraining } from '../../redux/training/trainingActions';

// interfaces
interface ModalLogoutProps {
  history: any;
}

const ModalLogout: React.FC<ModalLogoutProps> = props => {
  const dispatch = useDispatch();
  const token = useSelector(state => getUserToken(state));

  const { history } = props;

  const handleClick = (event: React.MouseEvent): void => {
    const { name } = (event.target as unknown) as HTMLButtonElement;
    if (name === 'cancel') {
      dispatch(closeModal());
    } else if (name === 'logout') {
      dispatch(logOut(token));
      dispatch(logoutLocation());
      dispatch(logOutTraining());
      dispatch(closeModal());
      // onLogout(); // .then(() => closeModal()) - onLogout - операция разлогинивания которая возвращает промис
    }
  };

  const handleEsc = (e: KeyboardEvent): void => {
    const { keyCode } = e;
    if (keyCode === 27) dispatch(closeModal());
  };

  useEffect(() => {
    window.addEventListener('keydown', e => handleEsc(e));
  }, []);

  useEffect(() => {
    return () => {
      window.removeEventListener('keydown', e => handleEsc(e));
    };
  }, []);

  return (
    <div className={styles.modal}>
      <p className={styles.text}>
        Якщо Ви вийдете з програми незбережені дані будуть втрачені
      </p>
      <div className={styles.buttonContainer}>
        <button type="button" name="cancel" onClick={e => handleClick(e)}>
          Відміна
        </button>
        <button type="button" name="logout" onClick={e => handleClick(e)}>
          Вийти
        </button>
      </div>
    </div>
  );
};

export default withRouter(ModalLogout);
