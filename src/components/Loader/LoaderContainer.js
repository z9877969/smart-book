import React from 'react';
import { useSelector } from 'react-redux';
import Loader from './Loader';

const LoaderContainer = () => {
  const isLoader = useSelector(state => state.loader);

  return isLoader === true && <Loader />;
};

export default LoaderContainer;
