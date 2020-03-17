import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ModalCongrats from '../ModalCongrats/ModalCongrats';
import { closeModalNotFinished } from '../../redux/modals/modalsActions';

const ModalNotFinishedTraining: React.FC = () => {
  const dispatch = useDispatch();

  // handlers
  const handleModalNotFinishedClose = () => {
    dispatch(closeModalNotFinished());
  };

  const handleEsc = (e: KeyboardEvent) => {
    if (e.keyCode === 27) {
      dispatch(closeModalNotFinished());
    }
  };

  // effects
  useEffect(() => {
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return <ModalCongrats handleClick={() => handleModalNotFinishedClose()} />;
};

export default ModalNotFinishedTraining;
