import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
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
      })
      .catch((e) => {});
  };

  checkUsernameDup = () => {
    const { username } = this.state;

    const usernameData = {
      username,
    };

    this.props.dupCheckUsername(usernameData)
      .then(() => {
        this.setState({ usernameDupCheck: true });
      })
      .catch((e) => {});
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
          {this.state.selectedImage && <img id="register-profile-img" width="250px" src={URL.createObjectURL(this.state.selectedImage)} />}
        </div>
        <input type="file" id="input-profile-image" accept=".jpg, .png, .jpeg" name="profile-image" onChange={(event) => { this.setState({ selectedImage: event.target.files[0] }); }} />
        <label id="upload-image-label" htmlFor="input-profile-image">
          Upload Profile Image
        </label>
        <label id="register-email">
          <div id="email-label-text">email</div>
          <input id="register-email-input" type="text" value={this.state.email} onChange={(event) => { this.setState({ email: event.target.value, emailDupCheck: false }); }} />
          <button id="register-dupchk-email-button" onClick={() => this.checkEmailDup()} type="button">check email duplication</button>
          { this.state.emailDupCheck && <img id="register-dupchk-email-img" src="/images/check.png" alt="dupchk-email" width="20px" /> }
        </label>
        <label id="register-username">
          <div id="username-label-text">username</div>
          <input id="register-username-input" type="text" value={this.state.username} onChange={(event) => { this.setState({ username: event.target.value, usernameDupCheck: false }); }} />
          <button id="register-dupchk-username-button" onClick={() => this.checkUsernameDup()} type="button">check username duplication</button>
          { this.state.usernameDupCheck && <img id="register-dupchk-username-img" src="/images/check.png" alt="dupchk-username" width="20px" /> }
        </label>
        <label id="register-password">
          <div id="password-label-text">password</div>
          <input id="register-password-input" type="password" value={this.state.password} onChange={(event) => { this.setState({ password: event.target.value }); }} />
        </label>
        <label id="register-password-check">
          <div id="password-check-label-text">password check</div>
          <input id="register-password-check-input" type="password" value={this.state.passwordCheck} onChange={(event) => { this.setState({ passwordCheck: event.target.value }); }} />
          { this.checkPasswordAccord() && <img id="register-password-accord-img" src="/images/check.png" alt="password-accord" /> }
        </label>
        <h4 id="register-favorite-genres">
          Favorite Genres
        </h4>
        <TagSearchWindow id="search-genre-search-window" onAddTag={this.onAddTag} onDeleteTag={this.onDeleteTag} />
        <br />
        <button id="register-submit-button" onClick={() => this.submitRegisterData()} type="button" disabled={!(this.state.emailDupCheck && this.state.usernameDupCheck && this.checkPasswordAccord())}>submit</button>
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
