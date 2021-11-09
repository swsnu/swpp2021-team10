import React from 'react';
import PropTypes from 'prop-types';
import './WorkThumbnail.css';

const WorkThumbnail = (props) => {
  const {
    className, src, platform, completion,
  } = props;

  return (
    <div className={className}>
      <img className="original-work-object-thumbnail" src={src} alt="work_thumbnail" />
      <img className="work-object-platform" src={platform} alt="work_platform" />
      {completion && <img className="work-object-completion" src="/images/work_completion.png" alt="work_completion" />}
    </div>
  );
};

WorkThumbnail.propTypes = {
  className: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired,
  completion: PropTypes.bool.isRequired,
};

export default WorkThumbnail;
