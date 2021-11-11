import PropTypes from 'prop-types';

export default function Page({ children }) {
  return (
    <div>
      page template
      {children}
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
};
