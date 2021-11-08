import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GenreTag from '../../Components/GenreTag/GenreTag';
import './TagSearchWindow.css';

class TagSearchWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genre: '',
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
    const {
      className,
    } = this.props;
    const { genre, dummyTagList, dummySelectedList } = this.state;

    const foundList = dummyTagList.filter((x) => {
      let boolVal = false;
      if (genre.length === 0) {
        if (dummySelectedList.length === 0) {
          boolVal = true;
        } else {
          boolVal = dummySelectedList[dummySelectedList.length - 1].related.includes(x.key);
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
        onAddTag={this.onAddTag}
        onDeleteTag={this.onDeleteTag}
      />
    ));

    const clickedList = dummySelectedList.map((x) => (
      <GenreTag
        tagName={x.name}
        deletable={true}
        selected={true}
        onAddTag={this.onAddTag}
        onDeleteTag={this.onDeleteTag}
      />
    ));

    return (
      <div className={className}>
        <div className="search-genre-tag" align="left">
          <label id="search-genre-tag">Genre</label>
          <input type="text" id="tag-search-input" value={genre} onChange={(e) => { this.setState({ genre: e.target.value }); }} />
        </div>
        {dummySelectedList.length !== 0 && <div className="selected-tag">
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
};

export default TagSearchWindow;
