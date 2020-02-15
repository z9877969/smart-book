import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import styles from './StartPage.module.css';


const useStyles = makeStyles(theme => ({
  logInButton: {
    border: '1px solid black',
    fontSize: '13px',
    fontWeight: '600',
    width: '45%',
    height: '39px',
    marginLeft: '-4%'
  },
  signInButton: {
    width: '45%',
    height: '39px',
    fontSize: '13px',
    fontWeight: '600',
    color: theme.palette.primary.light,
    '&:hover': {
      backgroundColor: 'var(--orange)',
    },
    backgroundColor: "rgba(255, 107, 8, 1)",
  }
}));

const StartPage = () => {
  const classes = useStyles();
  const width = document.documentElement.clientWidth;

  return (
    <>
      {
        width <= 700 ?
          (
            <div className={styles.wrapperQuote}>
              <h1 className={styles.quoteTitle}>Books Reading</h1>
              <h2 className={styles.quoteSubtitle}>Допоможе вам</h2>
              <ul className={styles.helpList}>
                <li className={styles.helpListItem}>
                  Швидше сформулювати свою ціль і розпочати читати
              </li>
                <li className={styles.helpListItem}>
                  Пропорційно розподілити навантаження на кожний день
              </li>
                <li className={styles.helpListItem}>Відстежувати особистий успіх</li>
              </ul>

              <h2 className={styles.quoteSubtitle}>Також ви зможете</h2>

              <ul className={styles.canList}>
                <li className={styles.canListItem}>
                  Формувати особисту думку незалежну від інших
              </li>
                <li className={styles.canListItem}>
                  Підвищити свої професійні якості опираючись на нові знання
              </li>
                <li className={styles.canListItem}>Стати цікавим співрозмовником</li>
              </ul>
              <div className={styles.wrapperButton}>

                <Button
                  to="/login"
                  size="large"
                  type="submit"
                  variant="outlined"
                  className={classes.logInButton}
                >
                  <Link to="/login" className={styles.logInLink}>Увійти</Link>
                </Button>



                <Button
                  variant="outlined"
                  size="large"
                  type="submit"
                  className={classes.signInButton}
                >
                  <Link to="/registration" className={styles.signInLink}>Реєстрація</Link>
                </Button>
              </div>
            </div>
          )
          :
          (<Redirect to="/login" />)
      }
    </>
  )
};

export default StartPage;
