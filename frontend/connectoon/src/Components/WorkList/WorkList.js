import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WorkObject from '../WorkObject/WorkObject';
import './WorkList.css';

const platformMapper = ['/images/naver_logo.png', '/images/kakao_logo.png', '/images/lezhin_logo.png'];

const WorkList = (props) => {
  const {
    className, subject, workList, rows, worksInRow, onClickWork, onClickMore,
  } = props;

  const workObjects = workList.map((work) => (
    <WorkObject
      key={String(work.id) + work.title}
      className="work-object"
      src={work.thumbnail_picture}
      platform={platformMapper[work.platform_id]}
      completion={work.completion}
      title={work.title}
      artists={work.artists}
      createdYear={work.year}
      score={work.score_avg}
      onClickWork={() => onClickWork(work.id)}
    />
  ));

  let i = 0;
  const displayingObjects = Array.from({ length: rows });
  for (i = 0; i < rows; i += 1) {
    displayingObjects[i] = workObjects.slice(worksInRow * i, worksInRow * (i + 1));
  }

  return (
    <div className={className}>
      <div className="list-wrapper" align="left">
        <h1 className="list-subject">{subject}</h1>
        {displayingObjects}
        {(workList.length > worksInRow * rows) && <button type="button" className="more-works-button" onClick={() => onClickMore()}>more...</button>}
      </div>
    </div>
  );
};

export default WorkList;
