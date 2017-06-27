var express = require('express');

module.exports = function(models, model){

  let router = express.Router();
  /* GET all listing. */
  router.get('/', function(req, res, next) {
    console.log("in genric get")
    models[model].findAll()
    .then(found => {
      res.json(found)
    })
  })

  return router
}
