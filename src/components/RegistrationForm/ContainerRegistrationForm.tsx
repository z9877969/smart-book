import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import RegistrationForm from './RegistrationForm';
import { registration } from '../../services/API';
import withAuthRedirect from '../WithAuthRedirect/WithAuthRedirect';
import withConnectByGoogle from '../../hoc/WithConnectByGoogle';

const ContainerRegistrationForm: React.FC = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      userName: '',
      email: '',
      password: '',
      passwordRepeat: '',
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .matches(
          /(^[a-zA-Z|a-zA-Z0-9]{3,100}$)|([^\s]+(\s.*))/,
          'ПОЛЕ МІСТИТЬ ПОМИЛКУ',
        )
        .required('НЕОБХІДНО ЗАПОВНИТИ ПОЛЕ'),
      email: Yup.string()
        .email('ПОЛЕ МІСТИТЬ ПОМИЛКУ')
        .matches(/^.{2,}[@]/, 'ПОЛЕ МІСТИТЬ ПОМИЛКУ')
        .required('НЕОБХІДНО ЗАПОВНИТИ ПОЛЕ'),
      password: Yup.string()
        .min(5, 'Пароль має бути не менше 5 символів')
        .max(30, 'Пароль не може містити більше 30 символів')
        .matches(/^(?![.]|-)/, 'ПОЛЕ МІСТИТЬ ПОМИЛКУ') // ? - если, ! - не
        .matches(/^[a-zA-Z|a-zA-Z0-9].*$/, 'ПОЛЕ МІСТИТЬ ПОМИЛКУ')
        .matches(/^\S*$/, 'ПОЛЕ МІСТИТЬ ПОМИЛКУ')
        .required('НЕОБХІДНО ЗАПОВНИТИ ПОЛЕ'),
      passwordRepeat: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Паролі не співпадають')
        .required('НЕОБХІДНО ЗАПОВНИТИ ПОЛЕ'),
    }),
    // validate,
    onSubmit: values => {
      JSON.stringify(values, null, 4);
      const userRequest = {
        name: {
          fullName: formik.values.userName,
        },
        email: formik.values.email,
        password: formik.values.password,
      };

      dispatch(registration(userRequest));
    },
  });

  return (
    <RegistrationForm
      formik={formik}
      userName={formik.values.userName}
      email={formik.values.email}
      password={formik.values.password}
      passwordRepeat={formik.values.passwordRepeat}
      onChange={formik.handleChange}
      onSubmit={formik.handleSubmit}
      onBlur={formik.handleBlur}
    />
  );
};

export default withConnectByGoogle(withAuthRedirect(ContainerRegistrationForm));
