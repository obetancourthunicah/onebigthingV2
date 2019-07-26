import React from 'react';
import { NavLink } from 'react-router-dom';
// https://react-icons.netlify.com/
import { IoIosLogIn, IoIosHome, IoIosKey, IoIosToday, IoIosList } from 'react-icons/io';
import './NavBar.css';

const NavItem = ({ to, children, ...rest }) => {
  return (
    <NavLink activeClassName="activeNav" exact to={to}>{children}</NavLink>
  );
};

export default ({auth, unSetAuth})=>{
  console.log(auth);
  if(!auth.logged){
    return(
      <nav>
        <NavItem to="/login"><IoIosLogIn/>&nbsp;Login</NavItem>
        <NavItem to="/signin"><IoIosKey/>&nbsp;SignIn</NavItem>
      </nav>
    )
  } else {
    return (
      <nav>
        <NavItem to="/"><IoIosHome/>&nbsp;Home</NavItem>
        <NavItem to="/main"><IoIosToday />&nbsp;Main</NavItem>
        <NavItem to="/backlog"><IoIosList/>&nbsp;BackLog</NavItem>
      </nav>
    )
  }
}
