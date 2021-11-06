import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MyPage extends Component {
  constructor(props) {
    super(props);
    this.state = { dummyState: true };
  }

  render() {
    const { dummyState } = this.state;
    return (
      <div className="mypage">
        {dummyState && 'This is MyPage'}
      </div>
    );
  }
}

export default MyPage;
