/* eslint-disable react/prop-types */
import React from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import RegistrationForm from '../../components/RegistrationForm/ContainerRegistrationForm';
import LoginForm from '../../components/LoginForm/LoginForm.tsx';
// import GoogleButton from '../../components/GoogleButton/GoogleButton';
import styles from './Auth.module.css';
import Quote from '../../components/Quote/Quote';
import QuoteRegistration from '../../components/QuoteRegistration/QuoteRegistration';

const Auth = props => {
  const { pathname } = useLocation();

  return (
    <>
      <div className={styles.mainWrapper}>
        <div
          className={
            pathname === '/registration'
              ? styles.regContainer
              : styles.loginContainer
          }
        >
          <div className={styles.formContainer}>
            {/* <GoogleButton /> */}
            <Switch>
              <Route exact path="/">
                <Redirect to="/login" />
              </Route>
              <Route path="/login" exact component={LoginForm} />
              <Route path="/registration" exact component={RegistrationForm} />
            </Switch>
          </div>
        </div>
        {props.location.pathname === '/login' ? (
          <Quote />
        ) : (
          <QuoteRegistration />
        )}
      </div>
    </>
  );
};

export default Auth;
