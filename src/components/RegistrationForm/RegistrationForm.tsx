/* eslint-disable react/prop-types */
import React, { useEffect, ChangeEvent, FormEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';
import CustomButton from '../../shared-ui/CustomButton/CustomButton';

import css from './RegistrationForm.module.css';

const useStyles = makeStyles(() => ({
  emailInput: {
    '& label.Mui-focused': {
      color: 'var(--orangey-red)',
    },
    borderRadius: 3,
    width: '100%',
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: 600,
    backgroundColor: 'var(--pale-grey)',
    letterSpacing: 0.5,
  },
}));

//interfaces
interface MyProps {
  formik: any;
  onChange: (eventOrPath: string | ChangeEvent<any>) => void;
  onSubmit: (e?: FormEvent<HTMLFormElement> | undefined) => void;
  onBlur: (eventOrString: any) => void | ((e: any) => void);
  userName: string;
  email: string;
  password: string;
  passwordRepeat: string;
}

const FormOfRegistration: React.FC<MyProps> = ({
  formik,
  onChange,
  onSubmit,
  onBlur,
  userName,
  email,
  password,
  passwordRepeat,
}) => {
  const classes = useStyles();

  // adding a count of entered symbols
  useEffect(() => {
    const MAX_LENGTH = '30';
    const passwordField = document.querySelector('input[name="password"]');
    if (!passwordField) return;
    passwordField.setAttribute('maxLength', MAX_LENGTH);
    const passwordFieldRepeat = document.querySelector(
      'input[name="passwordRepeat"]',
    );
    if (!passwordFieldRepeat) return;
    passwordFieldRepeat.setAttribute('maxLength', MAX_LENGTH);
  }, []);

  return (
    <form onSubmit={onSubmit} className={css.form}>
      <label className={css.label} htmlFor="userName">
        <h2>
          Ім&apos;я <span>*</span>
        </h2>

        <TextField
          type="input"
          id="userName"
          name="userName"
          value={userName}
          variant="filled"
          className={classes.emailInput}
          label="Enter your name"
          onChange={onChange}
          onBlur={onBlur}
        />
        {formik.errors.userName && formik.touched.userName ? (
          <div className={css.nameError}>{formik.errors.userName}</div>
        ) : null}
      </label>

      <label className={css.label} htmlFor="email">
        <h2>
          Електронна адреса <span>*</span>
        </h2>

        <TextField
          id="email"
          {...formik.getFieldProps('email')}
          name="email"
          value={email}
          type="email"
          variant="filled"
          className={classes.emailInput}
          label="your@email.com"
          onChange={onChange}
          onBlur={onBlur}
        />

        {formik.errors.email && formik.touched.email ? (
          <div className={css.emailError}>{formik.errors.email}</div>
        ) : null}
      </label>
      <label className={css.label} htmlFor="password">
        <h2>
          Пароль <span>*</span>
        </h2>

        <TextField
          type="custom-css-outlined-input"
          {...formik.getFieldProps('password')}
          id="password"
          name="password"
          value={password}
          variant="filled"
          className={classes.emailInput}
          label="Enter your password"
          onChange={onChange}
          onBlur={onBlur}
        />
        {formik.errors.password && formik.touched.password ? (
          <div className={css.passwordError}>{formik.errors.password}</div>
        ) : null}
      </label>
      <label className={css.label} htmlFor="passwordRepeat">
        <h2>
          Підтвердити пароль <span>*</span>
        </h2>

        <TextField
          type="password"
          id="passwordRepeat"
          {...formik.getFieldProps('password')}
          name="passwordRepeat"
          value={passwordRepeat}
          variant="filled"
          className={classes.emailInput}
          label="Enter your password again"
          onChange={onChange}
          onBlur={onBlur}
        />
        {formik.errors.passwordRepeat && formik.touched.passwordRepeat ? (
          <div className={css.repeatPasswordError}>
            {formik.errors.passwordRepeat}
          </div>
        ) : null}
      </label>
      <CustomButton
        size="large"
        type="submit"
        variant="contained"
        className={css.logInButton}
        // color="var(--rusty-orange)"
        color="primary"
      >
        Зареєструватися
      </CustomButton>
      <p>
        <span>Вже з нами? </span>
        <Link to="/login" className={css.link}>
          Увійти
        </Link>
      </p>
    </form>
  );
};

export default FormOfRegistration;
