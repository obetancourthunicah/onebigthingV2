// ES6
// ES5 var React = require('react');
// var Component = React.Component;
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { naxios } from '../../../../Utilities';

import Button from '../../../Common/Btns/Buttons';
import Campo from '../../../Common/Campo/Campo';
/*
  module.exports = class Login .....
*/
export default class Login extends Component{
  constructor(){
    super();
    //definición del estado inicial
    this.state = {
      email:'',
      password:'',
      redirect:false,
      error:null
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
    naxios.post('/api/security/login', this.state)
      .then( ( {data , status})=>{
        this.props.setAuth(data.token, data.user);
        this.setState({redirect:true});
        }
      )
      .catch( (err)=> {
          console.log(err)
          this.setState({"error":"Correo o contraseña incorrectas. Intente de Nuevo"})
        }
      )
    ;
  }

  render(){
    console.log(this.props);
    if(this.state.redirect){
      return (
        <Redirect
          to={(this.props.location.state) ? this.props.location.state.from.pathname : '/'}
        />
      );
    }
    return (
      <section>
        <h1>Iniciar Sesión</h1>
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
          { (this.state.error && true)? (<div className="error">{this.state.error}</div>):null}
          <section className="action">
              <Button
                caption="Iniciar Sesión"
                onClick={this.onSiginBtnClick}
                customClass="primary"
              />
              <Button
                caption="Crear Nueva Cuenta"
                customClass="link"
                onClick={(e)=>{this.props.history.push('/signin')}}
              />
          </section>
        </section>
      </section>
    );
  }
}
