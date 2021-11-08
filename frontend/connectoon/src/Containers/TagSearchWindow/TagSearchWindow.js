import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GenreTag from '../../Components/GenreTag/GenreTag';
import './TagSearchWindow.css';

class TagSearchWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genre: '',
    };
  }

  onClickAddTag = (name) => {
    const { onAddTag } = this.props;
    onAddTag(name);
  }

  onClickDeleteTag = (name) => {
    const { onDeleteTag } = this.props;
    onDeleteTag(name);
  }

  render() {
    const {
      className,
      tags,
      selectedTags,
    } = this.props;
    const { genre } = this.state;

    const foundList = tags.filter((x) => {
      let boolVal = false;
      if (genre.length === 0) {
        if (selectedTags.length === 0) {
          boolVal = true;
        } else {
          boolVal = selectedTags[selectedTags.length - 1].related.includes(x.key);
        }
      } else {
        boolVal = x.name.indexOf(genre) !== -1;
      }
      return boolVal;
    }).map((x) => (
      <GenreTag
        tagName={x.name}
        deletable={false}
        selected={false}
        onAddTag={this.onClickAddTag}
        onDeleteTag={this.onClickDeleteTag}
      />
    ));

    const clickedList = selectedTags.map((x) => (
      <GenreTag
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

TagSearchWindow.propTypes = {
  className: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.any).isRequired,
  selectedTags: PropTypes.arrayOf(PropTypes.any).isRequired,
  onAddTag: PropTypes.func.isRequired,
  onDeleteTag: PropTypes.func.isRequired,
};

export default TagSearchWindow;
