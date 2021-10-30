import React from 'react';
import './App.css';
import {
  BrowserRouter, Route, Redirect, Switch,
} from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store/store';
import Main from './Containers/Main/Main';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/main" exact component={Main} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
