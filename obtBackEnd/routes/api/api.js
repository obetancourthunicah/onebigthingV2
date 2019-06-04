const express = require('express');
const router = express.Router();

const securityApi = require('./security');
const thingsApi = require('./things');


router.get('/', (req, res, next)=>{
    //req toda la peticion del cliente
    //res toda la respuesta que le vamos a dar al cliente
    //next un elemento porsi
    res.status(200).json({"api":"version1"})
});

router.use('/security', securityApi);
router.use('/things', thingsApi);

// router.get('/hello', (req, res, next)=>{
//   res.status(200).json({"msg":"Hola Mundo"});
// });

module.exports = router;
