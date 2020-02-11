import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { useFormik } from 'formik';

import RegistrationForm from './RegistrationForm';
import { registration } from '../../services/API';
import validate from '../../utils/validateForFormik';
import withAuthRedirect from '../WithAuthRedirect/WithAuthRedirect';
import withConnectByGoogle from '../../hoc/WithConnectByGoogle';

const ContainerRegistrationForm = props => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      userName: '',
      email: '',
      password: '',
      passwordRepeat: '',
    },
    validate,
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
