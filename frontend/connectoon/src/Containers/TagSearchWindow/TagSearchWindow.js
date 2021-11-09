import React, { Component } from 'react';
import PropTypes, { func } from 'prop-types';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actionCreators from '../../store/actions/index';
import GenreTag from '../../Components/GenreTag/GenreTag';
import './TagSearchWindow.css';

class TagSearchWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genre: '',
      selectedTags: [],
    };
    const { onGetTags } = this.props;
    onGetTags('');
  }

  onClickAddTag = (name) => {
    const { selectedTags } = this.state;
    const { storedTags, onGetTags } = this.props;
    const selectedTag = storedTags.find((x) => x.name === name);
    this.setState({ genre: '', selectedTags: [...selectedTags, selectedTag] });
    onAddTag(name);
  }

  onClickDeleteTag = (name) => {
    const { selectedTags } = this.state;
    const { onDeleteTag } = this.props;
    const updatedSelectedList = selectedTags.filter((x) => x.name !== name);
    this.setState({ selectedTags: updatedSelectedList });
    onDeleteTag(name);
  }

  render() {
    const { className, storedTags, onGetTags } = this.props;
    const { genre, selectedTags } = this.state;

    const selectedTagNames = selectedTags.map((x) => x.name);

    const foundList = storedTags.filter((x) => {
      let boolVal = false;
      if (genre.length === 0) {
        if (selectedTags.length === 0) {
          boolVal = x.prior;
        } else {
          boolVal = selectedTagNames.indexOf(x.name) === -1 && selectedTags[selectedTags.length - 1].related.indexOf(x.key) !== -1;
        }
      } else {
        boolVal = selectedTagNames.indexOf(x.name) === -1 && x.name.indexOf(genre) !== -1;
      }
      return boolVal;
    }).map((x) => (
      <GenreTag
        key={x.key}
        tagName={x.name}
        deletable={false}
        selected={false}
        onAddTag={this.onClickAddTag}
        onDeleteTag={this.onClickDeleteTag}
      />
    ));

    const clickedList = selectedTags.map((x) => (
      <GenreTag
        key={x.key}
        tagName={x.name}
        deletable={true}
        selected={true}
        onAddTag={this.onClickAddTag}
        onDeleteTag={this.onClickDeleteTag}
      />
    ));

    return (
      <div className={className}>
        <div className="search-genre-tag" align="left">
          <label id="search-genre-tag">Genre</label>
          <input type="text" id="tag-search-input" value={genre} onChange={(e) => { this.setState({ genre: e.target.value }); }} />
        </div>
        {selectedTags.length !== 0 && <div className="selected-tag">
          {clickedList}
        </div>}
        <div className="found-list">
          {foundList}
        </div>
      </div>
    );
  }
}

TagSearchWindow.defaultProps = {
  storedTags: [],
  onGetTags: func,
  onAddTag: func,
  onDeleteTag: func,
};

TagSearchWindow.propTypes = {
  className: PropTypes.string.isRequired,
  storedTags: PropTypes.arrayOf(PropTypes.any),
  onGetTags: PropTypes.func,
  onAddTag: PropTypes.func,
  onDeleteTag: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    storedTags: state.tag.tags,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetTags: (keyword) => dispatch(actionCreators.getSearchTags(keyword)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TagSearchWindow));
