import React, { Component } from 'react';
import PropTypes, { func } from 'prop-types';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actionCreators from '../../store/actions/index';
import WorkList from '../../Components/WorkList/WorkList';
import './Search.css';
import GenreTag from '../../Components/GenreTag/GenreTag';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
  }

  render() {
    const { storedWorks } = this.props;
    const { title } = this.state;
    const { onGetWorks } = this.props;

    return (
      <div className="search">
        <div className="search-title-artist" align="left">
          <label id="search-title-artist">Title/Artist</label>
          <input type="text" id="search-title-artist-input" value={title} onChange={(e) => { this.setState({ title: e.target.value }); onGetWorks(e.target.value); }} />
        </div>
        <GenreTag tagName="러브코미디" deletable={true} />
        <GenreTag tagName="로맨스" deletable={false} />
        {storedWorks !== null && storedWorks.length !== 0 && storedWorks[0].length !== 0 && <WorkList className="ts-wl" class="title-search-work-list" subject="Title search result" workList={storedWorks[0]} workNumInRow={4} />}
        {storedWorks !== null && storedWorks.length !== 0 && storedWorks[1].length !== 0 && <WorkList className="as-wl" class="artist-search-work-list" subject="Artist search result" workList={storedWorks[1]} workNumInRow={4} />}
      </div>
    );
  }
}

Search.defaultProps = {
  onGetWorks: func,
  storedWorks: null,
};

Search.propTypes = {
  onGetWorks: PropTypes.func,
  storedWorks: PropTypes.arrayOf(PropTypes.any),
};

const mapStateToProps = (state) => {
  return {
    storedWorks: state.work.selectedWorks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetWorks: (keyword) => dispatch(actionCreators.getSearchWorks(keyword)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Search));
