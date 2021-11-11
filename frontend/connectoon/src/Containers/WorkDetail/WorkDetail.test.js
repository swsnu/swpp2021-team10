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

jest.mock('../../components/WriteReview/WriteReview', () => {
  return jest.fn((props) => {
    return (
      <div className="spyWriteReview">
        this is spy writereview
      </div>
    );
  });
});

jest.mock('../../components/DetailReview/DetailReview', () => {
  return jest.fn((props) => {
    return (
      <div className="spyDetailReview">
        this is spy detailreview
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

const stubInitailWorkState = {
  selectedWork: {
    id: 1, title: 'TEST_TITLE', description: 'TEST_DESC', link: 'TEST_LINK', thumbnail_picture: 'TEST_THUMB', platform_id: 0, year: 2000, tags: ['TAG1'], artists: ['NAME'],
  },
};

const mockStore = getMockStore(stubInitailReviewState, stubInitailTagState, stubInitailUserState, stubInitailWorkState);

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

  it('should render WorkDetail', () => {
    const component = mount(workDetail);
    const wrapper = component.find('.work-detail');
    expect(wrapper.length).toBe(1);
    expect(spyGetWork).toHaveBeenCalledTimes(1);
  });
});
