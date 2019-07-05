const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;


function routerInit(db){

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey:"cuandolosgatosnoestanlosratonesfiestahacen"
    },
    (payload, next)=>{
      var user = payload;
      return next(null, user);
    }
  )
);


const securityApi = require('./security')(db);
const thingsApi = require('./things')(db);




router.get('/', (req, res, next)=>{
    //req toda la peticion del cliente
    //res toda la respuesta que le vamos a dar al cliente
    //next un elemento porsi
    res.status(200).json({"api":"version1"})
});

router.use('/security', securityApi);
router.use('/things', passport.authenticate('jwt', {session:false}) , thingsApi);

// router.get('/hello', (req, res, next)=>{
//   res.status(200).json({"msg":"Hola Mundo"});
// });
return router;
} // routerINit
module.exports = routerInit;
