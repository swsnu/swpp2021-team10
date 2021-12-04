import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import GenreTag from '../../Components/GenreTag/GenreTag';

class MyPage extends Component {
  onClickAccountSettings = () => {
    const { history } = this.props;
    history.push('/mypage/account_settings/');
  }

  render() {
    const { loggedInUser } = this.props;

    if (!loggedInUser) {
      return <Redirect to="/main" />;
    }

    console.log(loggedInUser.tags);

    const genreTags = () => {
      return loggedInUser.tags.map((tag) => {
        return <GenreTag deletable={false} tagName={tag.name} selected={false} />;
      });
    };

    return (
      <div className="mypage">
        <div id="profile-image-holder">
          {loggedInUser.profile_picture && <img id="register-profile-img" width="250px" src={URL.createObjectURL(this.state.selectedImage)} />}
        </div>
        <h3 id="mypage-username">{loggedInUser.username}</h3>
        <h4 id="mypage-email">{loggedInUser.email}</h4>
        <button id="mypage-account-settings" type="button" onClick={() => this.onClickAccountSettings()}>Account Settings</button>
        { genreTags }
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);
