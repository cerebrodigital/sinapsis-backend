var express = require('express');

module.exports = function(models){
  let router = express.Router();

  router.get('/', function(req, res, next) {
    res.json({message: "Welcome to API"})
  });

  router.get('/me', function(req, res, next) {
    if(req.user){
      res.json(req.user)
    } else {
      res.sendStatus(401)
    }
  });

  return router
}
