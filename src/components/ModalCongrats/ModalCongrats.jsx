import React from 'react';
import moment from 'moment';
import {
  useSelector, useDispatch
} from 'react-redux';
import styles from './ModalCongrats.module.css';
import { finishTraining } from '../../services/API';
import { closeCongratsModal } from '../../redux/modals/modalsActions'

const ModalCongrats = () => {

  const dispatch = useDispatch();

  const token = useSelector(state => state.session.token);
  const trainingId = useSelector(state => state.training.trainingId);
  const timeEndTraining = useSelector(state => state.training.timeEnd);

  const end = moment(timeEndTraining).format("MMM Do YY");
  const currentTime = moment().format("MMM Do YY");

  const credentials = {
    isDone: true,
    booksCount: 0,
    unreadCount: 0,
    readPagesCount: 0,
    avgReadPages: 0
  }

  const handleClick = () => {
    finishTraining(trainingId, token, credentials);
    dispatch(closeCongratsModal());
  };

  return (
    <div className={styles.wrapperModal}>
      <div className={styles.modal}>
        <div className={styles.iconContainer}>
          <svg
            width="44"
            height="44"
            className={styles.icon}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M-1-1h582v402H-1z" />
            <g>
              <path
                stroke="null"
                d="M.03228485.09704218L44.11190358.136057l-.03884243 43.8848358L-.00655758 43.981878.03228485.09704218z"
                fill="none"
              />
              <g stroke="null">
                <path
                  fill="none"
                  d="M6.889346 5.669352h17.585392v16.420102H6.889346V5.669352zm0 0h17.585392v16.420102H6.889346V5.669352z"
                />
                <path d="M18.96503 35.284175h12.760825c1.176836 0 2.18352-.723264 2.608881-1.764764l4.28197-10.19806c.127604-.332699.198502-.679867.198502-1.05597v-2.893065c0-1.591183-1.276084-2.893065-2.83574-2.893065h-8.946759l1.346975-6.610658.042535-.46289c0-.593074-.241037-1.142757-.623864-1.533323l-1.502943-1.518859-9.343756 9.532649c-.510438.520757-.822366 1.244021-.822366 2.039616v14.465323c0 1.59119 1.276077 2.893065 2.83574 2.893065zm0-17.358387l6.153554-6.277952-1.899948 7.724481h12.760832v2.893065l-4.253613 10.125729H18.96503V17.925788zm-11.342959 0h5.671479v17.358387H7.622071V17.925788z" />
              </g>
            </g>
          </svg>
        </div>

        {currentTime > end ?
          (<p className={styles.text}>Ти молодчина,
              <br /> але потрібно швидше!
              <br /> Наступного разу тобі все вдасться</p>)
          :
          (<p className={styles.text}>Ти молодчина,
                <br /> просто супер!</p>)}

        <div className={styles.buttonContainer}>
          <button type="button" name="close" onClick={handleClick}>
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCongrats;
