import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import { connectRouter } from 'connected-react-router';

import { history, middlewares } from '../store/store';

// import * as actionTypes from '../store/actions/actionType';

const getMockReviewReducer = jest.fn(
  (initialState) => (state = initialState, action) => {
    switch (action.type) {
      default:
        break;
    }
    return state;
  },
);

const getMockTagReducer = jest.fn(
  (initialState) => (state = initialState, action) => {
    switch (action.type) {
      default:
        break;
    }
    return state;
  },
);

const getMockUserReducer = jest.fn(
  (initialState) => (state = initialState, action) => {
    switch (action.type) {
      default:
        break;
    }
    return state;
  },
);

const getMockWorkReducer = jest.fn(
  (initialState) => (state = initialState, action) => {
    switch (action.type) {
      default:
        break;
    }
    return state;
  },
);

export const getMockStore = (initialReviewState, initialTagState, initialUserState, initialWorkState) => {
  const mockReviewReducer = getMockReviewReducer(initialReviewState);
  const mockTagReducer = getMockTagReducer(initialTagState);
  const mockUserReducer = getMockUserReducer(initialUserState);
  const mockWorkReducer = getMockWorkReducer(initialWorkState);
  const rootReducer = combineReducers({
    re: mockReviewReducer,
    ta: mockTagReducer,
    us: mockUserReducer,
    wo: mockWorkReducer,
    router: connectRouter(history),
  });
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const mockStore = createStore(rootReducer,
    composeEnhancers(applyMiddleware(...middlewares)));
  return mockStore;
};
