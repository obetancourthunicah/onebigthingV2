const express = require('express');
var router = express.Router();

function initSecurity (db){
  var userModel =  require('./users')(db);

  router.post('/login', (req, res, next)=>{
    var email = req.body.email || 'na';
    var pswd = req.body.password || 'na';
    if (email === 'na' || pswd == 'na') {
      console.log("Valores de correo y contraseña no vienen");
      return res.status(400).json({ "Error": "Credenciales Incorrectas" });
    }
    userModel.obtenerPorCorreo(email, (err, user)=>{
        if(err){
          console.log(err);
          console.log("Tratando de Ingresar con cuenta inexistente " + req.body.email);
          return res.status(400).json({ Error: "Credenciales incorrectas" });
        }
        //Ver si la cuenta está activa
        if(!user.active){
          console.log("Tratando de Ingresar con cuenta suspendida " + req.body.email);
          return res.status(400).json({ Error: "Credenciales incorrectas" });
        }
        if(!userModel.comparePasswords(pswd, user.password)){
          console.log("Tratando de Ingresar con contraseña incorrecta " + req.body.email);
          return res.status(400).json({ Error: "Credenciales incorrectas" });
        }
        return res.status(200).json(user);
    });
  })

  router.post('/signin', (req, res ,next)=>{
    var email = req.body.email || 'na';
    var pswd = req.body.password || 'na';
    if( email ==='na' || pswd == 'na') {
      return res.status(400).json({"Error":"El correo y la contreseña son necesarios"});
    }
    if (!(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i).test(email)) {
      return res.status(400).json({ "Error": "El correo electrónico debe ser uno válido" });
    }
    if (! (/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%])[0-9A-Za-z!@#$%]{8,32}$/).test(pswd)){
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
