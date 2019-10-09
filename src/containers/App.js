import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, withRouter } from "react-router-dom";
import { withLocalize } from "react-localize-redux";

import './app.css';

import Routing from '../components/routing/Routing';

/* Containers */
import Login from './login/Login';
import Register from './register/Register';
import HomePage from './homePage/HomePage';

/* Routes */
const HomePageRoute = '/homepage';
const LoginRoute = '/login';
const RegisterRoute = '/register';

class App extends Component {
  state = {}
  render() {
    const { isAuthenticated } = this.props;

    return (
      <div className="App">
        <Switch>
          <Routing
            exact
            path={LoginRoute}
            component={Login}
            isAuthenticated={isAuthenticated}
            type="public"
          />
          <Routing
            exact
            path={RegisterRoute}
            component={Register}
            isAuthenticated={isAuthenticated}
            type="public"
          />
          <Routing
            exact
            path={HomePageRoute}
            component={HomePage}
            isAuthenticated={isAuthenticated}
            type="private"
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
});

export default withRouter(withLocalize(connect(mapStateToProps)(App)));



