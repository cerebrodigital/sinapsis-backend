var express = require('express');

module.exports = function(models, model){

  let router = express.Router();
  /* GET all listing. */
  router.get('/', function(req, res, next) {
    models[model].findAll()
    .catch(err => { return next(err) })
    .then(found => {
      res.json({message: `Got all #{model}`, data: found})
    })
  })

  router.get('/:id', function(req, res, next){
    let id = req.params.id
    models[model].findById(id)
    .catch(err => { return next(err) })
    .then(found => {
      if(!found){ return next() }
      res.json({message: `#{model} id: #{id} found` , data: found})
    })

  })

  router.delete('/:id', function(req, res, next){
    let id = req.params.id
    models[model].findById(id)
    .catch(err => { return next(err) })
    .then(found => {
      if(!found){ return next() }
      found.destroy()
      .catch(err => { return next(err) })
      .then(()=>{
        res.json({message: `#{model} id: #{id} deleted`, data: found})
      })
    })

  })

  router.post('/' , function(req,res,next){
    // check for allowed columns
    // check for required columns
    modelparams = req.body
    model[model].create(modelparams)
    .catch(err => { return next(err) })
    .then(saved=>{
      res.json({message: `#{model} id: #{saved.id} created`, data: saved})
    })
  })

  return router
}
