import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const PrivateRoute = ({ children }: any) => {
  const accessToken = Cookies.get('accessToken');

  if (!accessToken) {
    return <Navigate to="/sign-in" />;
  }

  return <>{children}</>;
};
