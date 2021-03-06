import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

import './Login.css';

import * as actionCreators from '../../store/actions/index';

class Login extends Component {
  state = {
    email: '',
    password: '',
  }

  componentDidMount() {
    this.props.onToken();
  }

  onClickSubmit() {
    const { email, password } = this.state;
    const loginData = { email, password };
    this.props.onLogin(loginData);
  }

  render() {
    if (this.props.loggedInUser) {
      return <Redirect to="/main" />;
    }

    return (
      <div className="login-page">
        <div className="login-page-container">
          <label id="login-email">
            <div id="email-label-text">email</div>
            <input id="login-email-input" type="email" value={this.state.email} onChange={(event) => this.setState({ email: event.target.value })} />
          </label>
          <label id="login-password">
            <div id="password-label-text">password</div>
            <input id="login-password-input" type="password" value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} />
          </label>
          <div className="login-button-div">
            <button id="login-submit-button" type="button" onClick={() => this.onClickSubmit()}>submit</button>
            <br />
            <Link id="login-register-link" to="/register">register</Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.user.loggedInUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (loginData) => dispatch(actionCreators.logIn(loginData)),
    onToken: () => dispatch(actionCreators.token()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
