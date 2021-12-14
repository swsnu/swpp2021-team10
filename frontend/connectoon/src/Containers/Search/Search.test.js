import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch, MemoryRouter } from 'react-router-dom';

import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as workActionCreators from '../../store/actions/work';
import * as tagActionCreators from '../../store/actions/tag';

import Search from './Search';

jest.mock('../../Components/WorkList/WorkList', () => {
  return jest.fn((props) => {
    return (
      <div className="spyWorkList">
        <div className="spyWork" onClick={() => props.onClickWork(props.workList[0].id)} />
        <div className="spyMore" onClick={() => props.onClickMore()} />
      </div>
    );
  });
});

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
const stubInitialWorkState = {
  selectedWork: null,
  searchedWorks: [
    [{ id: 1 }, { id: 2 }],
    [{ id: 3 }],
  ],
  selectedReviews: [
  ],
  searchWord: '',
};

const mockStore = getMockStore(stubInitialReviewState, stubInitialTagState, stubInitialUserState, stubInitialWorkState);

describe('<Search />', () => {
  let search;
  let spyGetSearchWorks;
  let spyGetSearchTags;
  let spyHistoryReplace;
  beforeEach(() => {
    search = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact render={() => <Search className="search" />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetSearchWorks = jest.spyOn(workActionCreators, 'getSearchWorks')
      .mockImplementation((keyword, keytag, requestWorks) => { return (dispatch) => {}; });
    spyGetSearchTags = jest.spyOn(tagActionCreators, 'getSearchTags')
      .mockImplementation((keyword) => { return (dispatch) => {}; });
    spyHistoryReplace = jest.spyOn(history, 'replace')
      .mockImplementation((path, state) => { return (dispatch) => { }; });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Search', () => {
    const component = mount(search);
    const wrapper = component.find('.search');
    expect(wrapper.length).toBe(4);

    const mockedEvent = {
      target: {
        value: 'hello',
      },
    };
    component.find('input').at(0).simulate('change', mockedEvent);
  });

  it('should handle tag methods', () => {
    const component = mount(search);
    component.find('.selected-tag-body').at(0).simulate('click');
    component.find('.tag-delete-button').at(0).simulate('click');
    component.find('.selected-tag-body').at(0).simulate('click');

    const mockedEvent = {
      target: {
        value: 'test',
      },
    };
    component.find('input').at(1).simulate('change', mockedEvent);
  });

  it('should handle tag params', () => {
    const stubInitialTagStateTest = {
      tags: [],
    };
    const mockStoreTest = getMockStore(stubInitialReviewState, stubInitialTagStateTest, stubInitialUserState, stubInitialWorkState);
    const searchTest = (
      <Provider store={mockStoreTest}>
        <MemoryRouter initialEntries={['/search/$test']}>
          <Switch>
            <Route path="/search/:keyword" exact render={() => <Search className="search" />} />
          </Switch>
        </MemoryRouter>
      </Provider>
    );
    const component = mount(searchTest);
  });

  it('should handle searchword params', () => {
    const stubInitialTagStateTest = {
      tags: [],
    };
    const mockStoreTest = getMockStore(stubInitialReviewState, stubInitialTagStateTest, stubInitialUserState, stubInitialWorkState);
    const searchTest = (
      <Provider store={mockStoreTest}>
        <MemoryRouter initialEntries={['/search/test']}>
          <Switch>
            <Route path="/search/:keyword" exact render={() => <Search className="search" />} />
          </Switch>
        </MemoryRouter>
      </Provider>
    );
    const component = mount(searchTest);
  });

  it('should handle clicking work object', () => {
    const spyHistoryPush = jest.spyOn(history, 'push')
      .mockImplementation((path) => { });
    const component = mount(search);
    const mockedEvent = { target: { value: 'test' } };
    component.find('#search-title-artist-input').at(0).simulate('change', mockedEvent);
    const wrapper = component.find('.spyWork');
    wrapper.at(0).simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    expect(spyHistoryPush).toHaveBeenCalledWith('/works/1');
    wrapper.at(1).simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledTimes(2);
    expect(spyHistoryPush).toHaveBeenLastCalledWith('/works/3');
  });

  it('should handle more click', () => {
    const component = mount(search);
    const mockedEvent = { target: { value: 'test' } };
    component.find('#search-title-artist-input').at(0).simulate('change', mockedEvent);
    expect(spyHistoryReplace).toHaveBeenCalledTimes(1);

    const wrapper = component.find('.spyMore');
    wrapper.at(0).simulate('click');
    const newSearchInstance = component.find(Search.WrappedComponent).instance();
    expect(newSearchInstance.state.subjectRows[0]).toBe(3);
    expect(spyHistoryReplace).toHaveBeenCalledTimes(2);
    // expect(spyHistoryReplace).toHaveBeenLastCalledWith('/search', { subjectRows: [3, 1] });

    wrapper.at(1).simulate('click');
    expect(newSearchInstance.state.subjectRows[1]).toBe(3);
    expect(spyHistoryReplace).toHaveBeenCalledTimes(3);
  });

  it('should fetch more works when enough more clicks are given', () => {
    const stubWorks = Array.from({ length: 48 }).map((idx) => {
      return { id: idx };
    });
    const stubInitialManyWorkState = {
      selectedWork: null,
      searchedWorks: [stubWorks, stubWorks],
      selectedReviews: [
      ],
      searchWord: '',
    };
    const manyWorkMockStore = getMockStore(stubInitialReviewState, stubInitialTagState, stubInitialUserState, stubInitialManyWorkState);
    search = (
      <Provider store={manyWorkMockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact render={() => <Search className="search" />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(search);
    const wrapper = component.find('.spyMore');
    expect(spyGetSearchWorks).toHaveBeenCalledTimes(1);
    expect(spyGetSearchWorks).toHaveBeenCalledWith('', '', [[0, 24], [0, 24]]);
    wrapper.at(0).simulate('click');
    wrapper.at(0).simulate('click');
    expect(spyGetSearchWorks).toHaveBeenCalledTimes(2);
    expect(spyGetSearchWorks).toHaveBeenLastCalledWith('', '', [[24, 44], [24, 24]]);
  });
});
