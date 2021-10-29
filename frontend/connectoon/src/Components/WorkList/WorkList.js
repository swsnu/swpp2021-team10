import React from 'react';
import WorkObject from '../WorkObject/WorkObject';

const WorkList = (props) => {
  let workObjects = props.workList.map((work) => {
    <WorkObject 
      className="work-object" 
      src={work.src} 
      platform={work.platform} 
      completion={work.completion} 
      title={work.title} 
      artist={work.artist} 
      created_year={work.created_year} 
      score={work.score} />
  });
  displayingObjects = workObjects.slice(0, props.workDisplayNum-1);

  return (
    <div className={props.className}>
      <h3 className="list-subject">{props.subject}</h3>
      {displayingObjects}
      <button className="more-works-button">more</button>
    </div>
  )
};

export default WorkList;