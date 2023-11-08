import React, { useRef, useState, useEffect, useContext } from 'react'
import AuthContext from '../../../context/AuthProvider'
import './LoginPage.css'
import axios from '../../../services/api'
const LOGIN_URL = '/v1/users/login';




export default function LoginPage() {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [user, password])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL,
        JSON.stringify({ user_name:user, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      console.log(JSON.stringify(response?.data));
      console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, password, roles, accessToken});
      setUser('');
      setPassword('');
      setSuccess(true);

    } catch (error) {
      if(!error?.response){
        setErrMsg('No Server Response');
      }else if (error.response?.status === 400){
        setErrMsg('Missing Username or Password');
      }else if (error.response?.status === 401){
        setErrMsg('Unauthorized');
      } else{
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
      }
    }


  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in !</h1>
        </section>
      ) : (
        <section className='container'>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live='assertive'>{errMsg}</p>
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
                  onChange={(e) => setPassword(e.target.value)}
                  value={password} />

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
    </>
  )
}
