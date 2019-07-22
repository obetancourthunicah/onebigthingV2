const express = require('express');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');

var router = express.Router();

function initSecurity (db){

  var userModel =  require('./users')(db);

  //configurar el passport local
  passport.use(
      new LocalStrategy(
        {
          usernameField:'email',
          passwordField:'password'
        },
        (email, pswd, next)=>{
            //--
          if ((email ||'na') === 'na' || (pswd ||'na') == 'na') {
            console.log("Valores de correo y contraseña no vienen");
            return next(null, false, {"Error":"Credenciales Incorrectas"});
          }
          userModel.obtenerPorCorreo(email, (err, user) => {
            if (err) {
              console.log(err);
              console.log("Tratando de Ingresar con cuenta inexistente " + email);
              return next(null, false, { "Error": "Credenciales Incorrectas" });
            }
            //Ver si la cuenta está activa
            if (!user.active) {
              console.log("Tratando de Ingresar con cuenta suspendida " + email);
              return next(null, false, { "Error": "Credenciales Incorrectas" });
            }
            if (!userModel.comparePasswords(pswd, user.password)) {
              console.log("Tratando de Ingresar con contraseña incorrecta " + email);
              return next(null, false, { "Error": "Credenciales Incorrectas" });
            }
            delete user.password;
            delete user.lastPasswords;
            delete user.active;
            delete user.dateCreated;

            return next(null, user, { "Status": "Ok" });
          });
            //---
        }
      )
  );

  router.post('/login', (req, res, next)=>{
    passport.authenticate(
        'local',
        {session:false},
        (err, user, info) => {
          if(user){
            req.login(user, {session:false}, (err)=>{
              if(err){
                return res.status(400).json({"Error":"Error al iniciar sesión"});
              }
              const token = jwt.sign(user, 'cuandolosgatosnoestanlosratonesfiestahacen');
              return res.status(200).json({user, token});
            });
          }else{
            return res.status(400).json({info});
          }
        }
    )(req, res);
  }); //login

  router.post('/signin', (req, res ,next)=>{
    var email = req.body.email || 'na';
    var pswd = req.body.password || 'na';
    if( email ==='na' || pswd == 'na') {
      return res.status(400).json({"Error":"El correo y la contreseña son necesarios"});
    }
    if (!(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i).test(email)) {
      return res.status(400).json({ "Error": "El correo electrónico debe ser uno válido" });
    }
    if (! (/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%])[0-9A-Za-z\.!@#$%]{8,32}$/).test(pswd)){
      return res.status(400).json({ "Error": "La contraseña debe contener al menos una Mayúscula, una Minúscula, un número y un signo especial ! @ # $ % y mínimo 8 caracteres" });
    }
    userModel.agregarNuevo(email, pswd, (err, newUser)=>{
      if(err){
        return res.status(400).json({ "Error": "No se pudo crear nueva cuenta" });
      }
      delete newUser.password;
      return res.status(200).json(newUser);
    });
  }); // signin

  return router;
}

module.exports = initSecurity;
