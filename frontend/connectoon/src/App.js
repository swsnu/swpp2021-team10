import React from 'react';
import './App.css';
import {
  Route, Redirect, Switch,
} from 'react-router-dom';

import { ConnectedRouter } from 'connected-react-router';

import { Provider } from 'react-redux';
import store, { history } from './store/store';
import Main from './Containers/Main/Main';
import NavBar from './Containers/NavBar/NavBar';
import Recommendation from './Containers/Recommendation/Recommendation';
import Board from './Containers/Board/Board';
import Search from './Containers/Search/Search';
import MyPage from './Containers/MyPage/MyPage';
import MyReviews from './Containers/MyReviews/MyReviews';

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div className="App">
          <NavBar className="nav-bar" />
          <div className="nav-bar-empty-space" />
          <Switch>
            <Route path="/main" exact component={Main} />
            <Route path="/recommendation" exact component={Recommendation} />
            <Route path="/board" exact component={Board} />
            <Route path="/search" exact component={Search} />
            <Route path="/mypage" exact component={MyPage} />
            <Route path="/myreviews" exact component={MyReviews} />
            <Redirect from="/" to="/main" />
          </Switch>
        </div>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
