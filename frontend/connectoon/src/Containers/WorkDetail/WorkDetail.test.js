import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router';

import WorkDetail from './WorkDetail';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreator from '../../store/actions/work';

jest.mock('../../Components/WorkInfo/WorkInfo', () => {
  return jest.fn((props) => {
    return (
      <div className="spyWorkInfo">
        this is spy workinfo
      </div>
    );
  });
});

jest.mock('../../Components/WriteReview/WriteReview', () => {
  return jest.fn((props) => {
    return (
      <div className="spyWriteReview">
        this is spy writereview
      </div>
    );
  });
});

jest.mock('../../Components/DetailReview/DetailReview', () => {
  return jest.fn((props) => {
    return (
      <div className="spyDetailReview">
        this is spy detailreview
      </div>
    );
  });
});

const stubInitialReviewState = {
};

const stubInitialTagState = {
};

const stubInitialUserState = {
};

const stubWork = {
  id: 1, title: 'TEST_TITLE', description: 'TEST_DESC', link: 'TEST_LINK', thumbnail_picture: 'TEST_THUMB', platform_id: 0, year: 2000, tags: ['TAG1'], artists: ['NAME'],
};

const stubInitialWorkState = {
  selectedWork: stubWork,
};

const mockStore = getMockStore(stubInitialReviewState, stubInitialTagState, stubInitialUserState, stubInitialWorkState);

describe('<WorkDetail />', () => {
  let workDetail;
  let spyGetWork;
  beforeEach(() => {
    workDetail = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={WorkDetail} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetWork = jest.spyOn(actionCreator, 'getWork')
      .mockImplementation((id) => { return (dispatch) => {}; });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not render WorkInfo when there is no selectedWork', () => {
    const emptyStubInitialWorkState = {};
    const emptyMockStore = getMockStore(stubInitialReviewState, stubInitialTagState, stubInitialUserState, emptyStubInitialWorkState);
    workDetail = (
      <Provider store={emptyMockStore}>
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
  });

  it('should render WorkDetail', () => {
    const component = mount(workDetail);
    const wrapper = component.find('.work-detail');
    expect(wrapper.length).toBe(1);
    expect(spyGetWork).toHaveBeenCalledTimes(1);
  });
});
