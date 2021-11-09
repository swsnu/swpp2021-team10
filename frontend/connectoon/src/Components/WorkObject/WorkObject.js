import React from 'react';
import PropTypes from 'prop-types';
import WorkThumbnail from '../WorkThumbnail/WorkThumbnail';
import './WorkObject.css';

const WorkObject = (props) => {
  const {
    className, src, platform, completion, title, artists, createdYear, score,
  } = props;
  return (
    <div className={className}>
      <WorkThumbnail className="work-thumbnail" src={src} platform={platform} completion={completion} />
      <div className="object-description">
        <h4 className="work-object-title description">{title}</h4>
        <h5 className="work-object-artist description">{artists.toString()}</h5>
        <img className="work-object-score-star-icon" src="/images/ratingStar.png" alt="rating" />
        <h5 className="work-object-score description">{score}</h5>
        <h5 className="work-object-created-year description">{createdYear}</h5>
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
  artists: PropTypes.string.isRequired,
  createdYear: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
};

export default WorkObject;
