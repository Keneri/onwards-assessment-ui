import React from "react";
import PropTypes from "prop-types";

import OnwardsLogo from "../../static/logo.png";

import "./logo.css";

const Logo = props => (
  <img src={OnwardsLogo} className={`logo logo${props.type}`} alt="App Logo" />
);

Logo.propTypes = {
  type: PropTypes.string
};

Logo.defaultProps = {
  type: ""
};

export default Logo;
