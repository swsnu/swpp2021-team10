import React from 'react';
import PropTypes from 'prop-types';
import './WorkThumbnail.css';

const WorkThumbnail = (props) => {
  const {
    className, src, platform, completion,
  } = props;

  return (
    <div className={className}>
      <div id="work-thumbnail-holder">
        <img className="original-work-thumbnail" src={src} alt="work_thumbnail" />
      </div>
      <img className="work-platform" src={platform} alt="work_platform" />
      {completion && <img className="work-completion" src="/images/work_completion.png" alt="work_completion" />}
    </div>
  );
};

export default WorkThumbnail;
