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
          <NavLink onClick={handleLogOut} exact to="/login">
            <MeetingRoomIcon />
            Log Out
          </NavLink>
        </nav>
      ) : (
        'Welcome, stranger!'
      )}
    </header>
  );
};

Header.propTypes = {
  sLoggedIn: PropsTypes.func,
  setIsLoggedIn: PropsTypes.func,
  userName: PropsTypes.string,
};
