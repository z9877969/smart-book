/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import withAuthRedirect from '../WithAuthRedirect/WithAuthRedirect';
import { login } from '../../services/API';
import styles from './LoginForm.module.css';
import CustomButton from '../../shared-ui/CustomButton/CustomButton';
import withConnectByGoogle from '../../hoc/WithConnectByGoogle';

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

  passwordInput: {
    '& label.Mui-focused': {
      color: 'var(--orangey-red)',
    },
    borderRadius: 3,
    width: '100%',
    borderBottomColor: 'var(--orangey-red)',
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: 600,
    backgroundColor: 'var(--pale-grey)',
    letterSpacing: 0.5,
    marginBottom: 20,
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('ПОЛЕ МІСТИТЬ ПОМИЛКУ')
        .required('НЕОБХІДНО ЗАПОВНИТИ ПОЛЕ'),
      password: Yup.string()
        .min(6, 'Пароль має бути не менше 6 символів')
        .max(30, 'Пароль не може містити більше 30 символів')
        .matches(/^(?![.]|-)/, 'ПОЛЕ МІСТИТЬ ПОМИЛКУ') // ? - если, ! - не
        .matches(/^\S*$/, 'ПОЛЕ МІСТИТЬ ПОМИЛКУ')
        .required("Password обов'язкове поле"),
    }),
    onSubmit: values => {
      JSON.stringify(values, null, 2);
      const credential = {
        email: values.email,
        password: values.password,
      };
      dispatch(login(credential));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <label className={styles.label} htmlFor="email">
        <p className={styles.emailText}>Електронна адреса</p>
        <TextField
          id="custom-css-outlined-input"
          {...formik.getFieldProps('email')}
          type="email"
          variant="filled"
          className={classes.emailInput}
          label="your@email.com"
        />
      </label>
      {formik.touched.email && formik.errors.email ? (
        <span className={styles.emailError}>{formik.errors.email}</span>
      ) : null}
      <label className={styles.label} htmlFor="password">
        <p className={styles.passwordText}>Пароль</p>
        <TextField
          id="custom-css-outlined-input"
          {...formik.getFieldProps('password')}
          type="password"
          variant="filled"
          className={classes.passwordInput}
          label="Password"
        />
      </label>
      {formik.touched.password && formik.errors.password ? (
        <span className={styles.passwordError}>{formik.errors.password}</span>
      ) : null}
      <CustomButton
        size="large"
        type="submit"
        variant="contained"
        className={styles.logInButton}
      >
        Увійти
      </CustomButton>
      <Link to="/registration" className={styles.singInLink}>
        Реєстрація
      </Link>
    </form>
  );
};

export default withConnectByGoogle(withAuthRedirect(LoginPage));
