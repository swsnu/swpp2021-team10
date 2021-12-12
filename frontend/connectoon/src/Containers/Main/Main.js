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
    const requestWorks = subjectRows.map((rows) => { return worksInRow * (rows + pageRowIncrement); });
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
    const newRequestWorks = requestWorks.map((requestWork, idx) => {
      return worksInRow * (subjectRows[idx] + rowIncrement) >= requestWork ? requestWork + worksInRow * pageRowIncrement : requestWork;
    });
    if (JSON.stringify(requestWorks) !== JSON.stringify(newRequestWorks)) {
      this.setState({ requestWorks: newRequestWorks });
      this.props.onGetMainWorks(newRequestWorks);
    }
    this.setState({ subjectRows });
    this.props.history.replace('/main', { subjectRows });
  }

  render() {
    // console.log(this.props.history);
    const { subjectRows, worksInRow } = this.state;
    const { mainWorkLists } = this.props;
    const workLists = mainWorkLists.map((mainWorkList, idx) => {
      return (
        <WorkList
          key={mainWorkList.title + String(idx)}
          className={mainWorkList.title.toLowerCase().replace(/ /g, '-').slice(0, -1) + '-list'}
          subject={mainWorkList.title}
          workList={JSON.parse(mainWorkList.works)}
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
