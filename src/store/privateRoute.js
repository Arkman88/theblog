import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { message } from 'antd';

const PrivateRoute = ({ children, isAuthenticated }) => {
  useEffect(() => {
    if (!isAuthenticated) {
      message.warning('You need to be logged in to access this page.');
    }
  }, [isAuthenticated]);

  return isAuthenticated ? children : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
