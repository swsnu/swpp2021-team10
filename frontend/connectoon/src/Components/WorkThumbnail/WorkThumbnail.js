import React from 'react';
import PropTypes from 'prop-types';

const WorkThumbnail = (props) => {
  const {
    className, src, platform, completion,
  } = props;

  return (
    <div className={className}>
      <img className="original-work-thumbnail" src={src} alt="work_thumbnail" />
      <img className="work-platform" src={platform} alt="work_platform" />
      {completion && <img className="work-completion" src="/images/work_completion.png" alt="work_completion" />}
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
