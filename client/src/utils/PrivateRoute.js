// PrivateRoute.js
import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext'; 

const PrivateRoutes = () => {
  const { authTokens } = useContext(AuthContext);

  return (
    authTokens?<Outlet/>:<Navigate to='/'/>
  );
};

export default PrivateRoutes;
