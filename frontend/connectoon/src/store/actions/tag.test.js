import axios from 'axios';

import * as actionCreators from './tag';
import store from '../store';

const stubTag = {
  id: 0,
};

describe('ActionCreators', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('\'getSearchTags\' should fetch tags correctly', (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubTag,
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.getSearchTags('test')).then(() => {
      const newState = store.getState();
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
