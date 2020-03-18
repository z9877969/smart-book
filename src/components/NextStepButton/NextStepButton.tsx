import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import styles from './NextStepButton.module.css';

const useStyles = makeStyles({
  linkMobile: {
    height: 39,
    marginTop: 36,
    marginBottom: 25,
    border: 'solid 1px var(--dark-indigo)',
    backgroundColor: 'var(--pale-grey)',
    fontFamily: 'Montserrat',
    fontSize: 13,
    fontWeight: 500,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.23,
  },

  linkTablet: {
    height: 39,
    color: 'var(--pale-grey)',
    boxShadow: '0px 3px 6px 0 rgba(0, 0, 0, 0.15)',
    border: 'solid 1px var(--orange)',
    backgroundColor: 'var(--orange)',
    marginBottom: 35,
  },
  linkDesktop: {
    height: 39,
    color: 'var(--pale-grey)',
    boxShadow: '0px 3px 6px 0 rgba(0, 0, 0, 0.15)',
    border: 'solid 1px var(--orange)',
    backgroundColor: 'var(--orange)',
    marginBottom: 35,
  },
});

const NextStepButton: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={styles.nextStepButton__wrapper}>
      <Button
        component={Link}
        to="/training"
        className={
          window.innerWidth >= 768 ? classes.linkTablet : classes.linkMobile
        }
      >
        Сформувати тренування
      </Button>
    </div>
  );
};

export default NextStepButton;
