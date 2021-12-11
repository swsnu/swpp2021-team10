import React, { Component } from 'react';
import PropTypes, { func } from 'prop-types';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actionCreators from '../../store/actions/index';
import WorkList from '../../Components/WorkList/WorkList';

import './Recommendation.css';

class Recommendation extends Component {
  constructor(props) {
    super(props);
    const { onGetRecWorks } = this.props;
    this.state = { workNumInRow: 4 };
    onGetRecWorks();
  }

  onClickWork = (workId) => {
    this.props.history.push('/works/' + String(workId));
  }

  render() {
    if (!this.props.loggedInUser) {
      return <div className="recommendation-page">
        <h3>Please Login!</h3>
      </div>;
    }
    const { recWorkLists } = this.props;
    if (recWorkLists.length < 2) {
      return null;
    }
    const genreList = <WorkList class="g-wl" className="genre-based-work-list" subject="Genre-based recommendation" onClickWork={(workId) => this.onClickWork(workId)} workList={recWorkLists[0]} workNumInRow={4} />;
    const reviewList = <WorkList class="r-wl" className="review-based-work-list" subject="Review-based recommendation" onClickWork={(workId) => this.onClickWork(workId)} workList={recWorkLists[1]} workNumInRow={4} />;

    return (
      <div className="recommendation-page">
        {genreList}
        {reviewList}
      </div>
    );
  }
}

Recommendation.defaultProps = {
  onGetRecWorks: func,
  recWorkLists: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)),
};

Recommendation.propTypes = {
  onGetRecWorks: func,
  recWorkLists: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)),
};

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.user.loggedInUser,
    recWorkLists: state.work.recWorkLists,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetRecWorks: () => dispatch(actionCreators.getRecWorks()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Recommendation));
