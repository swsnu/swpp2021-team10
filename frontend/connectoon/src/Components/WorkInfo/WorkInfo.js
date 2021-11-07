import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import WorkThumbnail from '../WorkThumbnail/WorkThumbnail';
import GenreTag from '../GenreTag/GenreTag';
import './WorkInfo.css';

const WorkInfo = (props) => {
  const {
    className, src, platform, completion, title, artist, createdYear, description, link, tagNames,
  } = props;

  const tags = tagNames.map((tagName, idx) => (
    <GenreTag key={tagName + String(idx)} tagName={tagName} deletable={false} />
  ));

  return (
    <div className={className}>
      <WorkThumbnail className="work-thumbnail" src={src} platform={platform} completion={completion} />
      <div className="work-information-region">
        <h3 className="work-title">{title}</h3>
        <h4 className="work-artist">{artist}</h4>
        <h4 className="work-created-year">{createdYear}</h4>
        <p className="work-description">{description}</p>
        <a className="work-link" href={link} target="_blank" rel="noopener noreferrer">{link}</a>
        <div className="work-info-tags">
          {tags}
        </div>
      </div>
    </div>
  );
};

WorkInfo.propTypes = {
  className: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired,
  completion: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  createdYear: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  tagNames: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default WorkInfo;
