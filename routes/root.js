var express = require('express');
var router = express.Router();

/* GET home page. */
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

module.exports = router;
