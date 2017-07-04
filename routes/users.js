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


  router.get('/:id' , function(req,res,next){
    let id = req.params.id
    let opts = {attributes: models.User.allowed_columns}
    if (req.query.include){
      opts.include = []
      if (req.query.include.includes('Profile')){opts.include.push( models.Profile)}
      if (req.query.include.includes('CategoryProfile')){opts.include.push( models.CategoryProfile)}
      if (req.query.include.includes('Badge')){opts.include.push( models.Badge)}
      if (req.query.include.includes('Achievement')){opts.include.push( models.Achievement)}
    }
    models.User.findById(id, opts)
    .catch(err => { return next(err) })
    .then(found => {
      if(!found){ return next() }
      res.json({message: `User id: ${id} found` , data: found})
    })
  })
  return router
}
