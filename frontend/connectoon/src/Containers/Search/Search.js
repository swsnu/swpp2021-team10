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
    this.state = {
      title: '',
      dummyTagList: [
        {
          key: 1,
          name: '판타지',
          related: [2, 3],
        },
        {
          key: 2,
          name: '마법',
          related: [1],
        },
        {
          key: 3,
          name: '구해주세요여긴날씨가나빠요물이점점불어나요누구보다나를먼저건져내줘요그대의버릇과습관따위가',
          related: [],
        },
        {
          key: 4,
          name: '아시발꿈',
          related: [],
        },
      ],
      dummySelectedList: [],
    };
  }

  onAddTag = (name) => {
    const { dummySelectedList, dummyTagList } = this.state;
    const selectedTag = dummyTagList.filter((x) => x.name === name)[0];
    const updatedTagList = dummyTagList.filter((x) => x.name !== name);
    this.setState({ dummyTagList: updatedTagList, dummySelectedList: [...dummySelectedList, selectedTag] });
  }

  onDeleteTag = (name) => {
    const { dummySelectedList, dummyTagList } = this.state;
    const selectedTag = dummySelectedList.filter((x) => x.name === name)[0];
    const updatedSelectedList = dummySelectedList.filter((x) => x.name !== name);
    this.setState({ dummyTagList: [...dummyTagList, selectedTag], dummySelectedList: updatedSelectedList });
  }

  render() {
    const { storedWorks, onGetWorks } = this.props;
    const { title, dummySelectedList, dummyTagList } = this.state;

    return (
      <div className="search">
        <div className="search-title-artist" align="left">
          <label id="search-title-artist">Title/Artist</label>
          <input type="text" id="search-title-artist-input" value={title} onChange={(e) => { this.setState({ title: e.target.value }); onGetWorks(e.target.value); }} />
        </div>
        <TagSearchWindow className="search-genre-tag" tags={dummyTagList} selectedTags={dummySelectedList} onAddTag={this.onAddTag} onDeleteTag={this.onDeleteTag} />
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
