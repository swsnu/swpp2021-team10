import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './NavBar.css';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false, clickUsername: false };
  }

  onClickLogin() {
    this.setState({ loggedIn: true });
  }

  onClickUsername() {
    const { clickUsername } = this.state;
    this.setState({ clickUsername: !clickUsername });
  }

  onClickLogout() {
    this.setState({ loggedIn: false });
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
          <input id="search-input" type="text" placeholder="title, artist, #tag" />
          <img id="search-glass-icon" src="/images/search_glass_icon.png" alt="search" />
        </div>
        <div id="user-account-button">
          {!loggedIn && <button id="login-button" className="nav-bar-buttons" type="button" onClick={() => this.onClickLogin()} onMouseEnter>LogIn</button>}
          {loggedIn && <button id="username-button" className="nav-bar-buttons" type="button" onClick={() => this.onClickUsername()}>dooly9931</button>}
          {loggedIn && clickUsername && <button id="mypage-button" className="nav-bar-buttons" type="button">MyPage</button>}
          {loggedIn && clickUsername && <button id="myreviews-button" className="nav-bar-buttons" type="button">MyReviews</button>}
          {loggedIn && clickUsername && <button id="logout-button" className="nav-bar-buttons" type="button" onClick={() => this.onClickLogout()}>LogOut</button>}
        </div>
      </div>
    );
  }
}

NavBar.propTypes = {
  className: PropTypes.string.isRequired,
};

export default NavBar;
