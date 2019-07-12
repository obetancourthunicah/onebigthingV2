import React, {Component} from 'react';
import './Button.css';

export default class Button extends Component{
  render(){
    return (
      <button
          className={["btn", this.props.customClass||""].join(" ")}
          onClick={this.props.onClick || function(){}}
        >
          {this.props.caption || "Botón"}
        </button>
    );
  }
};
