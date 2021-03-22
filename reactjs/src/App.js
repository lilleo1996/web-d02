import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
// import Home from './pages/Home'
import Chat from "./pages/Chat";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

class App extends Component {
  render() {
    return (
      <BrowserRouter className="app">
      <Header />

      <Switch>
        <Redirect exact from="/" to="/sign-in" />
  
        <Route path="/sign-in" exact component={SignIn} />
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/chat" component={Chat} />
      </Switch>

      <Footer />
    </BrowserRouter>
    );
  }
}

export default App;
