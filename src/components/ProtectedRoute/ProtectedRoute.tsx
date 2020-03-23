import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

// interfaces
interface MyProps {
  component: typeof React.Component;
  redirectTo?: string;
}
interface State {
  session: { authenticated?: boolean };
}

const ProtectedRoute: React.FC<MyProps> = ({
  component: Component,
  redirectTo,
  ...rest
}) => {
  const authenticated = useSelector(
    (state: State) => state.session.authenticated,
  );
  return (
    <Route
      {...rest}
      render={props =>
        authenticated ? <Component {...props} /> : <Redirect to={redirectTo} />
      }
    />
  );
};

export default ProtectedRoute;
