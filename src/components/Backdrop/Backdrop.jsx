import React from 'react';
import PropTypes from 'prop-types';
import styles from './Backdrop.module.css';

const Backdrop = ({ component: Component, isModalOpen, closeModal }) => {
  const handleClose = ({ target, key }) => {
    if (target.id === 'backdrop') {
      closeModal();
    }

    if (key === 'Escape') {
      closeModal();
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
  isModalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Backdrop;
