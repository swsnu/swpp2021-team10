import reducer from './work';
import * as actionTypes from '../actions/actionTypes';

const stubInitialState = {
  works: [
  ],
  mainWorkLists: [
  ],
};

const stubWork = {
  id: 1, title: 'TEST_TITLE', thumbnail_image: 'TEST_SRC', platform_id: 0, year: 2000, artists: ['TEST_ARTIST'], score_avg: 0, completion: true,
};

const stubMainWorks = [
  {
    title: 'Test Works',
    works: [
      JSON.stringify(stubWork),
    ],
  },
];

describe('Work Reducer', () => {
  it('should return initialState', () => {
    const newState = reducer(stubInitialState, { type: undefined });
    expect(newState).toEqual(stubInitialState);
  });

  it('should return main works', () => {
    const newState = reducer(stubInitialState, { type: actionTypes.GET_MAIN_WORKS, mainWorkLists: stubMainWorks });
    expect(newState.mainWorkLists).toEqual(stubMainWorks);
  });
});
