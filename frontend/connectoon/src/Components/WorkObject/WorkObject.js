import React from 'react';
import WorkThumbnail from '../WorkThumbnail/WorkThumbnail';

const WorkObject = (props) => {
  return (
    <div className={props.className}>
      <WorkThumbnail 
        className="work-thumbnail" 
        src={props.src}
        platform={props.platform}
        completion={props.completion} />
      <h4 className="work-title">{props.title}</h4>
      <h5 className="work-artist">{props.artist}</h5>
      <h5 className="work-created-year">{props.created_year}</h5>
      <h5 className="work-score">{props.score}</h5>
    </div>
  )
};

export default WorkObject;