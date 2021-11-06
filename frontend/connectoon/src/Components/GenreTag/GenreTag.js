import React from 'react';
import PropTypes from 'prop-types';
import './GenreTag.css';

const GenreTag = (props) => {
  const { tagName, deletable } = props;

  return (
    <div className="genre-tag">
      <p className="tag-name">{tagName}</p>
      {deletable && <button type="button" className="tag-delete-button">X</button>}
      {!deletable && <div className="button-empty-space" />}
    </div>
  );
};

GenreTag.propTypes = {
  tagName: PropTypes.string.isRequired,
  deletable: PropTypes.bool.isRequired,
};

export default GenreTag;
