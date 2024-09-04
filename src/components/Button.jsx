import PropTypes from 'prop-types';

export default function Button({ children, className = '', onClick = () => {} }) {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
