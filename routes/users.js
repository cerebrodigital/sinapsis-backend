var express = require('express');

/* GET users listing. */

module.exports = function(models){
  let router = express.Router();
  router.get('/', function(req, res, next) {
    models.User.findAll()
    .then(users => {
      res.json(users)
    })

  });
  return router
}
