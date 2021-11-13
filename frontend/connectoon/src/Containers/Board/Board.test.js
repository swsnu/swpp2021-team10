import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router';

import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as reviewActionCreator from '../../store/actions/review';
import Board from './Board';

jest.mock('../../Components/BoardReview/BoardReview', () => {
  return jest.fn((props) => {
    return (
      <div className="spyBoardReview">
        <div className="spyReview" />
      </div>
    );
  });
});

const stubInitailReviewState = {
};

const stubInitailTagState = {
};

const stubInitailUserState = {
};

const stubWork = {
  id: 1, title: 'TEST_TITLE', thumbnail_image: 'TEST_SRC', platform_id: 0, year: 2000, artists: ['TEST_ARTIST'], score_avg: 0, completion: true,
};

const stubInitailWorkState = {
  mainWorkLists: [
    {
      title: 'Test Works',
      works: JSON.stringify([stubWork]),
    },
  ],
};

const mockStore = getMockStore(stubInitailReviewState, stubInitailTagState, stubInitailUserState, stubInitailWorkState);

describe('<Board />', () => {
  let board;
  let spyGetBoardReviews;
  beforeEach(() => {
    board = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact render={() => <Board />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetBoardReviews = jest.spyOn(reviewActionCreator, 'getBoardReviews')
      .mockImplementation(() => { return (dispatch) => {}; });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Board page and reviews', () => {
    const component = mount(board);
    expect(spyGetBoardReviews).toHaveBeenCalledTimes(1);
    const wrapper = component.find('.board-table');
    expect(wrapper.length).toBe(1);
  });
});
