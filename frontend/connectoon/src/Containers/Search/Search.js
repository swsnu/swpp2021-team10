import React, { Component } from 'react';
import PropTypes, { func } from 'prop-types';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actionCreators from '../../store/actions/index';
import WorkList from '../../Components/WorkList/WorkList';
import TagSearchWindow from '../TagSearchWindow/TagSearchWindow';

import './Search.css';

class Search extends Component {
  state = {
    title: '',
    genre: '',
  };

  onAddTag = (name) => {
    const { onGetWorks } = this.props;
    const { title, genre } = this.state;
    this.setState({ genre: genre + '$' + name });
    onGetWorks(title, genre + '$' + name);
  }

  onDeleteTag = (name) => {
    const { onGetWorks } = this.props;
    const { title, genre } = this.state;
    this.setState({ genre: genre.replace('$' + name, '') });
    onGetWorks(title, genre.replace('$' + name, ''));
  }

  render() {
    const { storedWorks, onGetWorks } = this.props;
    const { title, genre } = this.state;

    console.log(storedWorks);

    const titleList = <WorkList className="ts-wl" class="title-search-work-list" subject="Title search result" workList={storedWorks[0]} workNumInRow={4} />;
    const artistList = <WorkList className="as-wl" class="artist-search-work-list" subject="Artist search result" workList={storedWorks[1]} workNumInRow={4} />;

    console.log(titleList);

    return (
      <div className="search">
        <div className="search-title-artist" align="left">
          <label id="search-title-artist">Title/Artist</label>
          <input type="text" id="search-title-artist-input" value={title} onChange={(e) => { this.setState({ title: e.target.value }); onGetWorks(e.target.value, genre); }} />
        </div>
        <TagSearchWindow className="search-genre-search-window" onAddTag={this.onAddTag} onDeleteTag={this.onDeleteTag} />
        {storedWorks[0].length !== 0 && titleList}
        {storedWorks[1].length !== 0 && artistList}
      </div>
    );
  }
}

Search.defaultProps = {
  onGetWorks: func,
  storedWorks: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)),
};

Search.propTypes = {
  onGetWorks: PropTypes.func,
  storedWorks: PropTypes.arrayOf(PropTypes.any),
};

const mapStateToProps = (state) => {
  return {
    storedWorks: state.work.searchedWorks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetWorks: (keyword, keytag) => dispatch(actionCreators.getSearchWorks(keyword, keytag)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Search));
