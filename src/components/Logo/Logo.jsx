import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Logo.module.css';
import { getAuthenticated } from '../../redux/selectors/sessionSelectors';

const Logo = () => {
  const authenticated = useSelector(state => getAuthenticated(state));
  return (
    <Link
      className={authenticated ? styles.logo_authenticated : styles.logo}
      to="/"
    >
      BR
    </Link>
  );
};

Logo.propTypes = {};

Logo.defaultProps = {};

export default Logo;
