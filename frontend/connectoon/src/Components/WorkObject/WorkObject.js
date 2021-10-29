import React from 'react';
import WorkThumbnail from '../WorkThumbnail/WorkThumbnail';

const WorkObject = (props) => {
  return (
    <div className="work-object">
      <img className="original-work-thumbnail" src={props.thumbnail_address} />
      <img className="work-platform" src={props.work_platform} />
      <img className="work-completion" src={props.work_completion} />
    </div>
  )
};

export default WorkObject;