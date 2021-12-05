import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import GenreTag from '../../Components/GenreTag/GenreTag';
import WorkList from '../../Components/WorkList/WorkList';

import * as actionCreators from '../../store/actions/index';

class MyPage extends Component {
  componentDidMount() {
    this.props.onGetMyReviews();
  }

  onClickAccountSettings = () => {
    const { history } = this.props;
    history.push('/mypage/account_settings/');
  }

  onClickTag(tagName) {
    this.props.history.push('/search/$' + tagName);
  }

  onClickWork(workId) {
    this.props.history.push('/works/' + String(workId));
  }

  render() {
    const { loggedInUser, myReviews } = this.props;

    if (!loggedInUser) {
      return <Redirect to="/main" />;
    }

    const imageContainer = () => {
      if (loggedInUser.profile_picture != null) return <img id="setting-profile-img" width="250px" src={loggedInUser.profile_picture} />;
      else return <img id="setting-profile-img" width="250px" src="/images/no_image.png" />;
    };

    const genreTags = () => {
      return loggedInUser.tags.map((tag) => {
        return <GenreTag deletable={false} tagName={tag.name} selected={true} onClickTag={() => this.onClickTag(tag.name)} />;
      });
    };

    const myReviewWorkList = () => {
      const reviewedWorkList = myReviews?.map((review) => {
        return {
          id: review.work.id,
          title: review.work.title,
          thumbnail_picture: review.work.thumbnail_picture,
          completion: null,
          platform_id: review.work.platform_id,
          artists: review.work.artists,
          year: review.work.year,
          score_avg: review.score,
        };
      });

      if (!reviewedWorkList) return null;

      return <WorkList
        key="MyReviews"
        className="MyReviewList"
        subject="My Reviews"
        workList={reviewedWorkList}
        workNumInRow={4}
        onClickWork={(workId) => this.onClickWork(workId)}
      />;
    };

    return (
      <div className="mypage">
        <div id="mypage-profile-image-holder">
          {imageContainer() }
        </div>
        <h3 id="mypage-username">{loggedInUser.username}</h3>
        <h4 id="mypage-email">{loggedInUser.email}</h4>
        <button id="mypage-account-settings" type="button" onClick={() => this.onClickAccountSettings()}>Account Settings</button>
        { genreTags() }
        { myReviewWorkList() }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    myReviews: state.review.reviews,
    loggedInUser: state.user.loggedInUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetMyReviews: () => dispatch(actionCreators.getMyReviews()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);
