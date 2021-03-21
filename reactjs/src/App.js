import React, { Component } from 'react';

import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <Home />
        <Footer />
      </div>
    );
  }
}

export default App;
