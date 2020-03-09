import React from 'react';
import { useSelector } from 'react-redux';
import Loader from './Loader';

// interfaces

interface State {
  loader?: boolean;
}

const LoaderContainer: React.FC | any = () => {
  const isLoader = useSelector((state: State) => state.loader);
  return isLoader === true && <Loader />;
};

export default LoaderContainer;
