import s from './Button.module.css';
import PropTypes from 'prop-types';

export default function Button({ handleClick, text }) {
  return (
    <button className={s.Button} type="button" onClick={handleClick}>
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
