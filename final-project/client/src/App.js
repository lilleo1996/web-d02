import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import './App.scss';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />

        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path="/home" component={Home} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
        </Switch>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
