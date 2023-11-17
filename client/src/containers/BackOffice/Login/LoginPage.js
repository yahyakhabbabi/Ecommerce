import React, { useState, useRef, useEffect} from 'react';
import './login.css';
import useAuth from '../../../hooks/useAuth';
import axios from '../../../services/api';
import {Link,useNavigate,useLocation} from "react-router-dom"

const LOGIN_URL = '/v1/users/login';

export default function LoginPage() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [ErrMsg, setErrMsg] = useState('');


  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL, {
        user_name: user,
        password: pwd,
      });

      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser('');
      setPwd('');
     navigate(from,{replace:true});
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No server response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing username or password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login failed');
      }
      errRef.current.focus();
    }
  }

  return (
 
    <section className='container'>
    <p ref={errRef} className={ErrMsg ? "errmsg" : "offscreen"} aria-live='assertive'>{ErrMsg}</p>
    <form onSubmit={handleSubmit}>
      <div className="loginInfo">
        <div className="userInput">
          <label>Username</label>
          <input type="text" required
            className="userName"
            ref={userRef}
            onChange={(e) => setUser(e.target.value)}
            value={user} />
        </div>
        <div className="passwordInput">
          <label>Password</label>
          <input type="password" required className="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd} />

        </div>
        <div className="rememberBox">
          <input type="checkbox" id="rememberMe" name="rememberMe" />
          <label htmlFor="rememberMe">Remember Me</label>
        </div>
      </div>
      <div className="logFor">
        <a href="forgot_password.html" className="forPass">Forgot Your Password?</a>
        <button>LOG IN</button>
      </div>
    </form>
  </section>
      )}


