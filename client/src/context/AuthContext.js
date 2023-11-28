import { createContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import api from '../services/api';

const LOGIN_URL = '/v1/users/login';
const REFRESH_URL = '/v1/users/refresh';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem('authTokens') ? jwtDecode(JSON.parse(localStorage.getItem('authTokens')).access_token) : null
  );
  const [loading, setLoading] = useState(true);
  const [refreshingTokens, setRefreshingTokens] = useState(false);
  const [errMsg, setErrMsg] = useState(false);

  const navigate = useNavigate();

  const logoutUser = useCallback(() => {
    setAuthTokens(null);
    setUser(null);
    
    localStorage.removeItem('authTokens');
    
    navigate('/');
  }, [setAuthTokens, setUser, navigate]);

  const refreshToken = useCallback(async () => {
    try {
      console.log("Refreshing token:", authTokens.refresh_token);

      const response = await api.post(REFRESH_URL, {
        refresh_token: authTokens.refresh_token,
      });

      console.log("Token refresh response:", response);

      const { access_token, refresh_token } = response.data.token;

      setAuthTokens({ access_token, refresh_token });
      localStorage.setItem('authTokens', JSON.stringify({ access_token, refresh_token }));

      // Rest of your code
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  }, [authTokens, setAuthTokens]);

  const loginUser = async ({ username, password }) => {
    try {
      const response = await api.post(LOGIN_URL, {
        user_name: username,
        password: password,
      });
      
      if (response.status === 201) {
        const data = response.data.token;

        const { access_token, refresh_token,role,userImage,firstName } = data;
      
        const decodedUser = jwtDecode(access_token);

        setAuthTokens({ access_token, refresh_token });
        setUser({ ...decodedUser, role,userImage,firstName });
        localStorage.setItem('authTokens', JSON.stringify({ access_token, refresh_token }));

        navigate('/dashboard');
      } else {
       const errorMessage = response.data.message; 
        setErrMsg(errorMessage || 'Something went wrong!');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrMsg(error.response.data.message || 'Something went wrong!');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (authTokens) {
        const user = jwtDecode(authTokens.access_token);
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
        console.log(user)
        try {
          if (isExpired && authTokens.refresh_token) {
            if (!refreshingTokens) {
              setRefreshingTokens(true);
              await refreshToken();
              setRefreshingTokens(false);
            }
          } else if (isExpired) {
            console.log('Access token expired. Logging out...');
            logoutUser();
          } else {
            setUser(user);
          }
        } catch (refreshError) {
          console.error('Error during token refresh:', refreshError);
          console.log('Access token expired. Logging out...');
          logoutUser();
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [authTokens, refreshingTokens, refreshToken, logoutUser, navigate]);

  const contextData = {
    user: user,
    authTokens: authTokens,
    setAuthTokens: setAuthTokens,
    setUser: setUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
    errMsg:errMsg
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
