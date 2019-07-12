// ES6
// ES5 var React = require('react');
// var Component = React.Component;
import React, { Component } from 'react';
import Button from '../../../Common/Btns/Buttons';
import Campo from '../../../Common/Campo/Campo';
/*
  module.exports = class Login .....
*/
export default class Signin extends Component{
  constructor(){
    super();
    //definición del estado inicial
    this.state = {
      email:'',
      password:'',
    };
    //Para el autobinding
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSiginBtnClick = this.onSiginBtnClick.bind(this);
  }

  onChangeHandler(e){
    const {name, value} = e.target;
    //validar
    this.setState({...this.state,[name]:value});
  }
  onSiginBtnClick(e){
    console.log(this.state);
  }

  render(){
    return (
      <section>
        <h1>Crear Nueva Cuenta</h1>
        <section className="main fix640">
         <Campo
          caption="Correo Electrónico"
          value={this.state.email}
          name="email"
          onChange={this.onChangeHandler}
         />
          <Campo
            caption="Contraseña"
            type="password"
            value={this.state.password}
            name="password"
            onChange={this.onChangeHandler}
          />
          <section className="action">
              <Button
                caption="Crear Cuenta"
                onClick={this.onSiginBtnClick}
                customClass="primary"
              />
              <Button
                caption="Iniciar Sesión"
                customClass="link"
              />
          </section>
        </section>
      </section>
    );
  }
}
