import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as workActionCreators from '../../store/actions/work';
import * as tagActionCreators from '../../store/actions/tag';

import TagSearchWindow from './TagSearchWindow';

const stubInitialReviewState = null;
const stubInitialTagState = {
  tags: [
    {
      key: 1,
      name: 'test1',
      selected: false,
      related: [2],
      prior: true,
    },
    {
      key: 2,
      name: 'test2',
      selected: false,
      related: [],
      prior: false,
    },
  ],
};
const stubInitialUserState = null;
const stubInitialWorkState = null;

const mockStore = getMockStore(stubInitialReviewState, stubInitialTagState, stubInitialUserState, stubInitialWorkState);

describe('<TagSearchWindow />', () => {
  let tagSearchWindow;
  let spyGetSearchTags;
  beforeEach(() => {
    tagSearchWindow = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact render={() => <TagSearchWindow className="tag-search-window" />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetSearchTags = jest.spyOn(tagActionCreators, 'getSearchTags')
      .mockImplementation(() => { return (dispatch) => {}; });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render tagSearchWindow', () => {
    const component = mount(tagSearchWindow);
    const wrapper = component.find('.tag-search-window');
    expect(wrapper.length).toBe(4);
  });
});
