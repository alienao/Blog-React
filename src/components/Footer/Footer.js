import './Footer.css';
import PropsTypes from 'prop-types';

export const Footer = ({ year }) => {
  return (
    <footer>
      <span>© React Blog - {year}</span>
    </footer>
  );
};
Footer.propTypes = {
  year: PropsTypes.number,
};
