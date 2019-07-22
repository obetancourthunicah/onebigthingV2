import React , {Component} from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import { setJWT, setUnAuthHandler, getLocalStorage, setLocalStorage, removeLocalStorage } from './Utilities';
import PrivateRoute from './PrivateRoute';

import NavBar from './Components/Common/NavBar/NavBar';
import Home from './Components/Pages/Public/Home/Home';
import Login from './Components/Pages/Public/Login/Login';
import Sigin from './Components/Pages/Public/Signin/Sigin';

import Dashboard from  './Components/Pages/Private/Dashboard/Dashboard';

class App extends Component {
  constructor(){
    super();
    // verificar los datos de local storage
    this.state =  {
      "auth":( JSON.parse(getLocalStorage('auth')) ||
      {
        logged: false,
        token: false,
        user: {}
      })
    };
    this.setAuth = this.setAuth.bind(this);
    this.setUnAuth = this.setUnAuth.bind(this);

    setJWT(this.state.auth.token);
    setUnAuthHandler(this.setUnAuth);
  } // constructor


  setUnAuth(error){
    this.setAuth(false,{});
  }

  setAuth(token, user){
    setJWT(token);
    let _auth = {
      logged: token && true,
      token: token,
      user: user
    };
    setLocalStorage('auth', JSON.stringify(_auth));
    this.setState({
      auth: _auth
    });
  }

  render(){
    console.log(this.state.auth);
    return (
      <Router>
        <section className="container">
          <Route path="/" exact render={(props) => (<Home {...props} auth={this.state.auth} setUnAuth={this.setUnAuth} />)} />
          <Route path="/login" render={ (props)=>(<Login {...props} auth={this.state.auth} setAuth={this.setAuth} />) } />
          <Route path="/signin"  component={Sigin} />
          <PrivateRoute path="/main" auth={this.state.auth} component={Dashboard} />
          <NavBar auth={this.state.auth}/>
        </section>
      </Router>
    );
  }
}

export default App;
