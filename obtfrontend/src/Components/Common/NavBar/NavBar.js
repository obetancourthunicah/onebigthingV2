import React from 'react';
import { Link } from 'react-router-dom';
// https://react-icons.netlify.com/
import { IoIosLogIn, IoIosHome, IoIosKey, IoIosToday, IoIosList } from 'react-icons/io';
import './NavBar.css';

const NavItem = ({ to, children, ...rest }) => {
  return (
    <Link to={to}>{children}</Link>
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
