import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = { dummyState: true };
  }

  render() {
    const { dummyState } = this.state;
    return (
      <div className="board">
        {dummyState && 'This is board'}
      </div>
    );
  }
}

export default Board;
