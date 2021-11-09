import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WorkObject from '../WorkObject/WorkObject';
import './WorkList.css';

const platformMapper = ['/images/naver_logo.png', '/images/kakao_logo.png', '/images/lezhine_logo.png'];
class WorkList extends Component {
  constructor(props) {
    super(props);
    this.state = { totalDisplayRow: 1 };
  }

  onClickMore = () => {
    const { totalDisplayRow } = this.state;
    this.setState({ totalDisplayRow: totalDisplayRow + 2 });
  };

  render() {
    const {
      workList, workNumInRow, className, subject,
    } = this.props;
    const { totalDisplayRow } = this.state;
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
      />
    ));
    let i = 0;
    const displayingObjects = Array.from({ length: totalDisplayRow });
    for (i = 0; i < totalDisplayRow; i += 1) {
      displayingObjects[i] = workObjects.slice(i * workNumInRow, (i + 1) * workNumInRow);
    }
    return (
      <div className={className}>
        <div className="list-wrapper" align="left">
          <h1 className="list-subject">{subject}</h1>
          {displayingObjects}
          {(workObjects.length > totalDisplayRow * workNumInRow) && <button type="button" className="more-works-button" onClick={() => this.onClickMore()}>more...</button>}
        </div>
      </div>
    );
  }
}

WorkList.propTypes = {
  workList: PropTypes.arrayOf(PropTypes.object).isRequired,
  workNumInRow: PropTypes.number.isRequired,
  className: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
};

export default WorkList;
