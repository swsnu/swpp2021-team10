import React from 'react';

import WorkThumbnail from '../WorkThumbnail/WorkThumbnail';
import GenreTag from '../GenreTag/GenreTag';
import './WorkInfo.css';

const platformMapper = ['/images/naver_logo.png', '/images/kakao_logo.png', '/images/lezhin_logo.png'];

const WorkInfo = (props) => {
  const {
    className, title, description, link, thumbnailPicture, platformId, year, tags, artists, onClickTag,
  } = props;

  const onClickTagBody = (tagName) => {
    onClickTag(tagName);
  };

  const genreTags = tags.map((tagName, idx) => (
    <GenreTag key={tagName + String(idx)} tagName={tagName} selected={true} deletable={false} onClickTag={onClickTagBody} />
  ));

  return (
    <div className={className}>
      <WorkThumbnail className="work-thumbnail" src={thumbnailPicture} platform={platformMapper[platformId]} completion={false} />
      <div className="work-information-region">
        <h3 className="work-title">{title}</h3>
        <h4 className="work-artist">{artists.toString()}</h4>
        <h4 className="work-created-year">{year}</h4>
        <p className="work-description">{description}</p>
        <a className="work-link" href={link} target="_blank" rel="noopener noreferrer">{link}</a>
        <div className="work-info-tags">
          {genreTags}
        </div>
      </div>
    </div>
  );
};

export default WorkInfo;
