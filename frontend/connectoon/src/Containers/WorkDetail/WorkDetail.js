import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WorkDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { dummyState: true };
  }

  render() {
    const { dummyState } = this.state;
    const { title } = this.props;
    return (
      <div className="work-detail">
        This is work detail for
        {dummyState && title}
      </div>
    );
  }
}

WorkDetail.propTypes = {
  title: PropTypes.string.isRequired,
};

export default WorkDetail;
