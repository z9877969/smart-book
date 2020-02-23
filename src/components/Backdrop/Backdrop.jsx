// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import {withRouter} from 'react-router-dom';
// import PropTypes from 'prop-types';
// import styles from './Backdrop.module.css';

// const Backdrop = ({ component: Component, closeModal }) => {

//   const isModalOpen = useSelector(state => state.isModalOpen);

//   const handleClose = ({ target, key }) => {
//     if (target.id === 'backdrop') {
//       closeModal();
//     }

//     if (key === 'Escape') {
//       closeModal();
//     }
//   };

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
