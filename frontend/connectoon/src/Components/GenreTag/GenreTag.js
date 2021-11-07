import React from 'react';
import PropTypes from 'prop-types';

import './GenreTag.css';

const GenreTag = (props) => {
  const {
    tagName, deletable,
  } = props;

  return (
    <div className="genre-tag">
      <div className="tag-body">
        <p className="tag-name">
          {tagName}
        </p>
        {deletable && <button className="tag-delete-button" type="button"><img id="delete-img" src="/images/delete.png" /></button>}
        {!deletable && <div className="button-empty-space" />}
      </div>
    </div>
  );
};

GenreTag.propTypes = {
  tagName: PropTypes.string.isRequired,
  deletable: PropTypes.bool.isRequired,
};

export default GenreTag;
