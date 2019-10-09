import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Button } from "antd";

import "./homePage.css"

import { userLogout } from '../../modules/user';

class HomePage extends Component {
  state = {}
  handleLogout() {
    window.scrollTo(0, 0);
    this.props.userLogout();
    this.props.history.push('/login');
  }

  render() {
    const { userProfile } = this.props;

    return (
      <div>
        <div style={{ margin: 50 }}>
          <span>Welcome {userProfile.user.email}!</span>
        </div>
        <div style={{ margin: 50 }}>
          <Button onClick={() => this.handleLogout()}>Logout</Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userProfile: state.user.userProfile
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      userLogout
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
