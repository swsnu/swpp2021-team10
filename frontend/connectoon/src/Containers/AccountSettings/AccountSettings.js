import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import TagSearchWindow from '../TagSearchWindow/TagSearchWindow';

import * as actionCreators from '../../store/actions/index';

class AccountSettings extends Component {
  state = {
    email: '',
    origUsername: '',
    username: '',
    password: '',
    passwordCheck: '',
    tags: [],
    gotTags: [],
    tagGotCheck: false,
    usernameDupCheck: true,
    passwordAccord: false,
    gotImage: null,
    selectedImage: null,
  };

  componentDidMount() {
    this.props.onToken();
    const { loggedInUser } = this.props;
    if (loggedInUser) {
      this.setState(
        {
          email: loggedInUser.email,
          username: loggedInUser.username,
          origUsername: loggedInUser.username,
          gotImage: loggedInUser.profile_picture,
          gotTags: loggedInUser.tags,
          tagGotCheck: true,
        },
      );
    }
  }

  checkPasswordAccord = () => {
    const { password } = this.state;
    const { passwordCheck } = this.state;

    return (password.length >= 6 && password === passwordCheck);
  };

  checkUsernameDup = () => {
    const { username } = this.state;

    const usernameData = {
      username,
    };

    if (username === this.state.origUsername) {
      this.setState({ usernameDupCheck: true });
      return;
    }

    this.props.dupCheckUsername(usernameData)
      .then(() => {
        this.setState({ usernameDupCheck: true });
      })
      .catch((e) => { this.setState({ usernameDupCheck: false }); });
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

  submitEditData = () => {
    const {
      username, password, selectedImage, tags,
    } = this.state;

    const userData = {
      username,
      password,
      image: selectedImage,
      tags,
    };

    this.props.onEditMyUser(userData);
  }

  render() {
    const { loggedInUser } = this.props;

    if (!loggedInUser) {
      return <Redirect to="/main" />;
    }

    const imageContainer = () => {
      if (this.state.selectedImage != null) return <img id="setting-profile-img" width="250px" src={URL.createObjectURL(this.state.selectedImage)} />;
      else if (this.state.gotImage != null) return <img id="setting-profile-img" width="250px" src={this.state.gotImage} />;
      else return <img id="setting-profile-img" width="250px" src="/images/no_image.png" />;
    };

    return (
      <div className="setting-page">
        <div id="setting-profile-image-holder">
          { imageContainer() }
        </div>
        <input type="file" id="setting-input-profile-image" accept=".jpg, .png, .jpeg" name="profile-image" onChange={(event) => { this.setState({ selectedImage: event.target.files[0] }); }} />
        <label id="setting-upload-image-label" htmlFor="setting-input-profile-image">
          Upload Profile Image
        </label>
        <label id="setting-email">
          <div id="setting-email-label-text">email</div>
          <div id="setting-email-text">
            { this.state.email }
          </div>
        </label>
        <label id="setting-username">
          <div id="setting-username-label-text">username</div>
          <input id="setting-username-input" type="text" value={this.state.username} onChange={(event) => { this.setState({ username: event.target.value, usernameDupCheck: false }); }} />
          <button id="setting-dupchk-button" onClick={() => this.checkUsernameDup()} type="button">check username duplication</button>
          { this.state.usernameDupCheck && <img id="setting-dupchk-username-img" src="/images/check.png" alt="dupchk-username" width="20px" /> }
        </label>
        <label id="setting-password">
          <div id="password-label-text">password</div>
          <input id="setting-password-input" type="password" value={this.state.password} onChange={(event) => { this.setState({ password: event.target.value }); }} />
        </label>
        <label id="setting-password-check">
          <div id="password-check-label-text">password check</div>
          <input id="setting-password-check-input" type="password" value={this.state.passwordCheck} onChange={(event) => { this.setState({ passwordCheck: event.target.value }); }} />
          { this.checkPasswordAccord() && <img id="setting-password-accord-img" src="/images/check.png" alt="password-accord" /> }
        </label>
        <h4 id="setting-favorite-genres">
          Favorite Genres
        </h4>
        {this.state.tagGotCheck && <TagSearchWindow id="search-genre-search-window" onAddTag={this.onAddTag} onDeleteTag={this.onDeleteTag} defaultTag={this.state.gotTags} /> }
        <br />
        <button id="setting-submit-button" onClick={() => this.submitEditData()} type="button" disabled={!(this.state.usernameDupCheck && this.checkPasswordAccord())}>submit</button>
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
    dupCheckUsername: (usernameData) => dispatch(actionCreators.dupCheckUsername(usernameData)),
    onEditMyUser: (userData) => dispatch(actionCreators.editMyUser(userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings);
