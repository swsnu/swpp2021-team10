import axios from 'axios';

import store from '../store';
import * as workActionCreators from './work';

const stubWork = {
  id: 1, title: 'TEST_TITLE', thumbnail_image: 'TEST_SRC', platform_id: 0, year: 2000, artists: ['TEST_ARTIST'], score_avg: 0, completion: true,
};

describe('workActionCreators', () => {
  it('`getMainWorks` should fetch works correctly', (done) => {
    const stubMainWorksDict = {
      worklists: [
        {
          title: 'Test Works',
          works: [
            JSON.stringify(stubWork),
          ],
        },
      ],
    };
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation((url) => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubMainWorksDict,
          };
          resolve(result);
        });
      });
    store.dispatch(workActionCreators.getMainWorks()).then(() => {
      const newState = store.getState();
      expect(newState.work.mainWorkLists).toEqual(stubMainWorksDict.worklists);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
