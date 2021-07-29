import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import PropsTypes from 'prop-types';

export const Header = ({ isLoggedIn, setIsLoggedIn, userName }) => {
  const handleLogOut = () => {
    localStorage.setItem('isLoggedIn', false);
    setIsLoggedIn(false);
  };

  return (
    <header className={styles.mainHeader}>
      {isLoggedIn ? (
        <nav>
          Welcome, &nbsp;<strong>{userName}</strong>
          <NavLink onClick={handleLogOut} exact to="/">
            <MeetingRoomIcon />
            Log Out
          </NavLink>
        </nav>
      ) : (
        <nav>
          'Welcome, stranger!'
          <NavLink exact to="/login">
            Login
          </NavLink>
        </nav>
      )}
    </header>
  );
};

Header.propTypes = {
  sLoggedIn: PropsTypes.func,
  setIsLoggedIn: PropsTypes.func,
  userName: PropsTypes.string,
};
