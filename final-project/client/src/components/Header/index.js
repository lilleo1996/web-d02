import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './style.scss';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <p className="header__label">Header</p>
        <nav className="header__navigation-bar">
          <Link to="/home">
            Home
          </Link>
          <Link to="/sign-in">
            Sign In
          </Link>
          <Link to="/sign-up">
            Sign Up
          </Link>
        </nav>
      </div>
    );
  }
}

export default Header;