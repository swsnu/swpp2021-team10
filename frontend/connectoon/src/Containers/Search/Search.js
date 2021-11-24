import React, { Component } from 'react';
import PropTypes, { func } from 'prop-types';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actionCreators from '../../store/actions/index';
import WorkList from '../../Components/WorkList/WorkList';
import TagSearchWindow from '../TagSearchWindow/TagSearchWindow';

import './Search.css';

class Search extends Component {
  constructor(props) {
    super(props);
    const {
      searchWord,
      onGetWorks,
      onGetTags,
    } = this.props;
    onGetTags('');
    if (this.props.match.params.tag === undefined) {
      this.state = {
        title: searchWord,
        genre: '',
      };
      onGetWorks(searchWord, '');
    } else {
      this.state = {
        title: searchWord,
        genre: this.props.match.params.tag,
      };
      onGetWorks(searchWord, this.props.match.params.tag);
    }
  }

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

  onClickWork = (workId) => {
    this.props.history.push('/works/' + String(workId));
  }

  render() {
    const {
      storedWorks,
      storedTags,
      onGetWorks,
    } = this.props;
    const { title, genre } = this.state;

    if (storedTags.length === 0) {
      return null;
    }

    const resultSubject = title === '' ? 'Search result' : 'Title search result';

    const titleList = <WorkList class="ts-wl" className="title-search-work-list" subject={resultSubject} onClickWork={(workId) => this.onClickWork(workId)} workList={storedWorks[0]} workNumInRow={4} />;
    const artistList = <WorkList class="as-wl" className="artist-search-work-list" subject="Artist search result" onClickWork={(workId) => this.onClickWork(workId)} workList={storedWorks[1]} workNumInRow={4} />;

    const defaultTag = genre !== '' ? storedTags.filter((x) => x.name === genre.split('$')[1]) : [];

    return (
      <div className="search">
        <div className="search-title-artist" align="left">
          <label id="search-title-artist">Title/Artist</label>
          <input type="text" id="search-title-artist-input" value={title} onChange={(e) => { this.setState({ title: e.target.value }); onGetWorks(e.target.value, genre); }} />
        </div>
        <TagSearchWindow className="search-genre-search-window" onAddTag={this.onAddTag} onDeleteTag={this.onDeleteTag} defaultTag={defaultTag} />
        {storedWorks[0].length !== 0 && titleList}
        {title !== '' && storedWorks[1].length !== 0 && artistList}
      </div>
    );
  }
}

Search.defaultProps = {
  onGetWorks: func,
  storedWorks: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)),
  storedTags: [],
  searchWord: PropTypes.string,
};

Search.propTypes = {
  onGetWorks: PropTypes.func,
  storedWorks: PropTypes.arrayOf(PropTypes.any),
  storedTags: PropTypes.arrayOf(PropTypes.any),
  searchWord: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    storedWorks: state.work.searchedWorks,
    storedTags: state.tag.tags,
    searchWord: state.work.searchWord,
    searchTagName: state.work.searchTagName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetWorks: (keyword, keytag) => dispatch(actionCreators.getSearchWorks(keyword, keytag)),
    onGetTags: (keyword) => dispatch(actionCreators.getSearchTags(keyword)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Search));
