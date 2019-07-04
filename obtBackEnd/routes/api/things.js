const express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

// JSON -> Javascript Object Notation

function thingsInit(db){
// json.org

var  thingsColl = db.collection('things');

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
      { "id":1,
        "descripcion":"Mi Primer Thing",
        "fecha": new Date().getTime(),
        "by":"Orlando"
      }
  )
);



router.get('/', (req, res, next)=>{
  thingsColl.find().toArray((err, things)=>{
    if(err) return res.status(200).json([]);
    return res.status(200).json(things);
  });//find toArray
  ///res.status(200).json(thingsCollection);
});

  router.get('/page', (req, res, next) => {
    getThings(1, 50, res);
  });

  router.get('/page/:p/:n', (req, res, next) => {
    var page = parseInt(req.params.p);
    var items = parseInt(req.params.n);
    getThings(page, items, res);
  });

  function getThings(page, items, res) {
    var query = {};
    var options = {
      "limit": items,
      "skip":((page-1) * items),
      "projection":{
        "descripcion":1
      }
    };
    thingsColl.find(query,options).toArray((err, things) => {
      if (err) return res.status(200).json([]);
      return res.status(200).json(things);
    });//find toArray
  }


router.get('/:id', (req, res, next)=>{
  var query = {"_id": new ObjectID(req.params.id)}
  thingsColl.findOne(query, (err, doc)=>{
    if(err) {
      console.log(err);
      return res.status(401).json({"error":"Error al extraer documento"});
    }
    return res.status(200).json(doc);
  }); //findOne
});// get ById

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

  //thingsCollection.push(newElement);
  //res.status(200).json(newElement);
  thingsColl.insertOne(newElement, {} , (err, result)=>{
    if(err){
      console.log(err);
      return res.status(404).json({"error":"No se pudo Insertar One Thing"});
    }
    return res.status(200).json({"n": result.insertedCount,"obj": result.ops[0]});
  });//insertOne
}); // post /
// http://localhost:3000/api/things/1236183491


router.put('/:idElemento', (req, res, next) => {
  var query = {"_id": new ObjectID(req.params.idElemento)};
  var update = { "$set": req.body, "$inc":{"visited": 1}};
  // var modifiedObject = {};
  // var originalObject = {};
  // thingsCollection = thingsCollection.map( (e, i) => {
  //   if(e.id === id) {
  //     originalObject = Object.assign({},e);
  //     return Object.assign(modifiedObject, e, req.body);
  //   }
  //   return e;
  // } );//map
  thingsColl.updateOne(query, update, (err, rst) => {
    if(err){
      console.log(err);
      return res.status(400).json({"error": "Error al actualizar documento"});
    }
    return res.status(200).json(rst);
  }); //updateOne
  // res.status(200).json({"o":originalObject, "m": modifiedObject });
});// put /


// router.delete('/:id/:soft', (req, res, next) => {
router.delete('/:id', (req, res, next) => {
  //var id = parseInt(req.params.id);
  var query = {"_id": new ObjectID(req.params.id)}
  thingsColl.removeOne(query, (err, result) => {
    if(err) {
      console.log(err);
      return res.status(400).json({"error":"Error al eliminar documento"});
    }
    return res.status(200).json(result);
  });
  //var soft = req.params.soft;
  // thingsCollection = thingsCollection.filter( (e, i) => {
  //   return (e.id !== id );
  // } ); //
  // res.status(200).json({ 'msg': 'Elemento ' + id + ' fué eleminido!!!' });
});// put /

 return router;
}
module.exports = thingsInit;
