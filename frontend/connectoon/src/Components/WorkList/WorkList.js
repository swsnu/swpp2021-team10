import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WorkObject from '../WorkObject/WorkObject';
import './WorkList.css';

class WorkList extends Component {
  constructor(props) {
    super(props);
    const { workList } = props;
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
    this.state = { totalDisplayRow: 1, workObjects };
  }

  onClickMore = () => {
    const { totalDisplayRow } = this.state;
    this.setState({ totalDisplayRow: totalDisplayRow + 2 });
  };

  render() {
    const {
      workNumInRow, className, subject,
    } = this.props;
    const { totalDisplayRow, workObjects } = this.state;
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
