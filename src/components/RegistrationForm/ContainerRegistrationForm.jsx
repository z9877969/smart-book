import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import RegistrationForm from './RegistrationForm';
import { registration } from '../../services/API';
import validate from '../../utils/validateForFormik';
import withAuthRedirect from '../WithAuthRedirect/WithAuthRedirect';
import withConnectByGoogle from '../../hoc/WithConnectByGoogle';

const ContainerRegistrationForm = () => {
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
        .min(3, 'ПОЛЕ МІСТИТЬ ПОМИЛКУ')
        .max(100, 'ПОЛЕ МІСТИТЬ ПОМИЛКУ')
        .required('НЕОБХІДНО ЗАПОВНИТИ ПОЛЕ'),
      email: Yup.string()
        .email('ПОЛЕ МІСТИТЬ ПОМИЛКУ')
        .required('НЕОБХІДНО ЗАПОВНИТИ ПОЛЕ'),
      password: Yup.string()
        .min(6, 'Пароль має бути не менше 6 символів')
        .max(30, 'Пароль має бути не більше 30 символів')
        .required('НЕОБХІДНО ЗАПОВНИТИ ПОЛЕ'),
      passwordRepeat: Yup.string().required('НЕОБХІДНО ЗАПОВНИТИ ПОЛЕ'),
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
