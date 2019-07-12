import React from 'react';
import Home from './Components/Pages/Public/Home/Home';
import Login from './Components/Pages/Public/Login/Login';
import Sigin from './Components/Pages/Public/Signin/Sigin';

import Dashboard from  './Components/Pages/Private/Dashboard/Dashboard';
function App() {
  return (
    <section className="container">
      <Dashboard/>
    </section>
  );
}

export default App;
