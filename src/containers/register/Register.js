import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Form, Input, Button, Icon, Alert, Divider } from "antd";

import Logo from '../../components/logo/Logo';
import "./register.css";

import { userRegister } from "../../modules/user";


const { Item } = Form;

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      message: null
    };
  }

  goToLogin() {
    this.props.history.push("/login");
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (values.password !== values.confirmPassword) {
        this.setState({ message: "Passwords do not match!" });
      } else if (values.password.length > 16 || values.password.length < 5) {
        this.setState({ message: "Passwords must be between 5 to 16 characters!" });
      } else if (!err) {
        this.setState({ loading: true });
        this.props.userRegister(values).then(
          (res) => {
            this.setState({ loading: false, message: null });

            window.scrollTo(0, 0);
            this.props.history.push("/login");
          },
          (err) => {
            this.setState({ loading: false, message: "Email is already in use!" });
          }
        );
      }
    });
  }

  render() {
    const { message } = this.state;
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="register-container">
        <div className="register-logo-container">
          <Logo />
        </div>
        <div className="register-title-container">
          <div className="register-title">
            <span>VIDEO MANAGEMENT AND INTEGRATED SUPPORT SYSTEM</span>
          </div>
        </div>
        <div className="register-form-content">
          <Form onSubmit={this.handleSubmit} className="register-form">
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
                  className="register-input"
                  autoCapitalize="off"
                  placeholder="Email"
                />
              )}
            </Item>
            <Item>
              {getFieldDecorator("password")(
                <Input
                  className="register-input"
                  autoCapitalize="off"
                  placeholder="Password"
                  type="password"
                />
              )}
            </Item>
            <Item>
              {getFieldDecorator("confirmPassword")(
                <Input
                  className="register-input"
                  autoCapitalize="off"
                  placeholder="Confirm Password"
                  type="password"
                />
              )}
            </Item>
            <Item style={{ marginTop: "10px" }}>
              <Button
                type="primary"
                htmlType="submit"
                className="register-button"
              >
                <Icon
                  type="user"
                  style={{ color: "#F0F0F0" }}
                />
                REGISTER
              </Button>
            </Item>
            <Item>
              <div>
                <a style={{ color: "grey", float: "left" }} onClick={() => this.goToLogin()}>Login</a>
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

const WrappedRegister = Form.create()(Register);

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      userRegister
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedRegister);