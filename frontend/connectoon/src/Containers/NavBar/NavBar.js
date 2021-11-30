import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actionCreators from '../../store/actions/index';

import './NavBar.css';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickUsername: false,
      searchWord: '',
    };
  }

  onClickLogin() {
    const { history } = this.props;
    history.push('/login');
  }

  onClickUsername() {
    const { clickUsername } = this.state;
    this.setState({ clickUsername: !clickUsername });
  }

  onClickMyPage() {
    this.setState({ clickUsername: false });
    const { history } = this.props;
    history.push('/mypage');
  }

  onClickMyReviews() {
    this.setState({ clickUsername: false });
    const { history } = this.props;
    history.push('/myreviews');
  }

  onClickLogout() {
    this.setState({ clickUsername: false });
    const { onLogOut } = this.props;
    onLogOut();
  }

  onClickSearchGlass() {
    const { onPutSearchWord, history } = this.props;
    const { searchWord } = this.state;
    this.setState({ clickUsername: false });
    onPutSearchWord(searchWord);
    history.push('/search');
  }

  render() {
    const { className, loggedInUser } = this.props;
    const { clickUsername } = this.state;

    return (
      <div className={className}>
        <Link id="connectoon-logo" to="/main" onClick={() => this.setState({ clickUsername: false })}>Connectoon</Link>
        <Link id="recommendation-tab" to="/recommendation" onClick={() => this.setState({ clickUsername: false })}>Recommendation</Link>
        <Link id="board-tab" to="/board" onClick={() => this.setState({ clickUsername: false })}>Board</Link>
        <Link id="search-tab" to="/search" onClick={() => this.setState({ clickUsername: false })}>Search</Link>
        <input id="search-input" type="text" placeholder="title, artist, #tag" onChange={(e) => this.setState({ searchWord: e.target.value })} />
        <button id="search-glass-wrapper" type="button" onClick={() => this.onClickSearchGlass()}>
          <img id="search-glass-icon" src="/images/search_glass_icon.png" alt="search" />
        </button>
        {!loggedInUser && <button id="login-button" className="nav-bar-buttons" type="button" onClick={() => this.onClickLogin()}>LogIn</button>}
        {loggedInUser && <button id="username-button" className="nav-bar-buttons" type="button" onClick={() => this.onClickUsername()}>{loggedInUser.username}</button>}
        {loggedInUser && clickUsername && <button id="mypage-button" className="nav-bar-buttons" type="button" onClick={() => this.onClickMyPage()}>MyPage</button>}
        {loggedInUser && clickUsername && <button id="myreviews-button" className="nav-bar-buttons" type="button" onClick={() => this.onClickMyReviews()}>MyReviews</button>}
        {loggedInUser && clickUsername && <button id="logout-button" className="nav-bar-buttons" type="button" onClick={() => this.onClickLogout()}>LogOut</button>}
        <div id="navbar-right-margin" />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.user.loggedInUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPutSearchWord: (keyword) => dispatch(actionCreators.putSearchWord(keyword)),
    onLogOut: () => dispatch(actionCreators.logOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar));
