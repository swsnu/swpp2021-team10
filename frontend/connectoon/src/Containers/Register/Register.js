import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { toast } from 'react-toastify';

import TagSearchWindow from '../TagSearchWindow/TagSearchWindow';

import * as actionCreators from '../../store/actions/index';

import './Register.css';

class Register extends Component {
  state = {
    email: '',
    username: '',
    password: '',
    passwordCheck: '',
    tags: [],
    emailDupCheck: false,
    usernameDupCheck: false,
    passwordAccord: false,
    selectedImage: null,
  };

  componentDidMount() {
    this.props.onToken();
  }

  checkPasswordAccord = () => {
    const { password } = this.state;
    const { passwordCheck } = this.state;

    return (password.length >= 6 && password === passwordCheck);
  };

  checkEmailDup = () => {
    const { email } = this.state;

    const emailData = {
      email,
    };

    this.props.dupCheckEmail(emailData)
      .then(() => {
        this.setState({ emailDupCheck: true });
        toast('Email duplication has checked!');
      })
      .catch((e) => {
        toast('There is duplicated email!');
      });
  };

  checkUsernameDup = () => {
    const { username } = this.state;

    const usernameData = {
      username,
    };

    this.props.dupCheckUsername(usernameData)
      .then(() => {
        this.setState({ usernameDupCheck: true });
        toast('Username duplication has checked!');
      })
      .catch((e) => {
        toast('There is duplicated username!');
      });
  };

  onAddTag = (tagName) => {
    const { tags } = this.state;

    tags.push(tagName);
    this.setState({ tags });
  };

  onDeleteTag = (tagName) => {
    const { tags } = this.state;

    for (let i = 0; i < tags.length; i += 1) {
      if (tags[i] === tagName) {
        tags.splice(i, 1);
      }
    }

    this.setState({ tags });
  }

  submitRegisterData = () => {
    let emailString = '';
    let usernameString = '';
    let passwordString = '';
    if (!this.state.emailDupCheck) emailString += 'You should check email duplication!\n';
    if (!this.state.usernameDupCheck) usernameString += 'You should check username duplication!\n';
    if (!this.checkPasswordAccord()) passwordString += 'You should match password and password check with guide!\n';

    if (emailString) toast(emailString);
    if (usernameString) toast(usernameString);
    if (passwordString) toast(passwordString);

    if (emailString || usernameString || passwordString) {
      return;
    }

    const {
      email, username, password, selectedImage, tags,
    } = this.state;

    const registerData = {
      email,
      username,
      password,
      image: selectedImage,
      tags,
    };

    this.props.onRegister(registerData);
  }

  render() {
    if (this.props.loggedInUser) {
      return <Redirect to="/main" />;
    }

    return (
      <div className="register-page">
        <div id="profile-image-holder">
          {this.state.selectedImage && <img id="register-profile-img" src={URL.createObjectURL(this.state.selectedImage)} />}
        </div>
        <input type="file" id="input-profile-image" accept=".jpg, .png, .jpeg" name="profile-image" onChange={(event) => { this.setState({ selectedImage: event.target.files[0] }); }} />
        <label id="upload-image-label" htmlFor="input-profile-image">
          Upload Profile Image
        </label>
        <div id="register-userdata-holder">
          <label id="register-email">
            <div id="register-email-label-text">email</div>
            <input id="register-email-input" type="text" value={this.state.email} onChange={(event) => { this.setState({ email: event.target.value, emailDupCheck: false }); }} />
            <button id="register-dupchk-email-button" onClick={() => this.checkEmailDup()} type="button">check email duplication</button>
            { this.state.emailDupCheck && <img id="register-dupchk-email-img" src="/images/check.png" alt="dupchk-email" width="20px" /> }
          </label>
          <label id="register-username">
            <div id="register-username-label-text">username</div>
            <input id="register-username-input" type="text" value={this.state.username} onChange={(event) => { this.setState({ username: event.target.value, usernameDupCheck: false }); }} />
            <button id="register-dupchk-username-button" onClick={() => this.checkUsernameDup()} type="button">check username duplication</button>
            { this.state.usernameDupCheck && <img id="register-dupchk-username-img" src="/images/check.png" alt="dupchk-username" width="20px" /> }
          </label>
          <label id="register-password">
            <div id="register-password-label-text">password</div>
            <input id="register-password-input" type="password" value={this.state.password} onChange={(event) => { this.setState({ password: event.target.value }); }} />
          </label>
          <label id="register-password-check">
            <div id="register-password-check-label-text">password check</div>
            <input id="register-password-check-input" type="password" value={this.state.passwordCheck} onChange={(event) => { this.setState({ passwordCheck: event.target.value }); }} />
            { this.checkPasswordAccord() && <img id="register-password-accord-img" src="/images/check.png" alt="password-accord" /> }
          </label>
        </div>
        <div id="register-fav-genre-holder">
          <h4 id="register-favorite-genres">
            Favorite Genres
          </h4>
          <TagSearchWindow id="search-genre-search-window" onAddTag={this.onAddTag} onDeleteTag={this.onDeleteTag} defaultTag={[]} />
        </div>
        <br />
        <button id="register-submit-button" onClick={() => this.submitRegisterData()} type="button">submit</button>
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
    onToken: () => dispatch(actionCreators.token()),
    onRegister: (registerData) => dispatch(actionCreators.register(registerData)),
    dupCheckEmail: (emailData) => dispatch(actionCreators.dupCheckEmail(emailData)),
    dupCheckUsername: (usernameData) => dispatch(actionCreators.dupCheckUsername(usernameData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
