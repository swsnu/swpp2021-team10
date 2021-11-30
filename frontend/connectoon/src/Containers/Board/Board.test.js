import React from 'react';
import { mount, shallow } from 'enzyme';
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
      <tr className="spyBoardReview">
        <td>
          <div className="spyReview" onClick={() => props.onClickReview(props.review.work.id)} />
          <button type="button" className="spy-delete-button" onClick={() => props.onClickDeleteReview()} />
          <button type="button" className="spy-save-button" onClick={() => props.onClickSaveReview()} />
        </td>
      </tr>
    );
  });
});

const stubInitialWorkState = {
};

const stubInitialTagState = {
};

const stubLoggedInUser = {
  id: 1,
};

const stubInitialUserState = {
  loggedInUser: stubLoggedInUser,
};

const stubWork = {
  id: 1, title: 'TEST_TITLE', thumbnail_image: 'TEST_SRC', platform_id: 0, year: 2000, artists: ['TEST_ARTIST'], score_avg: 0, completion: true,
};

const stubAuthor = [
  {
    id: 1,
    email: 'dummy@swpp.com',
    profile_img: '',
    username: 'dummyuser',
  },
];

const stubReviews = [
  {
    id: 1,
    work: stubWork,
    author: {
      id: 1,
      email: 'dummy@swpp.com',
      profile_img: '',
      username: 'dummyuser',
    },
    score: 3.5,
    likes: 10,
    title: 'Dummy Review Title',
    content: 'Dummy Content\nLong\nLong\nLogn\nLong\nFinish\n',
  },
];

const stubInitialReviewState = {
  reviews: stubReviews,
};

const mockStore = getMockStore(stubInitialReviewState, stubInitialTagState, stubInitialUserState, stubInitialWorkState);

describe('<Board />', () => {
  let board;
  let spyGetBoardReviews;
  let spyEditReview;
  let spyDeleteReview;
  beforeEach(() => {
    board = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            {/* eslint-disable-next-line */}
            <Route path="/" exact render={(props) => <Board {...props} />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetBoardReviews = jest.spyOn(reviewActionCreator, 'getBoardReviews')
      .mockImplementation(() => { return (dispatch) => {}; });
    spyEditReview = jest.spyOn(reviewActionCreator, 'editReview')
      .mockImplementation((id, reviewData) => { return (dispatch) => { return new Promise((resolve, reject) => resolve()); }; });
    spyDeleteReview = jest.spyOn(reviewActionCreator, 'deleteReview')
      .mockImplementation((id) => { return (dispatch) => { return new Promise((resolve, reject) => resolve()); }; });
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

  it('should handle review click', () => {
    const spyHistoryPush = jest.spyOn(history, 'push')
      .mockImplementation((path) => { });
    const component = mount(board);
    const wrapper = component.find('.spyReview');
    wrapper.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    expect(spyHistoryPush).toHaveBeenCalledWith('/works/1');
  });

  it('should handle click edit', () => {
    const component = mount(board);
    const wrapper = component.find('.spy-save-button');
    wrapper.simulate('click');
    expect(spyEditReview).toHaveBeenCalledTimes(1);
  });

  it('should handle click delete', () => {
    const component = mount(board);
    const wrapper = component.find('.spy-delete-button');
    wrapper.simulate('click');
    expect(spyDeleteReview).toHaveBeenCalledTimes(1);
  });
});
