import React from 'react';
import './App.css';
import {
  Route, Redirect, Switch,
} from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ConnectedRouter } from 'connected-react-router';

import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { Provider } from 'react-redux';
import store, { history } from './store/store';
import Main from './Containers/Main/Main';
import NavBar from './Containers/NavBar/NavBar';
import Recommendation from './Containers/Recommendation/Recommendation';
import Board from './Containers/Board/Board';
import Search from './Containers/Search/Search';
import MyPage from './Containers/MyPage/MyPage';
import MyReviews from './Containers/MyReviews/MyReviews';
import WorkDetail from './Containers/WorkDetail/WorkDetail';
import Login from './Containers/Login/Login';
import Register from './Containers/Register/Register';
import AccountSettings from './Containers/AccountSettings/AccountSettings';
import UserPage from './Containers/UserPage/UserPage';

const persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <div className="App">
            <NavBar className="nav-bar" />
            <div className="nav-bar-empty-space" />
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar newestOnTop={false} closeOnClick={true} rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <Switch>
              <Route path="/main" exact component={Main} />
              <Route path="/recommendation" exact component={Recommendation} />
              <Route path="/board" exact component={Board} />
              <Redirect from="/search/:keyword/$" to="/search/:keyword" />
              <Route path="/search/:keyword" exact component={Search} />
              <Route path="/search" exact component={Search} />
              <Route path="/mypage" exact component={MyPage} />
              <Route path="/mypage/account_settings" exact component={AccountSettings} />
              <Route path="/myreviews" exact component={MyReviews} />
              <Route path="/works/:id" exact component={WorkDetail} />
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
              <Route path="/users/:id" exact component={UserPage} />
              <Redirect from="/" to="/main" />
            </Switch>
          </div>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
