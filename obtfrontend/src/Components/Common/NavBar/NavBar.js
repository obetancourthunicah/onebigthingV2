import React from 'react';
import { Link } from 'react-router-dom';
// https://react-icons.netlify.com/
import { IoIosLogIn, IoIosHome, IoIosKey } from 'react-icons/io';
import './NavBar.css';

const NavItem = ({ to, children, ...rest }) => {
  return (
    <Link to={to}>{children}</Link>
  );
};

export default ()=>{
  return(
    <nav>
      <NavItem to="/"><IoIosLogIn/>&nbsp;Login</NavItem>
      <NavItem to="/sigin"><IoIosKey/>&nbsp;SignIn</NavItem>
      <NavItem to="/main"><IoIosHome/>&nbsp;Main</NavItem>
    </nav>
  )
}
