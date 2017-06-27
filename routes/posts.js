var express = require('express');

module.exports = function(models){

  let router = express.Router();
  /* GET posts listing. */
  router.get('/', function(req, res, next) {
    models.Post.findAll()
    .then(posts => {
      res.json(posts)
    })
  })

  return router
}
