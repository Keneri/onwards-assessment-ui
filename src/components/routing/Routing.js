import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const LoginRoute = '/login';

const Routing = ({ component: Component, isAuthenticated, type, ...rest }) => (
  <Route
    {...rest}

    render={props => (isAuthenticated ?
      (type === 'private') ? <Component {...props} /> : <Redirect to="/homepage" />
      :
      (type === 'private') ? <Redirect to={LoginRoute} /> : <Component {...props} />
    )}
  />
);

Routing.propTypes = {
  component: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

Routing.defaultProps = {
  component: () => { },
  type: 'public',
  isAuthenticated: false
};

export default Routing;