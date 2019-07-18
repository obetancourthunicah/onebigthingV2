import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';

import NavBar from './Components/Common/NavBar/NavBar';
// import Home from './Components/Pages/Public/Home/Home';
import Login from './Components/Pages/Public/Login/Login';
import Sigin from './Components/Pages/Public/Signin/Sigin';

import Dashboard from  './Components/Pages/Private/Dashboard/Dashboard';
function App() {
  return (
    <Router>
      <section className="container">
        <Route path="/" exact component={Login} />
        <Route path="/sigin"  component={Sigin} />
        <Route path="/main"  component={Dashboard} />
        <NavBar/>
      </section>
    </Router>
  );
}

export default App;
