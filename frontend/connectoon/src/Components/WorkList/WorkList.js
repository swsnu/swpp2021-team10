import React from 'react';
import PropTypes from 'prop-types';
import WorkObject from '../WorkObject/WorkObject';

const WorkList = (props) => {
  const {
    workList, workDisplayNum, className, subject,
  } = props;
  const workObjects = workList.map((work) => (
    <WorkObject
      key={work.id}
      className="work-object"
      src={work.src}
      platform={work.platform}
      completion={work.completion}
      title={work.title}
      artist={work.artist}
      createdYear={work.createdYear}
      score={work.score}
    />
  ));
  const displayingObjects = workObjects.slice(0, workDisplayNum - 1);

  return (
    <div className={className}>
      <h3 className="list-subject">{subject}</h3>
      {displayingObjects}
      <button type="button" className="more-works-button">more</button>
    </div>
  );
};

WorkList.propTypes = {
  workList: PropTypes.arrayOf(PropTypes.object).isRequired,
  workDisplayNum: PropTypes.number.isRequired,
  className: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
};

export default WorkList;
