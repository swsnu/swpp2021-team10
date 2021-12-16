import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router';

import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as reviewActionCreator from '../../store/actions/review';
import * as workActionCreator from '../../store/actions/work';
import MyReviews from './MyReviews';

jest.mock('../../Components/BoardReview/BoardReview', () => {
  return jest.fn((props) => {
    return (
      <tr className="spyBoardReview">
        <td>
          <div className="spyReview" onClick={() => props.onClickReview(props.review.work.id)} />
          <button type="button" className="spy-delete-button" onClick={() => props.onClickDeleteReview()} />
          <button type="button" className="spy-save-button" onClick={() => props.onClickSaveReview()} />
          <button type="button" className="spy-like-button" onClick={() => props.onClickLikeReview()} />
          <button type="button" className="spy-unlike-button" onClick={() => props.onClickUnlikeReview()} />
        </td>
      </tr>
    );
  });
});

const spyMain = (props) => {
  return <div className="spy-main" />;
};

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
    clickedLike: false,
  },
];

const stubInitialReviewState = {
  reviews: stubReviews,
};

const mockStore = getMockStore(stubInitialReviewState, stubInitialTagState, stubInitialUserState, stubInitialWorkState);

describe('<MyReviews />', () => {
  let myReviews;
  let spyGetMyReviews;
  let spyEditReview;
  let spyDeleteReview;
  let spyLikeReview;
  let spyUnlikeReview;
  let spyPutImage;
  beforeEach(() => {
    myReviews = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            {/* eslint-disable-next-line */}
            <Route path="/" exact render={(props) => <MyReviews {...props} />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetMyReviews = jest.spyOn(reviewActionCreator, 'getMyReviews')
      .mockImplementation(() => { return (dispatch) => {}; });
    spyEditReview = jest.spyOn(reviewActionCreator, 'editReview')
      .mockImplementation((id, reviewData) => { return (dispatch) => { return new Promise((resolve, reject) => resolve()); }; });
    spyDeleteReview = jest.spyOn(reviewActionCreator, 'deleteReview')
      .mockImplementation((id) => { return (dispatch) => { return new Promise((resolve, reject) => resolve()); }; });
    spyLikeReview = jest.spyOn(reviewActionCreator, 'postLike')
      .mockImplementation((id) => { return (dispatch) => { return new Promise((resolve, reject) => resolve()); }; });
    spyUnlikeReview = jest.spyOn(reviewActionCreator, 'postUnlike')
      .mockImplementation((id) => { return (dispatch) => { return new Promise((resolve, reject) => resolve()); }; });
    spyPutImage = jest.spyOn(workActionCreator, 'putImage')
      .mockImplementation((id) => { return (dispatch) => {}; });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render MyReviews page and reviews', () => {
    const component = mount(myReviews);
    expect(spyGetMyReviews).toHaveBeenCalledTimes(1);
    const wrapper = component.find('.myreview-table');
    expect(wrapper.length).toBe(1);
  });

  it('should handle review click', () => {
    const spyHistoryPush = jest.spyOn(history, 'push')
      .mockImplementation((path) => { });
    const component = mount(myReviews);
    const wrapper = component.find('.spyReview');
    wrapper.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    expect(spyHistoryPush).toHaveBeenCalledWith('/works/1');
  });

  it('should handle click edit', () => {
    const component = mount(myReviews);
    const wrapper = component.find('.spy-save-button');
    wrapper.simulate('click');
    expect(spyEditReview).toHaveBeenCalledTimes(1);
  });

  it('should handle modal and click delete', () => {
    const component = mount(myReviews);
    let wrapper = component.find('.spy-delete-button');
    wrapper.at(0).simulate('click');
    const newMyReviewsInstance = component.find(MyReviews.WrappedComponent).instance();
    expect(newMyReviewsInstance.state.modalIsOpen).toBeTruthy();
    expect(newMyReviewsInstance.state.targetReviewId).toBe(1);
    wrapper = component.find('.myreview-modal-cancel');
    wrapper.simulate('click');
    expect(newMyReviewsInstance.state.modalIsOpen).toBeFalsy();
    expect(newMyReviewsInstance.state.targetReviewId).toBe(null);
    wrapper = component.find('.spy-delete-button');
    wrapper.at(0).simulate('click');
    wrapper = component.find('.myreview-modal-confirm');
    wrapper.simulate('click');
    expect(spyDeleteReview).toHaveBeenCalledTimes(1);
  });

  it('should handle click like', () => {
    const component = mount(myReviews);
    const wrapper = component.find('.spy-like-button');
    wrapper.simulate('click');
    expect(spyLikeReview).toHaveBeenCalledTimes(1);
  });

  it('should handle click unlike', () => {
    const component = mount(myReviews);
    const wrapper = component.find('.spy-unlike-button');
    wrapper.simulate('click');
    expect(spyUnlikeReview).toHaveBeenCalledTimes(1);
  });

  it('should be redirected to login when not logged in', () => {
    const newmockStore = getMockStore(stubInitialReviewState, stubInitialTagState, { loggedInUser: false }, stubInitialWorkState);
    const myNewReviews = (
      <Provider store={newmockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            {/* eslint-disable-next-line */}
            <Route path="/" exact render={(props) => <MyReviews {...props} />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const spyHistoryPush = jest.spyOn(history, 'push')
      .mockImplementation((path) => { });
    const component = mount(myNewReviews);
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    expect(spyHistoryPush).toHaveBeenCalledWith('/login');
  });

  it('should be redirected to main when clicked log out', () => {
    const newMyReviews = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            {/* eslint-disable-next-line */}
            <Route path="/" exact render={(props) => <MyReviews {...props} />} />
            <Route path="/main" exact render={() => spyMain()} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(newMyReviews);
    console.log(component.debug());
    const wrapper = component.find('.spy-main');
    expect(wrapper.length).toBe(1);
  });
});
