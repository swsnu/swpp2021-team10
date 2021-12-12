import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router';

import WorkDetail from './WorkDetail';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as workActionCreator from '../../store/actions/work';
import * as reviewActionCreator from '../../store/actions/review';

jest.mock('../../Components/WriteReview/WriteReview', () => {
  return jest.fn((props) => {
    return (
      <div className="spyWriteReview">
        <button type="button" className="spy-confirm-button" onClick={() => props.onClickReviewConfirm()} />
      </div>
    );
  });
});

jest.mock('../../Components/DetailReview/DetailReview', () => {
  return jest.fn((props) => {
    return (
      <div className="spyDetailReview">
        <button type="button" className="spy-delete-button" onClick={() => props.onClickDeleteReview()} />
        <button type="button" className="spy-save-button" onClick={() => props.onClickSaveReview()} />
        <button type="button" className="spy-like-button" onClick={() => props.onClickLikeReview()} />
        <button type="button" className="spy-unlike-button" onClick={() => props.onClickUnlikeReview()} />
      </div>
    );
  });
});

const stubInitialTagState = {
};

const stubLoggedInUser = {
  id: 1,
};

const stubWork = {
  id: 1,
  title: 'TEST_TITLE',
  description: 'TEST_DESC',
  link: 'TEST_LINK',
  thumbnail_picture: 'TEST_THUMB',
  platform_id: 0,
  year: 2000,
  tags: ['TAG1'],
  artists: ['NAME'],
  score_avg: 4.0,
};

describe('<WorkDetail />', () => {
  let spyGetWork;
  let spyPostReview;
  let spyGetWorkReviews;
  let spyEditReview;
  let spyDeleteReview;
  let spyLikeReview;
  let spyUnlikeReview;
  beforeEach(() => {
    spyGetWork = jest.spyOn(workActionCreator, 'getWork')
      .mockImplementation((id) => { return (dispatch) => {}; });
    spyPostReview = jest.spyOn(workActionCreator, 'postWorkReview')
      .mockImplementation((id, reviewData) => { return (dispatch) => { return new Promise((resolve, reject) => resolve()); }; });
    spyGetWorkReviews = jest.spyOn(reviewActionCreator, 'getWorkReviews')
      .mockImplementation((id) => { return (dispatch) => {}; });
    spyEditReview = jest.spyOn(reviewActionCreator, 'editReview')
      .mockImplementation((id, reviewData) => { return (dispatch) => { return new Promise((resolve, reject) => resolve()); }; });
    spyDeleteReview = jest.spyOn(reviewActionCreator, 'deleteReview')
      .mockImplementation((id) => { return (dispatch) => { return new Promise((resolve, reject) => resolve()); }; });
    spyLikeReview = jest.spyOn(reviewActionCreator, 'postLike')
      .mockImplementation((id) => { return (dispatch) => { return new Promise((resolve, reject) => resolve()); }; });
    spyUnlikeReview = jest.spyOn(reviewActionCreator, 'postUnlike')
      .mockImplementation((id) => { return (dispatch) => { return new Promise((resolve, reject) => resolve()); }; });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render 'No Such Work!' when there is no such work", () => {
    const stubInitialUserState = {
      loggedInUser: null,
    };
    const stubInitialWorkState = {
      selectedWork: null,
      noSuchSelectedWork: true,
    };
    const stubInitialReviewState = {
      reviews: [],
    };
    const mockStore = getMockStore(stubInitialReviewState, stubInitialTagState, stubInitialUserState, stubInitialWorkState);
    const workDetail = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={WorkDetail} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(workDetail);
    const wrapper = component.find('h2');
    expect(wrapper.text()).toBe('No Such Work!');
    expect(spyGetWork).toHaveBeenCalledTimes(1);
    expect(spyGetWorkReviews).toHaveBeenCalledTimes(1);
  });

  it('should render nothing before selectedWork is initialized', () => {
    const stubInitialUserState = {
      loggedInUser: null,
    };
    const stubInitialWorkState = {
      selectedWork: null,
      noSuchSelectedWork: false,
    };
    const stubInitialReviewState = {
      reviews: [],
    };
    const mockStore = getMockStore(stubInitialReviewState, stubInitialTagState, stubInitialUserState, stubInitialWorkState);
    const workDetail = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={WorkDetail} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(workDetail);
    const wrapper = component.find('.work-info');
    expect(wrapper.length).toBe(0);
    expect(spyGetWork).toHaveBeenCalledTimes(1);
    expect(spyGetWorkReviews).toHaveBeenCalledTimes(1);
  });

  it('should render WorkDetail', () => {
    const stubInitialUserState = {
      loggedInUser: null,
    };
    const stubInitialWorkState = {
      selectedWork: stubWork,
      noSuchSelectedWork: false,
    };
    const stubInitialReviewState = {
      reviews: [],
    };
    const mockStore = getMockStore(stubInitialReviewState, stubInitialTagState, stubInitialUserState, stubInitialWorkState);
    const workDetail = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={WorkDetail} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(workDetail);
    const wrapper = component.find('.work-detail');
    expect(wrapper.length).toBe(1);
    expect(spyGetWork).toHaveBeenCalledTimes(1);
  });

  it('should handle click review confirm', () => {
    const stubInitialUserState = {
      loggedInUser: stubLoggedInUser,
    };
    const stubInitialWorkState = {
      selectedWork: stubWork,
      noSuchSelectedWork: false,
    };
    const stubInitialReviewState = {
      reviews: [],
    };
    const mockStore = getMockStore(stubInitialReviewState, stubInitialTagState, stubInitialUserState, stubInitialWorkState);
    const workDetail = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={WorkDetail} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(workDetail);
    const wrapper = component.find('.spy-confirm-button');
    wrapper.simulate('click');
    expect(spyPostReview).toHaveBeenCalledTimes(1);
    // expect(spyGetWork).toHaveBeenCalledTimes(1);
    // expect(spyGetWorkReviews).toHaveBeenCalledTimes(1);
  });

  it('should handle click delete', () => {
    const stubInitialUserState = {
      loggedInUser: stubLoggedInUser,
    };
    const stubInitialWorkState = {
      selectedWork: stubWork,
      noSuchSelectedWork: false,
    };
    const stubInitialReviewState = {
      reviews: [
        { id: 1, author: { id: 1 } },
      ],
    };
    const mockStore = getMockStore(stubInitialReviewState, stubInitialTagState, stubInitialUserState, stubInitialWorkState);
    const workDetail = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={WorkDetail} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(workDetail);
    const wrapper = component.find('.spy-delete-button');
    wrapper.simulate('click');
    expect(spyDeleteReview).toHaveBeenCalledTimes(1);
    // expect(spyGetWork).toHaveBeenCalledTimes(1);
    // expect(spyGetWorkReviews).toHaveBeenCalledTimes(1);
  });

  it('should handle click save', () => {
    const stubInitialUserState = {
      loggedInUser: stubLoggedInUser,
    };
    const stubInitialWorkState = {
      selectedWork: stubWork,
      noSuchSelectedWork: false,
    };
    const stubInitialReviewState = {
      reviews: [
        { id: 1, author: { id: 1 } },
      ],
    };
    const mockStore = getMockStore(stubInitialReviewState, stubInitialTagState, stubInitialUserState, stubInitialWorkState);
    const workDetail = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={WorkDetail} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(workDetail);
    const wrapper = component.find('.spy-save-button');
    wrapper.simulate('click');
    expect(spyEditReview).toHaveBeenCalledTimes(1);
    // expect(spyGetWork).toHaveBeenCalledTimes(1);
    // expect(spyGetWorkReviews).toHaveBeenCalledTimes(1);
  });

  it("should render my and others' reviews", () => {
    const stubInitialUserState = {
      loggedInUser: stubLoggedInUser,
    };
    const stubInitialWorkState = {
      selectedWork: stubWork,
      noSuchSelectedWork: false,
    };
    const stubInitialReviewState = {
      reviews: [
        { id: 1, author: { id: 1 } },
        { id: 2, author: { id: 2 } },
      ],
    };
    const mockStore = getMockStore(stubInitialReviewState, stubInitialTagState, stubInitialUserState, stubInitialWorkState);
    const workDetail = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={WorkDetail} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(workDetail);
    let wrapper = component.find('.my-review-region');
    expect(wrapper.length).toBe(1);
    wrapper = component.find('#work-reviews-header');
    expect(wrapper.text()).toBe('Reviews(2)');
  });

  it("should render others' reviews only", () => {
    const stubInitialUserState = {
      loggedInUser: stubLoggedInUser,
    };
    const stubInitialWorkState = {
      selectedWork: stubWork,
      noSuchSelectedWork: false,
    };
    const stubInitialReviewState = {
      reviews: [
        { id: 1, author: { id: 2 } },
        { id: 2, author: { id: 3 } },
      ],
    };
    const mockStore = getMockStore(stubInitialReviewState, stubInitialTagState, stubInitialUserState, stubInitialWorkState);
    const workDetail = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={WorkDetail} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(workDetail);
    let wrapper = component.find('.others-review-region');
    expect(wrapper.length).toBe(1);
    wrapper = component.find('#work-reviews-header');
    expect(wrapper.text()).toBe('Reviews(2)');
  });

  it('should handle clicking tag', () => {
    const stubInitialUserState = {
      loggedInUser: stubLoggedInUser,
    };
    const stubInitialWorkState = {
      selectedWork: stubWork,
      noSuchSelectedWork: false,
    };
    const stubInitialReviewState = {
      reviews: [
        { id: 1, author: { id: 1 } },
        { id: 2, author: { id: 2 } },
      ],
    };
    const mockStore = getMockStore(stubInitialReviewState, stubInitialTagState, stubInitialUserState, stubInitialWorkState);
    const workDetail = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={WorkDetail} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const spyHistoryPush = jest.spyOn(history, 'push')
      .mockImplementation((path) => { });
    const component = mount(workDetail);
    const wrapper = component.find('.genre-tag');
    wrapper.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    expect(spyHistoryPush).toHaveBeenCalledWith('/search/$TAG1');
  });

  it('should handle click like with my review', () => {
    const stubInitialUserState = {
      loggedInUser: stubLoggedInUser,
    };
    const stubInitialWorkState = {
      selectedWork: stubWork,
      noSuchSelectedWork: false,
    };
    const stubInitialReviewState = {
      reviews: [
        { id: 1, author: { id: 1 }, clickedLike: false },
        { id: 2, author: { id: 3 }, clickedLike: false },
      ],
    };
    const mockStore = getMockStore(stubInitialReviewState, stubInitialTagState, stubInitialUserState, stubInitialWorkState);
    const workDetail = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={WorkDetail} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(workDetail);
    let wrapper = component.find('.spy-like-button').first();
    wrapper.simulate('click');
    expect(spyLikeReview).toHaveBeenCalledTimes(1);

    wrapper = component.find('.spy-like-button').at(1);
    wrapper.simulate('click');
    expect(spyLikeReview).toHaveBeenCalledTimes(2);
    wrapper = component.find('.spy-unlike-button').at(1);
    wrapper.simulate('click');
    expect(spyUnlikeReview).toHaveBeenCalledTimes(1);
  });

  it('should handle click unlike with my review', () => {
    const stubInitialUserState = {
      loggedInUser: stubLoggedInUser,
    };
    const stubInitialWorkState = {
      selectedWork: stubWork,
      noSuchSelectedWork: false,
    };
    const stubInitialReviewState = {
      reviews: [
        { id: 1, author: { id: 1 }, clickedLike: true },
      ],
    };
    const mockStore = getMockStore(stubInitialReviewState, stubInitialTagState, stubInitialUserState, stubInitialWorkState);
    const workDetail = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={WorkDetail} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(workDetail);
    const wrapper = component.find('.spy-unlike-button').first();
    wrapper.simulate('click');
    expect(spyUnlikeReview).toHaveBeenCalledTimes(1);
  });

  it('should handle click like without my review', () => {
    const stubInitialUserState = {
      loggedInUser: stubLoggedInUser,
    };
    const stubInitialWorkState = {
      selectedWork: stubWork,
      noSuchSelectedWork: false,
    };
    const stubInitialReviewState = {
      reviews: [
        { id: 1, author: { id: 2 }, clickedLike: false },
        { id: 2, author: { id: 3 }, clickedLike: true },
      ],
    };
    const mockStore = getMockStore(stubInitialReviewState, stubInitialTagState, stubInitialUserState, stubInitialWorkState);
    const workDetail = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={WorkDetail} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(workDetail);
    let wrapper = component.find('.spy-like-button').first();
    wrapper.simulate('click');
    expect(spyLikeReview).toHaveBeenCalledTimes(1);
    wrapper = component.find('.spy-unlike-button').first();
    wrapper.simulate('click');
    expect(spyUnlikeReview).toHaveBeenCalledTimes(1);

    wrapper = component.find('.spy-like-button').at(1);
    wrapper.simulate('click');
    expect(spyLikeReview).toHaveBeenCalledTimes(2);
    wrapper = component.find('.spy-unlike-button').at(1);
    wrapper.simulate('click');
    expect(spyUnlikeReview).toHaveBeenCalledTimes(2);
  });
});
