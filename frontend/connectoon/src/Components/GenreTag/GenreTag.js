import React from 'react';
import PropTypes, { func } from 'prop-types';

import './GenreTag.css';

const GenreTag = (props) => {
  const {
    tagName, deletable, selected, onAddTag, onDeleteTag, onClickTag,
  } = props;

  const onClickAddTag = (e) => {
    onAddTag(tagName);
  };

  const onClickDeleteTag = (e) => {
    onDeleteTag(tagName);
  };

  const onClickTagBody = (e) => {
    if (selected && !deletable) {
      onClickTag(tagName);
    }
  };

  return (
    <div className="genre-tag" onClick={onClickTagBody}>
      {selected &&
        <div className="tag-body">
          <p className="tag-name">
            {tagName}
          </p>
          {deletable &&
            <button className="tag-delete-button" type="button" onClick={onClickDeleteTag}>
              <img id="delete-img" src="/images/delete.png" />
            </button>
          }
          {!deletable && <div className="button-empty-space" />}
        </div>
      }
      {!selected &&
        <div className="selected-tag-body" onClick={onClickAddTag}>
          <p className="selected-tag-name">
            {tagName}
          </p>
          <div className="selected-button-empty-space" />
        </div>
      }
    </div>
  );
};

GenreTag.defaultProps = {
  onAddTag: func,
  onDeleteTag: func,
  onClickTag: func,
};

GenreTag.propTypes = {
  tagName: PropTypes.string.isRequired,
  deletable: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
  onAddTag: PropTypes.func,
  onDeleteTag: func,
  onClickTag: func,
};

export default GenreTag;
