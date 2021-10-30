import React from 'react';
import PropTypes from 'prop-types';
import WorkThumbnail from '../WorkThumbnail/WorkThumbnail';

const WorkObject = (props) => {
  const {
    className, src, platform, completion, title, artist, createdYear, score,
  } = props;
  return (
    <div className={className}>
      <WorkThumbnail className="work-thumbnail" src={src} platform={platform} completion={completion} />
      <h4 className="work-title">{title}</h4>
      <h5 className="work-artist">{artist}</h5>
      <h5 className="work-created-year">{createdYear}</h5>
      <h5 className="work-score">{score}</h5>
    </div>
  );
};

WorkObject.propTypes = {
  className: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired,
  completion: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  createdYear: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
};

export default WorkObject;
