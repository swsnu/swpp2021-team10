import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import WorkList from '../../Components/WorkList/WorkList';
import './Main.css';
import * as actionCreators from '../../store/actions/index';

class Main extends Component {
  constructor(props) {
    super(props);
    let subjectRows;
    const worksInRow = 4;
    const rowIncrement = 2;
    const pageRowIncrement = 5;
    if (this.props.location.state) {
      subjectRows = this.props.location.state.subjectRows;
    } else {
      subjectRows = [1, 1];
    }
    const requestWorks = subjectRows.map((rows) => { return [0, worksInRow * (rows + pageRowIncrement)]; });
    this.state = {
      subjectRows, requestWorks, worksInRow, rowIncrement, pageRowIncrement,
    };
  }

  componentDidMount() {
    this.props.onGetMainWorks(this.state.requestWorks);
  }

  onClickWork = (workId) => {
    this.props.history.push('/works/' + String(workId));
  }

  onClickMore = (listId) => {
    const {
      subjectRows, requestWorks, worksInRow, rowIncrement, pageRowIncrement,
    } = this.state;
    subjectRows[listId] += rowIncrement;
    const newRequestWorks = [];
    let fetchMore = false;
    requestWorks.forEach((requestWork, idx) => {
      if (worksInRow * (subjectRows[idx] + rowIncrement) >= requestWork[1]) {
        fetchMore = true;
        newRequestWorks.push([requestWork[1], requestWork[1] + worksInRow * pageRowIncrement]);
      } else {
        newRequestWorks.push([requestWork[1], requestWork[1]]);
      }
    });
    this.setState({ subjectRows, requestWorks: newRequestWorks });
    if (fetchMore) {
      this.props.onGetMainWorks(newRequestWorks);
    }
    this.props.history.replace('/main', { subjectRows });
  }

  render() {
    const { subjectRows, worksInRow } = this.state;
    const { mainWorkLists } = this.props;
    const workLists = mainWorkLists.map((mainWorkList, idx) => {
      return (
        <WorkList
          key={mainWorkList.title + String(idx)}
          className={mainWorkList.title.toLowerCase().replace(/ /g, '-').slice(0, -1) + '-list'}
          subject={mainWorkList.title}
          workList={mainWorkList.works}
          rows={subjectRows[idx]}
          worksInRow={worksInRow}
          onClickWork={(workId) => this.onClickWork(workId)}
          onClickMore={() => this.onClickMore(idx)}
        />
      );
    });

    return (
      <div className="main-page">
        {workLists}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    mainWorkLists: state.work.mainWorkLists,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetMainWorks: (requestWorks) => dispatch(actionCreators.getMainWorks(requestWorks)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
