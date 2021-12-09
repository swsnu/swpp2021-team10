import React, { Component } from 'react';
import { connect } from 'react-redux';

import WorkList from '../../Components/WorkList/WorkList';
import './Main.css';
import * as actionCreators from '../../store/actions/index';
import { stateConstructor, stateUpdator } from '../WorkPaginationTools/tools';

class Main extends Component {
  constructor(props) {
    super(props);
    const { location } = this.props;
    this.state = stateConstructor(location);
  }

  componentDidMount() {
    this.props.onGetMainWorks(this.state.requestWorks);
  }

  onClickWork = (workId) => {
    this.props.history.push('/works/' + String(workId));
  }

  onClickMore = (listId) => {
    const { subjectRows, newRequestWorks, fetchMore } = stateUpdator(listId, this.state);
    this.setState({ subjectRows, requestWorks: newRequestWorks });
    if (fetchMore) {
      this.props.onGetMainWorks(newRequestWorks);
    }
    const { history } = this.props;
    history.replace('/main', { subjectRows });
  }

  render() {
    const { subjectRows, worksInRow } = this.state;
    const { mainWorkLists } = this.props;
    const workLists = mainWorkLists?.map((mainWorkList, idx) => {
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
