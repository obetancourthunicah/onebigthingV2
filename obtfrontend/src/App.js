import React , {Component} from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import { setJWT } from './Utilities';

import NavBar from './Components/Common/NavBar/NavBar';
// import Home from './Components/Pages/Public/Home/Home';
import Login from './Components/Pages/Public/Login/Login';
import Sigin from './Components/Pages/Public/Signin/Sigin';

import Dashboard from  './Components/Pages/Private/Dashboard/Dashboard';

class App extends Component {
  constructor(){
    super();
    this.state = {
      "auth":{
        logged: false,
        token: '',
        user: {}
      }
    };

    this.setAuth = this.setAuth.bind(this);
  } // constructor

  setAuth(token, user){
    setJWT(token);
    this.setState({
      auth:{
        logged: token && true,
        token: token,
        user: user
      }
    });
  }

  render(){
    return (
      <Router>
        <section className="container">
          <Route path="/" exact render={ ()=>(<Login auth={this.state.auth} setAuth={this.setAuth} />) } />
          <Route path="/sigin"  component={Sigin} />
          <Route path="/main"  component={Dashboard} />
          <NavBar/>
        </section>
      </Router>
    );
  }
}

export default App;
