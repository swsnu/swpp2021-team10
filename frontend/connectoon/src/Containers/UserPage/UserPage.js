import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import GenreTag from '../../Components/GenreTag/GenreTag';
import WorkList from '../../Components/WorkList/WorkList';

import * as actionCreators from '../../store/actions/index';

import './UserPage.css';

class MyPage extends Component {
  componentDidMount() {
    this.props.onGetUser(this.props.match.params.id);
  }

  onClickTag(tagName) {
    this.props.history.push('/search/$' + tagName);
  }

  render() {
    const { selectedUser } = this.props;

    if (selectedUser == null) {
      return <h1>Loading...</h1>;
    }

    const imageContainer = () => {
      if (selectedUser.profile_picture !== null && selectedUser.profile_picture !== '') return <img id="mypage-profile-img" width="250px" src={selectedUser.profile_picture} />;
      else return <img id="userpage-profile-img" width="250px" src="/images/dummyAccountIcon.jpeg" />;
    };

    const genreTags = () => {
      return selectedUser.tags.map((tag) => {
        return <GenreTag key={'setting-genre-tag-' + tag.name} deletable={false} tagName={tag.name} selected={true} onClickTag={() => this.onClickTag(tag.name)} />;
      });
    };

    return (
      <div className="userpage">
        <div id="userpage-profile-image-holder">
          {imageContainer() }
        </div>
        <div id="userpage-userdata-holder">
          <h3 id="userpage-username">{selectedUser.username}</h3>
          <h4 id="userpage-email">{selectedUser.email}</h4>
        </div>
        <div id="userpage-genre-tags-holder">
          { genreTags() }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedUser: state.user.selectedUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetUser: (id) => dispatch(actionCreators.getUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);
