import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Logo.module.css';
import { getAuthenticated } from '../../redux/selectors/sessionSelectors';

// interfaces
interface State {
  authenticated?: boolean;
}

const Logo: React.FC = () => {
  const authenticated: boolean = useSelector((state: State) =>
    getAuthenticated(state),
  );
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
