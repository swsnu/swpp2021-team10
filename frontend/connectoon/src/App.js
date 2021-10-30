import React from 'react';
import './App.css';
import {
  BrowserRouter, Route, Redirect, Switch,
} from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store/store';
import Main from './Containers/Main/Main';
import NavBar from './Components/NavBar/NavBar';
import Recommendation from './Containers/Recommendation/Recommendation';
import Board from './Containers/Board/Board';
import Search from './Containers/Search/Search';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <NavBar className="nav-bar" />
          <div className="nav-bar-empty-space" />
          <Switch>
            <Route path="/main" exact component={Main} />
            <Route path="/recommendation" exact component={Recommendation} />
            <Route path="/board" exact component={Board} />
            <Route path="/search" exact component={Search} />
            <Redirect from="/" to="/main" />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
