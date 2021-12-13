import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import GenreTag from '../../Components/GenreTag/GenreTag';
import WorkList from '../../Components/WorkList/WorkList';

import * as actionCreators from '../../store/actions/index';

import './MyPage.css';

class MyPage extends Component {
  constructor(props) {
    super(props);
    let subjectRows;
    const worksInRow = 4;
    const rowIncrement = 2;
    const pageRowIncrement = 5;
    if (this.props.location.state) {
      subjectRows = this.props.location.state.subjectRows;
    } else {
      subjectRows = [1];
    }
    const requestReviews = subjectRows.map((rows) => { return [0, worksInRow * (rows + pageRowIncrement)]; });
    this.state = {
      subjectRows, requestReviews, worksInRow, rowIncrement, pageRowIncrement,
    };
  }

  componentDidMount() {
    this.props.onGetMyReviews(this.state.requestReviews);
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

  onClickMore = (listId) => {
    const {
      subjectRows, requestReviews, worksInRow, rowIncrement, pageRowIncrement,
    } = this.state;
    subjectRows[listId] += rowIncrement;
    const newRequestReviews = [];
    let fetchMore = false;
    requestReviews.forEach((requestReview, idx) => {
      if (worksInRow * (subjectRows[idx] + rowIncrement) >= requestReview[1]) {
        fetchMore = true;
        newRequestReviews.push([requestReview[1], requestReview[1] + worksInRow * pageRowIncrement]);
      } else {
        newRequestReviews.push([requestReview[1], requestReview[1]]);
      }
    });
    this.setState({ subjectRows, requestReviews: newRequestReviews });
    if (fetchMore) {
      this.props.onGetMyReviews(newRequestReviews);
    }
    const { history } = this.props;
    history.replace(history.location.pathname, { subjectRows });
  }

  render() {
    const { loggedInUser, myReviews } = this.props;
    const { subjectRows, worksInRow } = this.state;

    if (!loggedInUser) {
      return <Redirect to="/main" />;
    }

    const imageContainer = () => {
      if (loggedInUser.profile_picture != null) return <img id="mypage-profile-img" width="250px" src={loggedInUser.profile_picture} />;
      else return <img id="mypage-profile-img" width="250px" src="/images/no_image.png" />;
    };

    const genreTags = () => {
      return loggedInUser.tags.map((tag) => {
        return <GenreTag key={'setting-genre-tag-' + tag.name} deletable={false} tagName={tag.name} selected={true} onClickTag={() => this.onClickTag(tag.name)} />;
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
        rows={subjectRows[0]}
        worksInRow={worksInRow}
        onClickWork={(workId) => this.onClickWork(workId)}
        onClickMore={() => this.onClickMore(0)}
      />;
    };

    return (
      <div className="mypage">
        <div id="mypage-profile-image-holder">
          {imageContainer() }
        </div>
        <div id="mypage-userdata-holder">
          <h3 id="mypage-username">{loggedInUser.username}</h3>
          <h4 id="mypage-email">{loggedInUser.email}</h4>
          <button id="mypage-account-settings" type="button" onClick={() => this.onClickAccountSettings()}>Account Settings</button>
        </div>
        <div id="mypage-genre-tags-holder">
          { genreTags() }
        </div>
        <div id="mypage-myreviews-holder">
          { myReviewWorkList() }
        </div>
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
    onGetMyReviews: (requestReviews) => dispatch(actionCreators.getMyReviews(requestReviews)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);
