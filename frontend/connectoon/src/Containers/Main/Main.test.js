import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router';

import Main from './Main';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as workActionCreator from '../../store/actions/work';

jest.mock('../../Components/WorkList/WorkList', () => {
  return jest.fn(() => {
    return (
      <div className="spyWorkList">
        spyWorkList
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
      works: [
        JSON.stringify(stubWork),
      ],
    },
  ],
};

const mockStore = getMockStore(stubInitailReviewState, stubInitailTagState, stubInitailUserState, stubInitailWorkState);

describe('<Main />', () => {
  let main;
  let spyGetMainWork;
  beforeEach(() => {
    main = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={Main} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetMainWork = jest.spyOn(workActionCreator, 'getMainWorks')
      .mockImplementation(() => { return (dispatch) => {}; });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Main page and works', () => {
    const component = mount(main);
    expect(spyGetMainWork).toHaveBeenCalledTimes(1);
    let wrapper = component.find('.main-page');
    expect(wrapper.length).toBe(1);
    wrapper = component.find('.spyWorkList');
    expect(wrapper.length).toBe(1);
  });
});
