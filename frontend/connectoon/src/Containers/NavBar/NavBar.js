import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actionCreators from '../../store/actions/index';

import './NavBar.css';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      clickUsername: false,
      searchWord: '',
    };
  }

  onClickLogin() {
    this.setState({ loggedIn: true });
  }

  onClickUsername() {
    const { clickUsername } = this.state;
    this.setState({ clickUsername: !clickUsername });
  }

  onClickMyPage() {
    const { clickUsername } = this.state;
    this.setState({ clickUsername: !clickUsername });
    const { history } = this.props;
    history.push('/mypage');
  }

  onClickMyReviews() {
    const { clickUsername } = this.state;
    this.setState({ clickUsername: !clickUsername });
    const { history } = this.props;
    history.push('/myreviews');
  }

  onClickLogout() {
    this.setState({ loggedIn: false });
    this.setState({ clickUsername: false });
  }

  onClickSearchGlass() {
    const { onPutSearchWord, history } = this.props;
    const { searchWord } = this.state;
    onPutSearchWord(searchWord);
    history.push('/search');
  }

  render() {
    const { className } = this.props;
    const { loggedIn, clickUsername } = this.state;

    return (
      <div className={className}>
        <div id="connectoon-logo-link">
          <Link id="connectoon-logo" to="/main">Connectoon</Link>
        </div>
        <div id="non-logo-links">
          <Link id="recommendation-tab" to="/recommendation">Recommendation</Link>
          <Link id="board-tab" to="/board">Board</Link>
          <Link id="search-tab" to="/search">Search</Link>
          <input id="search-input" type="text" placeholder="title, artist, #tag" onChange={(e) => this.setState({ searchWord: e.target.value })} />
          <button className="search-glass-wrapper" type="button" onClick={() => this.onClickSearchGlass()}>
            <img id="search-glass-icon" src="/images/search_glass_icon.png" alt="search" />
          </button>
        </div>
        <div id="user-account-button">
          {!loggedIn && <button id="login-button" className="nav-bar-buttons" type="button" onClick={() => this.onClickLogin()}>LogIn</button>}
          {loggedIn && <button id="username-button" className="nav-bar-buttons" type="button" onClick={() => this.onClickUsername()}>dooly9931</button>}
          {loggedIn && clickUsername && <button id="mypage-button" className="nav-bar-buttons" type="button" onClick={() => this.onClickMyPage()}>MyPage</button>}
          {loggedIn && clickUsername && <button id="myreviews-button" className="nav-bar-buttons" type="button" onClick={() => this.onClickMyReviews()}>MyReviews</button>}
          {loggedIn && clickUsername && <button id="logout-button" className="nav-bar-buttons" type="button" onClick={() => this.onClickLogout()}>LogOut</button>}
        </div>
      </div>
    );
  }
}

NavBar.propTypes = {
  className: PropTypes.string.isRequired,
  history: PropTypes.shape().isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPutSearchWord: (keyword) => dispatch(actionCreators.putSearchWord(keyword)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(NavBar));
