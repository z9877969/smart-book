import React from 'react';
import { NavLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import { useSelector, useDispatch } from 'react-redux';
import makeStyle from '@material-ui/styles/makeStyles';
import Logo from '../Logo/Logo';
import ModalLogout from '../ModalLogout/ModalLogout';
import styles from './Header.module.css';
import { openModal } from '../Backdrop/backdropActions';
import {
  getIsModalOpen,
  getAuthenticated,
  getUser,
} from '../../redux/selectors/sessionSelectors';

const useStyles = makeStyle(theme => ({
  btnIcon: {
    fill: '#a6abb9',
    color: '#a6abb9',
  },
  btnActiveIcon: {
    color: theme.palette.secondary.main,
  },
}));

const Header = () => {
  const classes = useStyles();
  const isModalOpen = useSelector(state => getIsModalOpen(state));
  const user = useSelector(state => getUser(state));
  const authenticated = useSelector(state => getAuthenticated(state));
  const dispatch = useDispatch();

  const handleOpenModalLogout = () => {
    dispatch(openModal());
  };

  const firstLetter = name => {
    return name.split('')[0];
  };

  return (
    <div className={styles.container}>
      {isModalOpen && (
        <div className={styles.modalLogOut}>
          <ModalLogout />
        </div>
      )}
      <Logo />
      {authenticated && (
        <div className={styles.nav}>
          <IconButton
            component={NavLink}
            to="/training"
            className={`${styles.icon} ${classes.btnIcon}`}
            activeClassName={classes.btnActiveIcon}
          >
            <MenuBookIcon />
          </IconButton>
          <IconButton
            component={NavLink}
            to="/library"
            className={`${styles.icon} ${classes.btnIcon}`}
            activeClassName={classes.btnActiveIcon}
          >
            <HomeOutlinedIcon />
          </IconButton>
          {user && (
            <div className={styles.bookPars}>
              <span className={styles.bookNameLetter}>
                {firstLetter(user.name.fullName)}
              </span>
              <span className={styles.bookName}>
                {user ? user.name.fullName : 'User name'}
              </span>
            </div>
          )}
          <button
            type="button"
            className={styles.buttonExit}
            onClick={handleOpenModalLogout}
          >
            Вихiд
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
