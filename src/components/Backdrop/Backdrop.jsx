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

//   const handleClose = ({ target, key }) => {
//     if (target.id === 'backdrop') {
//       closeModal();
//     }

Backdrop.propTypes = {
  component: PropTypes.node.isRequired,
};

//   return (
//     <>
//       {isModalOpen && (
//         <div
//           className={styles.backdrop}
//           onClick={handleClose}
//           onKeyDown={handleClose}
//           id="backdrop"
//         >
//           <Component />
//         </div>
//       )}
//     </>
//   );
// };

// Backdrop.propTypes = {
//   component: PropTypes.node.isRequired,
//   isModalOpen: PropTypes.bool.isRequired,
//   closeModal: PropTypes.func.isRequired,
// };

// export default withRouter(Backdrop);
