import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import reviewReducer from './reducers/review';
import tagReducer from './reducers/tag';
import userReducer from './reducers/user';
import workReducer from './reducers/work';

export const history = createBrowserHistory();
const rootReducer = combineReducers({
  review: reviewReducer,
  tag: tagReducer,
  user: userReducer,
  work: workReducer,
  router: connectRouter(history),
});
export const middlewares = [thunk, routerMiddleware(history)];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(...middlewares),
  ),
);

export default store;
