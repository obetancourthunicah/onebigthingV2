import React, {Component} from 'react';
import Button from '../../../Common/Btns/Buttons';
import './Home.css';
import { IoIosLogOut } from 'react-icons/io';

export default class Home extends Component{
  render() {
    return (
        <div className="home">
            <h1>One Big Thing</h1>
            <div>&nbsp;</div>
            {(this.props.auth.logged) ? (<div className="half"><Button customClass="primary" onClick={(e) => { this.props.setUnAuth(false)}}><IoIosLogOut/>&nbsp;Logout</Button></div>):null}
        </div>
    );
  }

}
