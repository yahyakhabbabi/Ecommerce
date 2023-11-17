import React, { useRef, useContext } from 'react';
import './login.css';
import AuthContext from '../../../context/AuthContext';

export default function LoginPage() {
  const userRef = useRef();
  const pwdRef = useRef();
  const errRef = useRef();
  const { loginUser, errMsg } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await loginUser({
        username: userRef.current.value,
        password: pwdRef.current.value,
      });
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <section className='body1'>
      <div className="container">
        <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
          {errMsg}
        </p>

        <form onSubmit={handleLogin}>
          <div className="loginInfo">
            <div className="userInput">
              <label>Username</label>
              <input
                type="text"
                required
                className="userName"
                ref={userRef}
              />
            </div>
            <div className="passwordInput">
              <label>Password</label>
              <input
                type="password"
                required
                className="password"
                ref={pwdRef}
              />
            </div>
            <div className="rememberBox">
              {/* Add any additional form elements as needed */}
            </div>
          </div>
          <div className="logFor">
            <button type="submit">LOG IN</button>
          </div>
        </form>
      </div>
    </section>
  );
}
