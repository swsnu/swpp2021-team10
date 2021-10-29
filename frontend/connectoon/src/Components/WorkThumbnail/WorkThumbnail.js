import React from 'react';

const WorkThumbnail = (props) => {
  return (
    <div className={props.className}>
      <img className="original-work-thumbnail" src={props.src} alt="work_thumbnail" />
      <img className="work-platform" src={props.platform} alt="work_platform" />
      {props.completion && <img className="work-completion" src={"/images/work_completion.png"} alt="work_completion" />}
    </div>
  )
};

export default WorkThumbnail;