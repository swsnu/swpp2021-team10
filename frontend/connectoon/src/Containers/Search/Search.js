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
      onGetWorks,
      onGetTags,
    } = this.props;
    onGetTags('');
    let initTitle;
    let initGenre;
    if (this.props.match.params.keyword === undefined) {
      initTitle = '';
      initGenre = '';
    } else if (this.props.match.params.keyword.indexOf('$') !== -1) {
      initTitle = '';
      initGenre = this.props.match.params.keyword;
    } else {
      initTitle = this.props.match.params.keyword;
      initGenre = '';
    }

    let subjectRows;
    const worksInRow = 4;
    const rowIncrement = 2;
    const pageRowIncrement = 5;
    if (this.props.location.state) {
      subjectRows = this.props.location.state.subjectRows;
    } else {
      subjectRows = [1, 1];
    }
    const requestWorks = subjectRows.map((rows) => { return [0, worksInRow * (rows + pageRowIncrement)]; });

    this.state = {
      title: initTitle, genre: initGenre, subjectRows, requestWorks, worksInRow, rowIncrement, pageRowIncrement,
    };
    onGetWorks(initTitle, initGenre, requestWorks);

    console.log(this.props.history);
  }

  onSearch = (nextTitle, nextGenre) => {
    const { worksInRow, pageRowIncrement } = this.state;
    const { onGetWorks } = this.props;
    const subjectRows = [1, 1];
    const requestWorks = subjectRows.map((rows) => { return [0, worksInRow * (rows + pageRowIncrement)]; });
    this.setState({
      title: nextTitle, genre: nextGenre, subjectRows, requestWorks,
    });
    onGetWorks(nextTitle, nextGenre, requestWorks);
    const { history } = this.props;
    history.replace(history.location.pathname, { subjectRows });
  }

  onAddTag = (name) => {
    const { title, genre } = this.state;
    this.onSearch(title, genre + '$' + name);
  }

  onDeleteTag = (name) => {
    const { title, genre } = this.state;
    this.onSearch(title, genre.replace('$' + name, ''));
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
      const { title, genre } = this.state;
      const { onGetWorks } = this.props;
      onGetWorks(title, genre, newRequestWorks);
    }
    const { history } = this.props;
    history.replace(history.location.pathname, { subjectRows });
  }

  render() {
    const { storedWorks, storedTags, onGetWorks } = this.props;
    const {
      title, genre, subjectRows, worksInRow,
    } = this.state;

    if (storedTags.length === 0) {
      return null;
    }

    const resultSubject = title === '' ? 'Search result' : 'Title search result';

    const titleList = <WorkList
      class="ts-wl"
      className="title-search-work-list"
      subject={resultSubject}
      workList={storedWorks[0]}
      rows={subjectRows[0]}
      worksInRow={worksInRow}
      onClickWork={(workId) => this.onClickWork(workId)}
      onClickMore={() => this.onClickMore(0)}
    />;
    const artistList = <WorkList
      class="as-wl"
      className="artist-search-work-list"
      subject="Artist search result"
      workList={storedWorks[1]}
      rows={subjectRows[1]}
      worksInRow={worksInRow}
      onClickWork={(workId) => this.onClickWork(workId)}
      onClickMore={() => this.onClickMore(1)}
    />;

    const defaultTag = genre !== '' ? storedTags.filter((x) => x.name === genre.split('$')[1]) : [];

    return (
      <div className="search">
        <div className="search-title-artist" align="left">
          <label id="search-title-artist">Title/Artist</label>
          <input type="text" id="search-title-artist-input" value={title} onChange={(e) => { this.onSearch(e.target.value, genre); }} />
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
};

Search.propTypes = {
  onGetWorks: PropTypes.func,
  storedWorks: PropTypes.arrayOf(PropTypes.any),
  storedTags: PropTypes.arrayOf(PropTypes.any),
};

const mapStateToProps = (state) => {
  return {
    storedWorks: state.work.searchedWorks,
    storedTags: state.tag.tags,
    searchTagName: state.work.searchTagName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetWorks: (keyword, keytag, requestWorks) => dispatch(actionCreators.getSearchWorks(keyword, keytag, requestWorks)),
    onGetTags: (keyword) => dispatch(actionCreators.getSearchTags(keyword)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Search));
