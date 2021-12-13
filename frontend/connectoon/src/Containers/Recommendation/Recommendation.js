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
    let subjectRows;
    const worksInRow = 4;
    const rowIncrement = 2;
    const pageRowIncrement = 5;
    const { location } = this.props;
    if (location.state && location.state.subjectRows) {
      subjectRows = location.state.subjectRows;
    } else {
      subjectRows = [1, 1];
    }
    const requestWorks = subjectRows.map((rows) => { return [0, worksInRow * (rows + pageRowIncrement)]; });
    this.state = {
      subjectRows, requestWorks, worksInRow, rowIncrement, pageRowIncrement,
    };
    const { onGetRecWorks } = this.props;
    onGetRecWorks(requestWorks);
  }

  onClickWork = (workId) => {
    this.props.history.push('/works/' + String(workId));
  }

  onClickMore = (listId) => {
    const {
      subjectRows, requestWorks, worksInRow, rowIncrement, pageRowIncrement,
    } = this.state;
    subjectRows[listId] += rowIncrement;
    const newRequestWorks = [];
    let fetchMore = false;
    requestWorks.forEach((requestWork, idx) => {
      if (worksInRow * (subjectRows[idx] + rowIncrement) >= requestWork[1]) {
        fetchMore = true;
        newRequestWorks.push([requestWork[1], requestWork[1] + worksInRow * pageRowIncrement]);
      } else {
        newRequestWorks.push([requestWork[1], requestWork[1]]);
      }
    });
    this.setState({ subjectRows, requestWorks: newRequestWorks });
    if (fetchMore) {
      this.props.onGetMainWorks(newRequestWorks);
    }
    const { history } = this.props;
    history.replace('/recommendation', { subjectRows });
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
    const { subjectRows, worksInRow } = this.state;
    const genreList = <WorkList
      class="g-wl"
      className="genre-based-work-list"
      subject="Genre-based recommendation"
      workList={recWorkLists[0]}
      rows={subjectRows[0]}
      worksInRow={worksInRow}
      onClickWork={(workId) => this.onClickWork(workId)}
      onClickMore={() => this.onClickMore(0)}
    />;
    const reviewList = <WorkList
      class="r-wl"
      className="review-based-work-list"
      subject="Review-based recommendation"
      workList={recWorkLists[1]}
      rows={subjectRows[1]}
      worksInRow={worksInRow}
      onClickWork={(workId) => this.onClickWork(workId)}
      onClickMore={() => this.onClickMore(1)}
    />;

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
    recWorkLists: state.work.reccomWorks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetRecWorks: (requestWorks) => dispatch(actionCreators.getRecWorks(requestWorks)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Recommendation));
