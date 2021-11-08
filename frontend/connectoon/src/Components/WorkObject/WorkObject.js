import React from 'react';
import PropTypes from 'prop-types';
import WorkThumbnail from '../WorkThumbnail/WorkThumbnail';
import './WorkObject.css';

const WorkObject = (props) => {
  const {
    className, src, platform, completion, title, artist, createdYear, score,
  } = props;
  return (
    <div className={className}>
      <WorkThumbnail className="work-thumbnail" src={src} platform={platform} completion={completion} />
      <div className="object-description">
        <h4 className="work-title description">{title}</h4>
        <h5 className="work-artist description">{artist}</h5>
        <img className="work-score-star-icon" src="/images/ratingStar.png" alt="rating" />
        <h5 className="work-score description">{score}</h5>
        <h5 className="work-created-year description">{createdYear}</h5>
      </div>
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
