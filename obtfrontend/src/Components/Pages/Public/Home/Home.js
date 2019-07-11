import React, {Component} from 'react';
import Button from '../../../Common/Btns/Buttons';
import './Home.css';

export default class Home extends Component{
  render() {
    return (
        <div className="home">
            <h1>Home Page</h1>
            <Button />
            <div>&nbsp;</div>
        </div>
    );
  }

}
