var express = require('express');

module.exports = function(models, model){

  router.get('/', function(req, res, next) {
    models[model].findAll()
    .catch(err => { return next(err) })
    .then(found => {
      res.json({message: `Got all ${model}`, data: found})
    })
  })

  router.post('/' , function(req,res,next){

    let required_columns = models[model].required_columns || []
    let allowed_columns = models[model].allowed_columns || []

    if(!required_columns.every(function(col){req.body[col]})){
      return res.status(400).json({message: 'missing a required column'})
    }

    models[model].create(req.body,{
      fields: allowed_columns
    })
    .catch(err => { return next(err) })
    .then(saved=>{
      res.json({message: `${model} id: ${saved.id} created`, data: saved})
    })
  })

  router.get('/:id', function(req, res, next){
    let id = req.params.id
    models[model].findById(id)
    .catch(err => { return next(err) })
    .then(found => {
      if(!found){ return next() }
      res.json({message: `${model} id: ${id} found` , data: found})
    })
  })

  router.put('/:id', function(req, res, next){
    let id = req.params.id
    let allowed_columns = models[model].allowed_columns || []

    models[model].findById(id)
    .catch(err => { return next(err) })
    .then(found => {
      if(!found){ return next() }
      found.update(req.body,{
        fields: allowed_columns
      })
      .catch(err => { return next(err) })
      .then(updated=>{
        res.json({message: `${model} id: ${id} updated`, data: updated})
      })
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
        res.json({message: `${model} id: ${id} deleted`, data: found})
      })
    })

  })


  return router
}
