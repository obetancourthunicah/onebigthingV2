const express = require('express');
var router = express.Router();

// JSON -> Javascript Object Notation

// json.org
var thingsCollection = [];

var thingsStruct = {
  "id" : 0,
  "descripcion":'',
  "fecha": 0,
  "by":''
};


thingsCollection.push(
  Object.assign({},
      thingsStruct,
      { "id":"1",
        "descripcion":"Mi Primer Thing",
        "fecha": new Date().getTime(),
        "by":"Orlando"
      }
  )
);



router.get('/', (req, res, next)=>{
  res.status(200).json(thingsCollection);
});

// CRUD Crear, Leer (Read), Actualizar (Update) ,Eliminar (Delete)
// REST
// GET  consultas  Read, lectura
// POST Crear  - Insert C
// PUT  Update - Actualizar
// DELETE  Delete - ELiminar

router.post('/', (req, res, next)=>{
  var newElement = Object.assign({},
    thingsStruct,
    req.body,
    {
      "fecha": new Date().getTime(),
      "id": new Date().getTime()
    }
  );
  thingsCollection.push(newElement);
  res.status(200).json(newElement);
}); // post /

router.put('/', (req, res, next) => {
  res.status(200).json({ 'msg': 'Entro en el put' });
});// put /

router.delete('/', (req, res, next) => {
  res.status(200).json({ 'msg': 'Entro en el delete' });
});// put /

module.exports = router;
