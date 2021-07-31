import { useState } from 'react';
import './LoginPage.css';
import PropsTypes from 'prop-types';

export const LoginPage = ({ setIsLoggedIn, history, setUserName }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginChange = (event) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogIn = (event) => {
    event.preventDefault();

    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('userName', login);

    setUserName(login);
    setIsLoggedIn(true);
    history.push('/');
  };

  return (
    <h1>
      <form className="loginForm" onSubmit={handleLogIn}>
        <h2>Log In</h2>
        <div>
          <input
            className="loginFormInput"
            type="text"
            placeholder="Name..."
            onChange={handleLoginChange}
            required
          />
        </div>
        <div>
          <input
            className="loginFormInput"
            type="password"
            placeholder="Password"
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div>
          <button className="greyBtn" type="submit">
            Log In
          </button>
        </div>
      </form>
    </h1>
  );
};

LoginPage.propTypes = {
  setIsLoggedIn: PropsTypes.func,
  history: PropsTypes.object,
  setUserName: PropsTypes.func,
};
