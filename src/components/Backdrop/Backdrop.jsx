import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Backdrop.module.css';
import { closeModal } from '../../redux/backdrop/backdropActions';

const Backdrop = ({ component: Component }) => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(state => state.isModalOpen);
  const handleClose = ({ target, key }) => {
    if (target.id === 'backdrop') {
      dispatch(closeModal());
    }

    if (key === 'Escape') {
      dispatch(closeModal());
    }
  };

  return (
    <>
      {isModalOpen && (
        <div
          className={styles.backdrop}
          onClick={handleClose}
          onKeyDown={handleClose}
          id="backdrop"
        >
          <Component />
        </div>
      )}
    </>
  );
};

Backdrop.propTypes = {
  component: PropTypes.node.isRequired,
};

export default Backdrop;
