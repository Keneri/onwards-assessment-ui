import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Form, Input, Button, Icon, Alert, Divider } from "antd";

import Logo from '../../components/logo/Logo';
import "./login.css";

import { userSetAuthentication, userLogin } from "../../modules/user";


const { Item } = Form;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      message: null
    };
  }

  goToRegister() {
    this.props.history.push("/register");
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.props.form.validateFields((err, values) => {
      if (!emailRegex.test(values.email.toLowerCase())) {
        this.setState({ message: "Invalid Email!" });
      } else if (values.password.length > 16 || values.password.length < 5) {
        this.setState({ message: "Password must be between 5 to 16 characters!" });
      } else if (!err) {
        this.setState({ loading: true });
        this.props.userLogin(values).then(
          (res) => {
            this.setState({ loading: false });
            window.scrollTo(0, 0);
          },
          (err) => {
            this.setState({ loading: false });
            this.setState({ message: "Incorrect email/password!" });
          }
        );
      }
    });
  }

  render() {
    const { message } = this.state;
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="login-container">
        <div className="login-logo-container">
          <Logo />
        </div>
        <div className="login-title-container">
          <div className="login-title">
            <span>VIDEO MANAGEMENT AND INTEGRATED SUPPORT SYSTEM</span>
          </div>
        </div>
        <div className="login-form-content">
          <Form onSubmit={this.handleSubmit} className="login-form">
            {message ?
              <Alert
                message={message}
                type="error"
                style={{ marginBottom: "20px" }}
                showIcon
              />
              : ''}
            <Item>
              {getFieldDecorator("email")(
                <Input
                  className="login-input"
                  autoCapitalize="off"
                  placeholder="Email"
                />
              )}
            </Item>
            <Item>
              {getFieldDecorator("password")(
                <Input
                  className="login-input"
                  autoCapitalize="off"
                  placeholder="Password"
                  type="password"
                />
              )}
            </Item>
            <Item style={{ marginTop: "10px" }}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-button"
              >
                <Icon
                  type="lock"
                  style={{ color: "#F0F0F0" }}
                />
                LOGIN
              </Button>
            </Item>
            <Item>
              <div>
                <a style={{ color: "grey", float: "left" }} onClick={() => this.goToRegister()}>Register</a>
                <a style={{ color: "grey", float: "right" }}>Forgot Password?</a>
              </div>
            </Item>
            <Divider style={{ backgroundColor: "grey", color: "grey" }} />
            <span style={{ color: "grey" }}>Copyright © 2018 Onwards Media Group Pte Ltd</span>
          </Form>
        </div>
      </div >
    );
  }
}

const WrappedLogin = Form.create()(Login);

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      userSetAuthentication,
      userLogin
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedLogin);